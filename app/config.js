// בחירת ה-backend ופרטי החיבור.
// "mock" - נתונים ב-localStorage (לפיתוח/הדגמה, בלי שרת).
// "firebase" - התחברות ונתונים אמיתיים בענן (משותף בין כל המשתמשים).
// כדי להפעיל Firebase: (1) למלא firebaseConfig למטה, (2) למלא WORKSHOP_PASSWORD,
// (3) לעדכן ADMIN_EMAILS, (4) לשנות את BACKEND ל-"firebase". שאר הקוד לא משתנה.
export const BACKEND = "mock"; // "mock" | "firebase"

// קטע ההגדרות מהקונסולה של Firebase (Project settings → Your apps → SDK setup).
export const firebaseConfig = {
  // apiKey: "…",
  // authDomain: "…",
  // projectId: "…",
  // appId: "…",
};

// סיסמת הסדנה המשותפת - כל משתתף מקליד אותה כדי להיכנס (שער הכניסה).
// למלא לפני הפעלת Firebase.
export const WORKSHOP_PASSWORD = "";

// אימיילים של מנחים (אדמינים). מי שנכנס עם אימייל מהרשימה מקבל תצוגת מנחה.
// חשוב: הרשימה הזו חייבת להיות זהה לרשימה שב-firestore.rules (שם היא נאכפת).
export const ADMIN_EMAILS = [
  "inbaltsa@post.bgu.ac.il",
];
