// פרק 0 - הקדמה: מה זה וייב קודינג, ומה אפשר לבנות איתו.
// נפתח לפני מפגש 1, בצבע משלו. השקפים מציגים את התהליך מהכלי הפשוט ועד אפליקציה מלאה;
// הבלוק למשתתפים שומר את הקישורים לדוגמאות, כדי שאפשר יהיה לחזור אליהן.

// "סולם" הדוגמאות בפתיחה: חמש מדרגות, מהכלי הפשוט ביותר ועד אפליקציה מלאה.
// כל שקף מראה מדרגה אחת, מה נוסף בה לעומת הקודמת, וקישור לדוגמה החיה.
const LADDER = [
  { title: "מתחילים בקטן", name: "מסדרים את המילים במילון", href: "https://inbaltsa.github.io/My-school-apps/apps/hebrew/milim.html",
    what: "תרגול סדר אלפביתי לכיתה ג'.", added: "קובץ HTML אחד שרץ בדפדפן. בלי שרת ובלי התקנה.", tag: "מפגש 1" },
  { title: "נכנסים לקורס", name: "לומדה לניתוח נתונים", href: "https://moodle.bgu.ac.il/moodle/mod/scorm/view.php?id=3454424",
    what: "לומדה לניתוח נתונים.", added: "ארוזה כפעילות בתוך Moodle, לצד שאר חומרי הקורס.", tag: "מפגש 2" },
  { title: "הרבה תוכן, מבנה אחד", name: "מאגר תרגילים במתמטיקה", href: "https://teachingcenter.bgu.ac.il/foundations/exams/9711/",
    what: "תרגילים מבחינות, שהסטודנטים מתרגלים לבד.", added: "הרבה פריטים באותו מבנה, באתר עם כתובת קבועה שחוזרים אליה." },
  { title: "אתר שלם", name: "ספר הקורס בחדו\"א", href: "https://teachingcenter.bgu.ac.il/books/calculus/",
    what: "ספר קורס שלם.", added: "הרבה עמודים וניווט ביניהם, באתר שמתעדכן מעצמו בכל שינוי." },
  { title: "אפליקציה שמחברת אנשים", name: "RamotBooks", href: "https://ramotbooks-beersheva.github.io/RamotBooks/",
    what: "החלפת ספרים בין הורים בבית הספר, כדי שלא יצטרכו לקנות.", added: "משתמשים, בסיס נתונים שמחפש התאמות, והודעת WhatsApp להורים ברגע שיש התאמה.", tag: "משתמשים ובסיס נתונים: מפגש 3" },
];
const ladderSlides = LADDER.map((s, i) => ({
  title: s.title,
  body:
    `<div class='ladder' aria-label='שלב ${i + 1} מתוך ${LADDER.length}'>` +
    LADDER.map((_, j) => `<span class='${j < i ? "done" : j === i ? "on" : ""}'></span>`).join("") +
    `</div>` +
    `<p class='ladder-name'><a href='${s.href}' target='_blank' rel='noopener'>${s.name} ↗</a>${s.tag ? `<span class='ladder-tag'>${s.tag}</span>` : ""}</p>` +
    `<p>${s.what}</p>` +
    `<p class='ladder-added'><b>${i === 0 ? "נקודת ההתחלה" : "מה נוסף כאן"}:</b> ${s.added}</p>`,
}));

export default {
  id: "m0",
  order: 0,
  title: "הקדמה",
  subtitle: "פרק 0",
  summary: "לפני שמתחילים: מה זה וייב קודינג, ואיך מתקדמים בו מכלי קטן בקובץ אחד ועד אפליקציה מלאה.",
  units: [
    {
      id: "m0-u1",
      title: "מהכלי הקטן ועד אפליקציה מלאה",
      lead: "",
      slides: [
        { title: "מה זה וייב קודינג?", body: "בניית תוכנה בשיחה: אתם מתארים בשפה רגילה מה שאתם רוצים, וה-AI כותב את הקוד.<br>לא צריך לדעת לתכנת. צריך לדעת לתאר, לבדוק, ולבקש שינויים." },
        { title: "מה צריך בשביל וייב קודינג?", body: "כל מה שצריך: גישה לכלי AI כמו Claude, ChatGPT או Gemini, ו<u style='white-space:nowrap'>לא לפחד מקצת קוד</u>." },
        { title: "וייב קודינג בהוראה", body: "אנחנו יכולים להיעזר בוייב קודינג כדי <b>לעזור לסטודנטיות ולסטודנטים ללמוד</b> - באמצעות כלים קטנים שמתמקדים בקושי אחד מתוך הקורס." },
        ...ladderSlides,
        { title: "ועכשיו - אליכם", body: "את הדוגמאות אפשר לשכוח.<br>הכלי שלכם לא יתחיל מתבנית, אלא <b>מצורך אמיתי בקורס שלכם</b>." },
      ],
      blocks: [
        {
          kind: "text",
          html: "<b>מהפשוט למורכב:</b> הדוגמאות מהפתיחה, לפתוח ולשחק בהן.<ol class='ladder-list'>" +
            LADDER.map((s) => `<li><a href='${s.href}' target='_blank' rel='noopener'>${s.name}</a> - ${s.what}</li>`).join("") +
            "</ol>"
        },
        { kind: "text", html: "וייב קודינג = מתארים בשפה רגילה מה רוצים, וה-AI כותב את הקוד. לא צריך לדעת לתכנת - צריך לדעת לתאר, לבדוק ולבקש שינויים." }
      ]
    }
  ]
};
