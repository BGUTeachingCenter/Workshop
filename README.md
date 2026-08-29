# מהצורך לכלי - סביבת הלמידה של סדנת Vibe Coding בהוראה

האתר שמפעיל ומלווה את סדרת הסדנאות. הוא **אינו** האפליקציה שהמשתתפים בונים -
הוא הסביבה שדרכה הם נכנסים, מקבלים משימות ורואים תוכן שנחשף בהדרגה (Progressive Disclosure).

## הרצה מקומית

יש להריץ שרת מקומי (בגלל ES Modules):

```bash
python3 -m http.server 8000
```

ואז לפתוח את <http://localhost:8000>. (פתיחה ישירה של `index.html` דרך `file://` לא תעבוד עם מודולים.)

## מצב נוכחי - שלב 1

- ✅ שלד מלא: router, מודל תוכן block-based, renderer גנרי, זרימת משתתפת מלאה.
- ✅ כניסה (passwordless במסגרת מדומה), מסע השלבים עם נעול/פתוח **לפי יחידה**, תצוגת יחידה.
- ✅ לוח מנחָה: רשימת נרשמים + מתגי פתיחה/סגירה לכל יחידה.
- ✅ תוכן מפגש 1 (שש יחידות).
- 🔧 **Backend מדומה** מבוסס `localStorage` (`app/config.js` → `BACKEND="mock"`), כדי לפתח ולבדוק בלי פרויקט ענן.

## מה עוד לפנינו

- **שלב 3** - חיבור Firebase אמיתי (Authentication passwordless + Firestore + security rules). הממשק כבר מופרד ב-`app/backend/firebase.js`; ההחלפה היא ב-`app/config.js` בלבד.
- **שלב 4** - תוכן מפגשים 2–3, Hosting וליטוש.

## מבנה הקוד

```
index.html            מעטפת + טעינת app/main.js
styles.css            עיצוב (RTL, שפת בן-גוריון)
app/
  config.js           בחירת backend (mock/firebase) + firebaseConfig
  api.js              נקודת גישה אחת ל-auth ו-data
  main.js             bootstrap + ניתוב מונחה-הרשאות
  router.js           hash router
  backend/
    mock.js           מימוש localStorage (מדמה את Firebase)
    firebase.js       שלד למימוש Firebase (שלב 3)
  render/blocks.js    renderer גנרי לבלוקי תוכן
  views/              login · workshop · unit · admin · layout
content/
  index.js            רישום מפגשים + עזרי ניווט/נעילה
  meeting-1.js        תוכן מפגש 1 (יחידות block-based)
```

## מודל התוכן

כל יחידה היא רשימת בלוקים. הוספת יחידה = הוספת אובייקט למערך `units`:

```js
{ id: "m1-u1", title: "…", lead: "…", blocks: [
  { kind: "text", html: "…" },
  { kind: "reflection", id: "need", prompt: "…", placeholder: "…", hint: "…" },
  { kind: "task", label: "…", html: "…" },
  { kind: "prompt", code: "…" },     // פרומפט להעתקה
  { kind: "code", code: "…" },
  { kind: "steps", items: ["…"] },
  { kind: "image", src: "…", alt: "…", caption: "…" },
  { kind: "link", href: "…", label: "…" },
  { kind: "selfcheck", label: "…", items: ["…"] },
  { kind: "pause", title: "…", html: "…" },
]}
```

## מודל הנתונים המתוכנן (Firestore, שלב 3)

```
users/{uid}      { name, email, role, createdAt }
admins/{uid}     { }                          ← קיום המסמך = הרשאת אדמין
workshop/config  { openUnits: { <unitId>: bool } }
progress/{uid}   { answers: {}, checks: {} }
```
