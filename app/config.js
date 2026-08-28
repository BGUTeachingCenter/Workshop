// בחירת ה-backend ופרטי החיבור.
// כרגע "mock" — כל הנתונים נשמרים ב-localStorage, בלי שרת, כדי שנוכל לבדוק את הזרימה מיד.
// בשלב 3 נחליף ל-"firebase" ונמלא את firebaseConfig — שאר הקוד לא משתנה.
export const BACKEND = "mock"; // "mock" | "firebase"

export const firebaseConfig = {
  // apiKey: "…",
  // authDomain: "…",
  // projectId: "…",
  // appId: "…",
};
