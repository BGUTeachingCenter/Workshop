// Backend אמיתי — Firebase Authentication (קישור במייל, passwordless) + Firestore.
// שלד לשלב 3. הממשק זהה ל-backend/mock.js כדי שהחלפה לא תדרוש שינוי בשאר הקוד.
//
// כשנפעיל: נטען את Firebase SDK מ-CDN (ESM), נאתחל עם firebaseConfig, ונממש:
//   auth.requestLink  → sendSignInLinkToEmail
//   auth.completeLinkIfPresent → isSignInWithEmailLink + signInWithEmailLink
//   auth.onChange     → onAuthStateChanged
//   data.*            → getDoc / setDoc / onSnapshot מול Firestore
//
// מבנה Firestore המתוכנן:
//   users/{uid}      { name, email, role, createdAt }
//   admins/{uid}     { }                         ← קיום המסמך = הרשאת אדמין
//   workshop/config  { openUnits: { <unitId>: bool } }
//   progress/{uid}   { answers: {}, checks: {} }

const NOT_READY = () => {
  throw new Error("Firebase backend עדיין לא מחובר. שלב 3. כרגע BACKEND=\"mock\" ב-app/config.js.");
};

export const auth = {
  async init() { NOT_READY(); },
  async completeLinkIfPresent() { return false; },
  current() { return null; },
  onChange() { return () => {}; },
  async requestLink() { NOT_READY(); },
  async signOut() { NOT_READY(); },
};

export const data = {
  async getConfig() { NOT_READY(); },
  async setUnitOpen() { NOT_READY(); },
  async listUsers() { NOT_READY(); },
  async getProgress() { NOT_READY(); },
  async saveAnswer() { NOT_READY(); },
  async saveCheck() { NOT_READY(); },
};
