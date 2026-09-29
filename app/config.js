// בחירת ה-backend ופרטי החיבור.
// "mock" - נתונים ב-localStorage (לפיתוח/הדגמה, בלי שרת).
// "firebase" - התחברות ונתונים אמיתיים בענן (משותף בין כל המשתמשים).
// כדי להפעיל Firebase: (1) למלא firebaseConfig למטה, (2) למלא WORKSHOP_PASSWORD,
// (3) לעדכן ADMIN_EMAILS, (4) לשנות את BACKEND ל-"firebase". שאר הקוד לא משתנה.
export const BACKEND = "mock"; // "mock" | "firebase"

// קטע ההגדרות מהקונסולה של Firebase (Project settings → Your apps → SDK setup).
// (ה-apiKey כאן אינו סוד - הוא נשלח לדפדפן ממילא; ההגנה היא בכללי האבטחה.)
export const firebaseConfig = {
  apiKey: "AIzaSyBs0D8P1_SO7FozTEfnVWCgd2LQaWy62SA",
  authDomain: "gen-lang-client-0866732986.firebaseapp.com",
  projectId: "gen-lang-client-0866732986",
  storageBucket: "gen-lang-client-0866732986.firebasestorage.app",
  messagingSenderId: "603576156098",
  appId: "1:603576156098:web:956ecbc2f5650baae4a05b",
};

// סיסמת הסדנה המשותפת - כל משתתף מקליד אותה כדי להיכנס (שער הכניסה).
// למלא לפני הפעלת Firebase.
export const WORKSHOP_PASSWORD = "";

// אימיילים של מנחים (אדמינים). מי שנכנס עם אימייל מהרשימה מקבל תצוגת מנחה.
// חשוב: הרשימה הזו חייבת להיות זהה לרשימה שב-firestore.rules (שם היא נאכפת).
export const ADMIN_EMAILS = [
  "inbaltsa@post.bgu.ac.il",
];
