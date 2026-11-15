// Backend אמיתי - Firebase Authentication (אימייל+סיסמה משותפת) + Firestore.
// אותו ממשק בדיוק כמו backend/mock.js, כך שהחלפת mock⟷firebase לא נוגעת בשאר הקוד.
//
// משתתפים: שם + אימייל + סיסמת הסדנה המשותפת (WORKSHOP_PASSWORD). כניסה ראשונה
// יוצרת חשבון; אחר כך מתחברים לאותו חשבון.
// מנחים: כניסה עם Google בלבד. הסיסמה המשותפת גלויה לכל דפדפן, ולכן היא לא יכולה
// להוכיח שמישהו הוא מנחה. מנחה = אימייל מ-ADMIN_EMAILS + אימייל מאומת + כניסת Google,
// ואותם שלושה תנאים נאכפים ב-firestore.rules.
//
// ה-SDK נטען דינמית בתוך init() בלבד - כך שסתם ייבוא הקובץ (גם במצב mock) לא
// מושך שום דבר מהרשת.
//
// מבנה Firestore:
//   users/{uid}      { name, email, role, createdAt }
//   workshop/config  { openUnits: { <unitId>: bool } }
//   progress/{uid}   { answers: {}, checks: {} }

import { firebaseConfig, WORKSHOP_PASSWORD, ADMIN_EMAILS } from "../config.js";

const SDK = "https://www.gstatic.com/firebasejs/10.12.2";

// מוחזקים אחרי טעינה דינמית ב-init().
let initializeApp, getAuth, onAuthStateChanged, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, fbSignOut,
    GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo,
    getFirestore, doc, getDoc, setDoc, collection, getDocs;

let app, fbAuth, db;
let currentUser = null;          // { uid, name, email, role }
let pendingName = null;          // שם מהטופס, לשמירה ביצירת המשתמש
let holdAuthState = false;       // בזמן כניסת Google: בודקים מי נכנס לפני שמציגים משהו
let listeners = [];
const notify = (u) => listeners.forEach((cb) => cb(u));

const adminList = () => ADMIN_EMAILS.map((e) => e.trim().toLowerCase());
const isAdminEmail = (email) => adminList().includes((email || "").trim().toLowerCase());

// מנחה רק אם שלושת התנאים מתקיימים בסשן הנוכחי (כמו isAdmin ב-firestore.rules).
// כניסה בסיסמה עם אימייל של מנחה נשארת משתתף רגיל.
async function isVerifiedAdmin(fbUser) {
  if (!isAdminEmail(fbUser.email)) return false;
  const t = await fbUser.getIdTokenResult();
  return t.signInProvider === "google.com" && t.claims.email_verified === true;
}

// מוודא שמסמך users/{uid} קיים ומעודכן, ומחזיר את אובייקט המשתמש לאפליקציה.
async function resolveUser(fbUser) {
  const ref = doc(db, "users", fbUser.uid);
  const snap = await getDoc(ref);
  const role = (await isVerifiedAdmin(fbUser)) ? "admin" : "participant";
  if (!snap.exists()) {
    const rec = {
      name: pendingName || fbUser.displayName || fbUser.email.split("@")[0],
      email: fbUser.email, role, createdAt: Date.now(),
    };
    await setDoc(ref, rec);
    return { uid: fbUser.uid, ...rec };
  }
  const data = snap.data();
  if (data.role !== role) { await setDoc(ref, { role }, { merge: true }); data.role = role; }
  return { uid: fbUser.uid, name: data.name, email: fbUser.email, role: data.role };
}

function friendly(err) {
  const code = err?.code || "";
  if (code === "auth/invalid-email") return new Error("כתובת אימייל לא תקינה.");
  if (code === "auth/email-already-in-use")
    return new Error("האימייל הזה כבר רשום בדרך כניסה אחרת. נכנסתם פעם עם Google? היכנסו שוב עם Google. אחרת פנו למנחה.");
  if (code === "auth/popup-blocked") return new Error("הדפדפן חסם את חלון ההתחברות. אשרו חלונות קופצים לאתר ונסו שוב.");
  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request")
    return new Error("חלון ההתחברות נסגר לפני שהכניסה הושלמה.");
  if (code === "auth/unauthorized-domain")
    return new Error("כתובת האתר חסרה בדומיינים המורשים ב-Firebase (Authentication ← Settings ← Authorized domains).");
  if (code === "auth/operation-not-allowed")
    return new Error("כניסה עם Google לא מופעלת בפרויקט ה-Firebase (Authentication ← Sign-in method).");
  if (code === "auth/account-exists-with-different-credential")
    return new Error("כבר קיים חשבון עם האימייל הזה בכניסת סיסמה, ו-Google לא הצליח להתחבר אליו.");
  if (code === "auth/wrong-password" || code === "auth/invalid-credential")
    return new Error("סיסמה שגויה. ודאו שהקלדתם את סיסמת הסדנה.");
  if (code === "auth/network-request-failed") return new Error("אין חיבור לרשת. נסו שוב.");
  return new Error(err?.message || "משהו השתבש. נסו שוב.");
}

export const auth = {
  async init() {
    // טעינה דינמית של ה-SDK - קורית רק כאן, כשה-backend הוא firebase.
    ({ initializeApp } = await import(`${SDK}/firebase-app.js`));
    ({ getAuth, onAuthStateChanged, signInWithEmailAndPassword,
       createUserWithEmailAndPassword, signOut: fbSignOut,
       GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } = await import(`${SDK}/firebase-auth.js`));
    ({ getFirestore, doc, getDoc, setDoc, collection, getDocs } = await import(`${SDK}/firebase-firestore.js`));

    app = initializeApp(firebaseConfig);
    fbAuth = getAuth(app);
    db = getFirestore(app);

    // ממתין למצב ההתחברות הראשוני לפני שהאפליקציה מרנדרת.
    await new Promise((resolve) => {
      let first = true;
      onAuthStateChanged(fbAuth, async (fbUser) => {
        if (holdAuthState) return; // signInWithGoogle מטפל בעצמו בתוצאה
        let next = null;
        try { next = fbUser ? await resolveUser(fbUser) : null; }
        catch { next = null; }
        finally { pendingName = null; }
        // מרנדרים מחדש רק כשהמצב באמת השתנה - אחרת הודעת שגיאה במסך הכניסה נמחקת.
        const changed = next?.uid !== currentUser?.uid || next?.role !== currentUser?.role;
        currentUser = next;
        if (first || changed) notify(currentUser);
        if (first) { first = false; resolve(); }
      });
    });
  },

  async completeLinkIfPresent() { return false; }, // לא רלוונטי לשיטת הסיסמה

  current() { return currentUser; },

  onChange(cb) { listeners.push(cb); cb(currentUser); return () => { listeners = listeners.filter((x) => x !== cb); }; },

  // שם ההפעלה נשמר תואם ל-mock (requestLink), אבל כאן הוא מתחבר/יוצר חשבון בסיסמה.
  async requestLink(email, name, password) {
    if (isAdminEmail(email)) throw new Error("מנחים נכנסים עם הכפתור ״כניסת מנחים עם Google״ שמתחת לטופס.");
    if (password !== WORKSHOP_PASSWORD) throw new Error("סיסמה שגויה. ודאו שהקלדתם את סיסמת הסדנה.");
    pendingName = name;
    try {
      await signInWithEmailAndPassword(fbAuth, email, password);
    } catch (e) {
      if (["auth/user-not-found", "auth/invalid-credential"].includes(e.code)) {
        try { await createUserWithEmailAndPassword(fbAuth, email, password); }
        catch (e2) { throw friendly(e2); }
      } else { throw friendly(e); }
    }
    return { immediate: true };
  },

  // כניסת מנחים. מי שאינו מנחה ונכנס כך בטעות: חשבון חדש נמחק מיד; חשבון קיים ממשיך כמשתתף
  // (Google מחליף את כניסת הסיסמה של חשבון קיים, ולכן אי אפשר להחזיר אותו לסיסמה).
  async signInWithGoogle() {
    holdAuthState = true;
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      let res;
      try { res = await signInWithPopup(fbAuth, provider); }
      catch (e) { throw friendly(e); }
      const fbUser = res.user;
      if (!(await isVerifiedAdmin(fbUser))) {
        if (isAdminEmail(fbUser.email)) {
          await fbSignOut(fbAuth);
          throw new Error("החשבון הזה ברשימת המנחים, אבל Google לא אישר את כתובת האימייל שלו, ולכן אין הרשאת מנחה.");
        }
        if (getAdditionalUserInfo(res)?.isNewUser) {
          try { await fbUser.delete(); } catch { await fbSignOut(fbAuth); }
          throw new Error("הכניסה עם Google מיועדת למנחים. משתתפים נכנסים עם סיסמת הסדנה.");
        }
      }
      currentUser = await resolveUser(fbUser);
      notify(currentUser);
      return { immediate: true };
    } finally { holdAuthState = false; }
  },

  async signOut() { await fbSignOut(fbAuth); currentUser = null; notify(null); },
};

export const data = {
  async getConfig() {
    const snap = await getDoc(doc(db, "workshop", "config"));
    return snap.exists() ? { openUnits: {}, ...snap.data() } : { openUnits: {} };
  },
  async setUnitOpen(unitId, open) {
    await setDoc(doc(db, "workshop", "config"), { openUnits: { [unitId]: !!open } }, { merge: true });
  },
  async listUsers() {
    const qs = await getDocs(collection(db, "users"));
    return qs.docs.map((d) => ({ uid: d.id, ...d.data() }));
  },
  async getProgress(uid) {
    const snap = await getDoc(doc(db, "progress", uid));
    return snap.exists() ? { answers: {}, checks: {}, ...snap.data() } : { answers: {}, checks: {} };
  },
  async saveAnswer(uid, key, value) {
    await setDoc(doc(db, "progress", uid), { answers: { [key]: value } }, { merge: true });
  },
  async saveCheck(uid, key, value) {
    await setDoc(doc(db, "progress", uid), { checks: { [key]: !!value } }, { merge: true });
  },
};
