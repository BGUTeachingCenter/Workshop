/* ===== שלבי המיומנות. לעדכון העץ עורכים רק את הרשימה הזאת. =====
   theory: הבסיס התיאורטי לשלב (מוצג בעץ ובדף "ביסוס תיאורטי")
   models: המקבילה בכל מודל, לפי סדר העמודות בטבלה (dewey, polya, ideal, pisa, dt) */
var STAGES = [
  { name: "זיהוי הבעיה", gist: "קונפליקט, פער, צורך או משהו שדורש שינוי",
    act: "לפני שמתחילים לפתור, כל אחד כותב במשפט אחד מה הבעיה ומה ייחשב הצלחה. משווים ניסוחים בזוגות.",
    fb: "ניסחתם את הבעיה במילים שלכם לפני שהתחלתם לפתור. מה היה משתנה בפתרון אילו הגדרתם אותה אחרת?",
    by: {
      eng: { act: "קוראים את השאלה פעמיים, מנסחים את היעד במילים שלנו ומציירים דיאגרמה עם הנתונים, לפני שכותבים משוואה אחת.", fb: "ציירתם דיאגרמה וסימנתם נתונים, אבל היעד לא מנוסח. מה בדיוק מבקשים למצוא, ובאילו יחידות?" },
      design: { act: "מנסחים את הבריף מחדש כשאלה אחת שמתחילה ב'איך נוכל', ומשווים בין הניסוחים של הקבוצות.", fb: "הגדרתם את האתגר מנקודת המבט של המשתמש ולא של המוצר. את מי השארתם מחוץ להגדרה?" },
      edu: { act: "כל חבר קבוצה כותב בנפרד מה לדעתו הקונפליקט, ואז משווים: האם כולם מתארים את אותה בעיה?", fb: "תיארתם את מה שקרה בלי להאשים. של מי הבעיה הזאת, ומה כל צד צריך?" } },
    terms: { eng: "הגדרת הבעיה והדרישות", design: "הגדרת האתגר (Define)", edu: "זיהוי הקונפליקט או הצורך" },
    leaves: [ { t: "לזהות שיש בעיה, קושי, צורך או פער" }, { t: "לאפיין את הבעיה ולנסח את היעד במילים שלנו" }, { t: "לבדוק אם אכן יש בעיה" } ],
    theory: "אצל דיואי, החשיבה הרפלקטיבית מתחילה ב'קושי מורגש', ורק אחר כך מאתרים ומגדירים אותו. פוליה פותח ב'הבנת הבעיה': מה הנעלם, מה הנתונים, מה התנאי. במודל IDEAL זיהוי והגדרה הם שני שלבים נפרדים, כי הגדרה שונה של אותה בעיה מובילה לפתרונות שונים. בבעיות לא מובנות, ג'ונאסן מדגיש שהלומד בונה בעצמו את 'מרחב הבעיה', ולכן השלב הזה כבר חלק מהפתרון.",
    models: ["קושי מורגש; איתור והגדרה", "הבנת הבעיה", "I · D: זיהוי והגדרה", "חקירה והבנה", "Empathize · Define"] },
  { name: "איסוף נתונים וחקר", gist: "מה אנחנו יודעים? אילו שאלות אפשר לשאול?",
    act: "ממלאים טבלה של שלוש עמודות: מה ידוע, מה חסר, מה אנחנו מניחים. אחר כך שואלים \"למה?\" שוב ושוב, עד שמגיעים לשורש.",
    fb: "אספתם נתונים רלוונטיים, אבל עצרתם בסימפטום. מה לדעתכם גורם לו?",
    by: {
      eng: { act: "ממיינים את מה שכתוב בשאלה: מה נתון, מה חסר, מה סותר. קובעים גבולות מערכת ורושמים הנחות עבודה מוצהרות.", fb: "השתמשתם בהנחה בלי לרשום אותה. איזו הנחה עומדת מאחורי המשוואה הזאת, ומתי היא מפסיקה להיות נכונה?" },
      design: { act: "יוצאים לתצפית או לשלושה ראיונות קצרים עם משתמשים, וממפים על לוח מה הם אומרים, עושים ומרגישים.", fb: "אספתם ציטוטים טובים מהמשתמשים. איזה צורך עומד מאחורי מה שהם אמרו?" },
      edu: { act: "סבב הקשבה: כל צד מתאר את עמדתו, והצד השני חוזר על מה ששמע לפני שהוא מגיב.", fb: "הקשבתם לעמדות של שני הצדדים. איזה צורך מסתתר מאחורי העמדה של כל אחד?" } },
    terms: { eng: "ניתוח ושליפת מידע", design: "אמפתיה ומחקר (Empathize)", edu: "בירור עמדות וצרכים" },
    leaves: [ { t: "לברר אילו נתונים קיימים ומה חסר" }, { t: "לפרק את הבעיה למרכיבים פשוטים יותר" }, { t: "לקבוע גבולות, אילוצים והנחות עבודה" }, { t: "לזהות את שורש הבעיה", kind: "key" }, { t: "כלי: ⁦5 Whys⁩", kind: "tool" } ],
    theory: "במסגרת PISA 2012 'חקירה והבנה' ו'ייצוג וניסוח' הם שני תהליכים נפרדים: אוספים מידע, ואז מתרגמים אותו לייצוג (טבלה, דיאגרמה, מודל). שיטת '5 למה' (Five Whys) פותחה בטויוטה (Ohno) כדי לא לעצור בסימפטום. הצוות הדגיש שהשורש מתגלה אחרי החקר ולא לפניו, ולכן הוא מסומן בנפרד בתוך השלב.",
    models: ["איתור והגדרה (המשך)", "הבנת הבעיה (המשך)", "D: הגדרה וייצוג", "חקירה והבנה · ייצוג וניסוח", "Empathize"] },
  { name: "חיפוש חלופות", gist: "כמה דרכי פעולה אפשריות",
    act: "שלוש דקות, שלוש דרכים: כל קבוצה מציעה לפחות שלוש דרכי פעולה שונות לפני שמותר לבחור אחת.",
    fb: "הצעתם דרכים שונות באמת, ולא גרסאות של אותו רעיון. איזו דרך נוספת שקלתם ופסלתם?",
    by: {
      eng: { act: "לפני הפתרון כל זוג מציע שתי דרכים לגשת לבעיה, למשל פתרון אלגברי ופתרון גרפי, או שני בסיסי חישוב שונים.", fb: "בחרתם בדרך הראשונה שעלתה. איזו דרך אחרת הייתה מובילה לאותה תוצאה, ומה היתרון של כל אחת?" },
      design: { act: "סבב סקיצות מהיר: שמונה רעיונות בשמונה דקות, בלי ביקורת, ורק אחר כך מקבצים.", fb: "העליתם הרבה רעיונות, אבל כולם מאותה משפחה. איך היה נראה רעיון הפוך לגמרי?" },
      edu: { act: "הקבוצה מעלה יחד כמה שיותר דרכים להתמודד, כולל כאלה שנשמעות לא מעשיות, בלי לפסול אף אחת.", fb: "הצעתם פתרון שטוב לצד אחד. איזו אפשרות הייתה נותנת משהו גם לצד השני?" } },
    terms: { eng: "סינתזה ויצירת חלופות", design: "רעיונאות (Ideate)", edu: "הצעת פתרונות משותפים" },
    closed: { gist: "בחירת דרך הפתרון מתוך דרכים מוכרות", tag: "מצומצם בבעיה מובנית" },
    leaves: [ { t: "להעלות כמה אפשרויות לפני שבוחרים" }, { t: "להפעיל חשיבה יצירתית" } ],
    theory: "דיואי מתאר את 'העלאת הצעה לפתרון' כשלב בפני עצמו, שקודם לבדיקתה. במודל IDEAL השלב נקרא 'חקירת אסטרטגיות אפשריות', ופוליה שואל 'האם ראית בעיה דומה?' כדי לגייס דרכים מוכרות. ב-Design Thinking זהו שלב ה-Ideate, שבו הכמות והמגוון קודמים לשיפוט. בהערכת חשיבה יצירתית הצוות משתמש בשלושה פרמטרים: כמות רעיונות רלוונטיים, מגוון, ומקוריות.",
    models: ["העלאת הצעה לפתרון", "תכנון (חיפוש דרך)", "E: חקירת אסטרטגיות", "תכנון וביצוע (חלקי)", "Ideate"] },
  { name: "הערכה ובחירה", gist: "החלטה מושכלת בין החלופות",
    act: "הקבוצה קובעת שניים או שלושה קריטריונים, מדרגת כל חלופה לפיהם, ומנמקת את הבחירה במשפט אחד.",
    fb: "הבחירה שלכם מנומקת לפי קריטריונים ברורים. על מה ויתרתם כשבחרתם בדרך הזאת?",
    by: {
      eng: { act: "משווים את הדרכים לפי קריטריונים: כמה נתונים כל אחת דורשת, כמה חישוב, ואיזו רמת דיוק נדרשת. בוחרים ומנמקים.", fb: "נימקתם למה בחרתם בכלי הזה. האם רמת הדיוק שהוא נותן מתאימה למה שהתבקש?" },
      design: { act: "ביקורת עמיתים: כל קבוצה מציגה שלושה קונספטים, והכיתה מדרגת אותם מול הצורך שהוגדר.", fb: "בחרתם בקונספט שהכי אהבתם. איך הוא עונה על הצורך שהגדרתם בהתחלה?" },
      edu: { act: "עוברים על האפשרויות ושואלים על כל אחת: עם מה כל צד יכול לחיות? בוחרים דרך מוסכמת, גם אם אינה מושלמת.", fb: "הגעתם להסכמה שכולם יכולים לחיות איתה. על מה כל צד ויתר כדי להגיע אליה?" } },
    terms: { eng: "השוואה לפי קריטריונים", design: "ביקורת ובחירת קונספט", edu: "גישור והסכמה" },
    closed: { tag: "מצומצם בבעיה מובנית" },
    leaves: [ { t: "לבחון כל חלופה בחשיבה ביקורתית: מה באמת מתאים?" }, { t: "לקבל החלטה בתנאי אי-ודאות" }, { t: "לזכור שגם פתרון לא מושלם, או ההחלטה לא לפעול, הם בחירה" } ],
    theory: "אצל דיואי, לפני שפועלים 'מפתחים בהיגיון את ההשלכות' של כל הצעה. ג'ונאסן מראה שבבעיות לא מובנות אין פתרון אחד נכון, ולכן הלומד צריך לנמק את בחירתו ולהצדיק אותה מול קריטריונים. בבעיות מובנות השלב מצטמצם לבחירת שיטה, ולכן הוא מסומן בעץ כ'מצומצם'.",
    models: ["פיתוח השלכות ההצעה בהיגיון", "תכנון (בחירת הדרך)", "E (בחירה)", "תכנון וביצוע", "ביקורת ובחירת קונספט"] },
  { name: "תכנון ויישום", gist: "הוצאת החלופה שנבחרה לפועל",
    act: "כותבים תוכנית של שלושה עד חמישה צעדים לפני הביצוע, ומסמנים מראש באיזה צעד עלולים להיתקע.",
    fb: "פעלתם לפי התוכנית ועדכנתם אותה כשנתקעתם. מה גרם לכם לשנות כיוון?",
    by: {
      eng: { act: "מפרקים את הבעיה לבעיות קטנות, רושמים את המשוואות בסימנים ובודקים הומוגניות של יחידות, ורק אז מציבים מספרים.", fb: "ההצבה מסודרת וקל לעקוב אחריה. איפה בדרך בדקתם שהיחידות מתאימות?" },
      design: { act: "בונים אב-טיפוס מהיר מנייר או מקרטון בתוך שיעור אחד, רק כדי לבדוק את הרעיון המרכזי.", fb: "האב-טיפוס בודק שאלה אחת ברורה. מה למדתם ממנו שלא ידעתם לפני שבניתם?" },
      edu: { act: "מנסחים הסכם פעולה קצר: מי עושה מה, עד מתי, ואיך נדע שזה קורה.", fb: "ההסכם שלכם ברור ומחולק לתפקידים. מה תעשו אם אחד הצדדים לא יעמוד בו?" } },
    terms: { eng: "תכן ומימוש", design: "אב-טיפוס (Prototype)", edu: "הסכם פעולה וביצוע" },
    leaves: [ { t: "לתכנן את צעדי הפעולה" }, { t: "לבצע" } ],
    theory: "פוליה מפריד בין 'תכנון' ל'ביצוע התוכנית', ומבקש לבדוק כל צעד בזמן הביצוע. ב-PISA 2012 'תכנון וביצוע' הוא תהליך אחד שכולל הצבת יעדי ביניים. ב-Design Thinking היישום הוא אב-טיפוס זול ומהיר, שנועד ללמוד ולא להיות מוצר סופי.",
    models: ["ניסוי ותצפית", "ביצוע התוכנית", "A: פעולה", "תכנון וביצוע", "Prototype"] },
  { name: "בקרה, רפלקציה ושיפור", gist: "בלי השלב הזה המיומנות לא מתפתחת",
    act: "דקת בדיקה בסוף כל משימה: האם התוצאה הגיונית? האם ענינו על מה שנשאל? מה נעשה אחרת בפעם הבאה?",
    fb: "התוצאה נכונה, אבל לא בדקתם אותה. איך הייתם יודעים שהיא סבירה גם בלי פתרון להשוות אליו?",
    tag: "השלב המפוספס ביותר",
    by: {
      eng: { act: "בדיקת שפיות בסוף כל תרגיל: הצבה חוזרת, בדיקת סדר גודל, והאם זה יכול להיות נכון פיזיקלית.", fb: "קיבלתם מספר, אבל לא בדקתם אותו. האם סדר הגודל הזה אפשרי פיזיקלית?" },
      design: { act: "נותנים למשתמש אמיתי לנסות את האב-טיפוס, רושמים מה קרה בפועל, ומחליטים לאיזה שלב חוזרים.", fb: "תיעדתם מה לא עבד בבדיקה. לאיזה שלב בתהליך צריך לחזור בעקבות זה?" },
      edu: { act: "מעגל עיבוד אחרי הפעילות: מה קרה, מה הרגשנו, מה למדנו על הדרך שבה אנחנו מתמודדים, ומה ניקח להמשך.", fb: "שיתפתם במה שהרגשתם בתהליך. מה למדתם על הדרך שבה אתם מתמודדים עם קונפליקט?" } },
    terms: { eng: "בדיקה והערכת תוצאה", design: "בדיקה ואיטרציה (Test)", edu: "עיבוד ורפלקציה" },
    leaves: [ { t: "לבדוק אם התוצאה הגיונית ואפשרית" }, { t: "לבחון אם הפתרון באמת עונה על הבעיה" }, { t: "רפלקציה: לחשוב על דרך החשיבה (מטא-קוגניציה)" }, { t: "להפיק לקחים לפעם הבאה" } ],
    theory: "השלב הרביעי של פוליה, 'מבט לאחור', כולל גם בדיקת התוצאה וגם השאלה מה אפשר ללמוד מהפתרון לבעיות אחרות. במודל IDEAL זה 'Look and learn'. ב-PISA 2012 'ניטור ורפלקציה' מלווה את כל התהליך ולא רק את סופו, בדומה להערת הצוות שרפלקציה רצויה אחרי כל שלב. המושג מטא-קוגניציה (Flavell, 1979) והרפלקציה בפעולה ועל הפעולה (Schön, 1983) מסבירים למה בלי השלב הזה המיומנות לא משתפרת.",
    models: ["קבלה או דחייה לאור התוצאה", "מבט לאחור", "L: הסתכלות ולמידה", "ניטור ורפלקציה", "Test"] }
];

/* ===== המודלים בדף "ביסוס תיאורטי". steps: [שם השלב במודל, [מספרי השלבים שלנו]] ===== */
var MODELS = [
  { name: "חשיבה רפלקטיבית", src: "Dewey, 1910",
    gist: "המודל הראשון שתיאר פתרון בעיות כתהליך בשלבים. החשיבה מתחילה בקושי שמורגש, ולא בשאלה מוכנה, ולכן איתור הבעיה והגדרתה הם כבר חלק מהחשיבה.",
    steps: [["קושי מורגש", [1]], ["איתור הקושי והגדרתו", [1, 2]], ["העלאת הצעה לפתרון", [3]], ["פיתוח השלכות ההצעה בהיגיון", [4]], ["תצפית וניסוי, וקבלה או דחייה", [5, 6]]] },
  { name: "How to Solve It", src: "Pólya, 1945",
    gist: "מודל מתמטי בארבעה שלבים, עם שאלות מנחות לכל שלב (\"מה הנעלם?\", \"האם ראית בעיה דומה?\"). השלב הרביעי, מבט לאחור, הוא המקור לרעיון שבדיקה ורפלקציה הן חלק מהפתרון ולא תוספת.",
    steps: [["הבנת הבעיה", [1, 2]], ["תכנון", [3, 4]], ["ביצוע התוכנית", [5]], ["מבט לאחור", [6]]] },
  { name: "IDEAL", src: "Bransford & Stein, 1984",
    gist: "מודל כללי לכל תחום, שמפריד בין זיהוי הבעיה להגדרתה: הגדרה שונה של אותה בעיה מובילה לפתרונות שונים.",
    steps: [["Identify: זיהוי הבעיה", [1]], ["Define: הגדרה וייצוג", [1, 2]], ["Explore: חקירת אסטרטגיות", [3, 4]], ["Act: פעולה", [5]], ["Look & learn: מבט ולמידה", [6]]] },
  { name: "מסגרת PISA לפתרון בעיות", src: "OECD, 2013",
    gist: "המסגרת שבה ה-OECD מודד פתרון בעיות אצל תלמידים. ארבעה תהליכים, וניטור ורפלקציה מלווים את כל הדרך ולא רק את הסוף.",
    steps: [["חקירה והבנה", [1, 2]], ["ייצוג וניסוח", [2]], ["תכנון וביצוע", [3, 4, 5]], ["ניטור ורפלקציה", [6]]] },
  { name: "Design Thinking", src: "d.school, Stanford",
    gist: "מודל מעולם העיצוב, שמתחיל במשתמש ולא בבעיה. התהליך איטרטיבי: חוזרים לשלבים קודמים לפי מה שלמדו.",
    steps: [["Empathize: אמפתיה ומחקר", [2]], ["Define: הגדרת האתגר", [1]], ["Ideate: רעיונאות", [3]], ["Prototype: אב-טיפוס", [5]], ["Test: בדיקה", [4, 6]]],
    note: "כאן המחקר קודם להגדרה, ההפך מהסדר אצלנו. זה מתאים להערת הצוות שהתהליך ספירלי." }
];
var CONCEPTS = [
  { name: "בעיות מובנות ולא מובנות", src: "Jonassen, 2000",
    gist: "לבעיה מובנית יש דרך פתרון ידועה ותשובה אחת. בבעיה לא מובנית יש כמה פתרונות אפשריים, והלומד צריך לבחור ולנמק. זה הבסיס לבורר \"סוג הבעיה\" בעץ: בבעיה מובנית השלבים 3–4 מצטמצמים." },
  { name: "מטא-קוגניציה ורפלקציה", src: "Flavell, 1979 · Schön, 1983",
    gist: "מטא-קוגניציה היא ידיעה ובקרה של החשיבה של עצמנו. שון מבחין בין רפלקציה בזמן הפעולה לרפלקציה אחריה. שניהם מסבירים למה בלי שלב 6 המיומנות לא משתפרת." },
  { name: "5 Whys", src: "Ohno, 1988",
    gist: "כלי מטויוטה: שואלים \"למה?\" שוב ושוב עד שמגיעים לשורש הבעיה, ולא עוצרים בסימפטום. בעץ הוא מופיע ככלי בשלב 2." }
];

var REFS = [
  "Bransford, J. D., & Stein, B. S. (1984). The IDEAL problem solver. W. H. Freeman.",
  "Dewey, J. (1910). How we think. D. C. Heath.",
  "Flavell, J. H. (1979). Metacognition and cognitive monitoring. American Psychologist, 34(10), 906–911.",
  "Hasso Plattner Institute of Design at Stanford (d.school). An introduction to design thinking: Process guide.",
  "Jonassen, D. H. (2000). Toward a design theory of problem solving. Educational Technology Research and Development, 48(4), 63–85.",
  "OECD (2013). PISA 2012 assessment and analytical framework: Mathematics, reading, science, problem solving and financial literacy. OECD Publishing.",
  "Ohno, T. (1988). Toyota production system: Beyond large-scale production. Productivity Press.",
  "Pólya, G. (1945). How to solve it. Princeton University Press.",
  "Schön, D. A. (1983). The reflective practitioner. Basic Books."
];

/* ===== מאגר הדוגמאות. להוספת דוגמה מוסיפים אובייקט לרשימה. =====
   field: eng | design | edu | other   ptype: closed | open   scope: part | task | course
   stages: מספרי שלבים (1–6)   draft: true = טרם אושרה סופית */
var EXAMPLES = [
  { title: "\"בדיקת שפיות\": האם התוצאה הגיונית?",
    by: "ענבל, אוניברסיטת בן-גוריון בנגב",
    course: "מבוא להנדסת תהליכים, שנה א', כ-70 סטודנטים",
    field: "eng", ptype: "closed", scope: "course", stages: [6], draft: true,
    duration: "רבע שעה של הצגה בשבוע הראשון של הסמסטר, ועוד 2–3 דקות לכל תרגיל שפותרים.",
    lecturer: [
      "מסבירה למה צריך את השלב: בבעיה שעוד לא נפתרה אין תשובה ידועה להשוות אליה, ולכן צריך לוודא בעצמנו שהפתרון הגיוני.",
      "מציגה שלושה כלים בשמם: הצבה חוזרת, בדיקת סדר גודל, ומבחן ההיגיון (\"האם זה יכול להיות נכון פיזיקלית?\").",
      "משלבת את הבדיקה כשלב קבוע בתהליך הפתרון (שלב ד: בדיקה ואימות).",
      "מתמללת את הבדיקה בקול בכל פעם שמסיימים חישוב, גם אם בקצרה."
    ],
    students: [
      "בסוף כל פתרון בודקים: יחידות, סדר גודל, הצבה חוזרת במשוואות, והאם מצאנו את מה שביקשו.",
      "בדיקה אקטיבית (מבקשים נימוק), או בדיקה פסיבית (מתמודדים עם ההשלכות של חוסר הבדיקה)."
    ],
    feedback: "קודם שואלים: \"כיצד בדקת שהתשובה הגיונית?\". אם אין מענה, או שהמענה שגוי, עוברים לשאלות מנחות.",
    worked: "צריך להבין אם הבעיה היא חוסר בדיקה או חוסר ידיעה של העיקרון הפיזיקלי. סטודנט שמגיש טמפרטורה של ‎-300 °C אולי לא בדק, ואולי לא יודע איפה האפס המוחלט. צריך לשאול כדי להפריד בין שני המצבים.",
    adapt: "העיקרון כללי: לפני שמגישים, שואלים \"האם זה הגיוני?\" בכלים של התחום. בעיצוב: בודקים את הפתרון מול הצורך שהוגדר ומול המשתמש. בחינוך: בודקים אם ההסכמה שהושגה אכן עונה על הקונפליקט.",
    materials: "שקף \"בדיקת שפיות\" ושקף \"שלבים בפתרון בעיה: גרסה מקוצרת\" מתוך מצגת הפרק." },

  { title: "\"איך נוכל...?\": שלוש הגדרות לאותה בעיה",
    by: "הצעה של Claude, לא נוסתה בכיתה", proposal: true,
    course: "קורס סטודיו או פרויקט בעיצוב, שנה ב', 20–30 סטודנטים",
    field: "design", ptype: "open", scope: "part", stages: [1, 3],
    duration: "כ-40 דקות בשיעור אחד, בתחילת פרויקט.",
    lecturer: [
      "מציגה בריף קצר ופתוח, למשל \"הסטודנטים לא משתמשים במרחב הלמידה בספרייה\".",
      "מבקשת מכל קבוצה לנסח שלוש הגדרות שונות לבעיה, כל אחת כשאלה שמתחילה ב'איך נוכל...'. לפחות אחת מנקודת המבט של משתמש שלא חשבו עליו.",
      "קוראת בקול כמה הגדרות ומראה שכל הגדרה פותחת כיוון אחר של פתרונות. כך משיימת את השלב: 'הגדרת הבעיה היא כבר חצי מהפתרון'.",
      "רק אחרי זה מאפשרת לקבוצות לבחור הגדרה אחת ולהעלות רעיונות."
    ],
    students: [
      "מנסחים שלוש הגדרות שונות לאותו בריף.",
      "בוחרים אחת ומנמקים למה היא המעניינת או החשובה ביותר.",
      "מעלים לפחות חמישה רעיונות להגדרה שנבחרה, בלי לשפוט אותם."
    ],
    feedback: "משוב על ההגדרות ולא על הרעיונות: \"שלוש ההגדרות שלכם מתארות את אותה בעיה במילים אחרות. איך הייתה נראית הגדרה מנקודת המבט של מי שלא משתמש במרחב בכלל?\"",
    worked: "עוד לא נוסתה. מה כדאי לבדוק כשמנסים: האם הקבוצות מצליחות לנסח הגדרות שונות באמת, או רק ניסוחים שונים של אותו רעיון. אם לא, אפשר לתת להן נקודות מבט מוכנות (משתמש, מנהל, מי שלא מגיע).",
    adapt: "בהנדסה: שתי הגדרות שונות ליעד של אותה בעיה (מה ממזערים, מה ממקסמים), ובודקים איך הבחירה משנה את דרך הפתרון. בחינוך: כל צד בקונפליקט מנסח את הבעיה מנקודת המבט שלו.",
    materials: "" },

  { title: "סבב הקשבה: מה עומד מאחורי העמדה?",
    by: "הצעה של Claude, לא נוסתה בכיתה", proposal: true,
    course: "הכשרת מדריכים בחינוך בלתי פורמלי, 15–25 משתתפים",
    field: "edu", ptype: "open", scope: "part", stages: [2, 4],
    duration: "כ-50 דקות: 30 דקות סימולציה ו-20 דקות עיבוד.",
    lecturer: [
      "מציגה תרחיש של קונפליקט בקבוצה, למשל שני חניכים שרוצים להוביל את אותה פעילות.",
      "מחלקת לשלשות: שני 'צדדים' ו'מגשר'. המגשר אוסף קודם מידע, ורק אחר כך מציע דרכים.",
      "מציגה את ההבחנה בין עמדה ('אני רוצה להוביל') לצורך ('אני רוצה שיראו אותי'). זה השם לשלב: חקר לפני פתרון.",
      "בסוף כל סבב המגשר מציג שתי אפשרויות, והצדדים בוחרים אחת שהם יכולים לחיות איתה."
    ],
    students: [
      "כל צד מתאר את עמדתו, והצד השני חוזר על מה ששמע לפני שהוא מגיב.",
      "המגשר רושם עמדה וצורך לכל צד, ומחפש צורך משותף.",
      "מתחלפים בתפקידים, כך שכל אחד מגשר פעם אחת."
    ],
    feedback: "על תהליך הגישור ולא על ההסכם: \"שאלת שתי שאלות פתוחות לפני שהצעת פתרון. איזה צורך גילית אצל כל צד, ואיך הוא השפיע על מה שהצעת?\"",
    worked: "עוד לא נוסתה. מה כדאי לבדוק כשמנסים: האם המגשרים מצליחים לא לקפוץ לפתרון. אם לא, אפשר להגביל אותם ל'שלוש שאלות לפני כל הצעה'.",
    adapt: "בהנדסה: בפרויקט צוות, שני חברים עם הצעות תכן שונות מציגים את הדרישה שכל הצעה עונה עליה, לפני שבוחרים. בעיצוב: ראיון משתמש שבו מחפשים את הצורך שמאחורי הבקשה.",
    materials: "" }
];

var FIELD_NAMES = { eng: "הנדסה", design: "עיצוב", edu: "חינוך בלתי פורמלי", other: "אחר" };
var PTYPE_NAMES = { closed: "מובנית", open: "לא מובנית" };
var SCOPE_NAMES = { part: "חלק משיעור", task: "תרגיל או מטלה", course: "לאורך כל הקורס" };

/* ===== הערות הצוות: טופס Google עם שם הקטע ממולא מראש ===== */
var FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeMJBuChELowB_I6hbwcfojv1LMljWrY31lU4EemCYTiuduxg/viewform?usp=pp_url";
var FORM_SECTION = "entry.677777509";
function fbHref(section) { return FORM_URL + "&" + FORM_SECTION + "=" + encodeURIComponent(section); }
function fbLink(section, label) {
  var a = document.createElement("a"); a.className = "fb-link"; a.href = fbHref(section);
  a.target = "_blank"; a.rel = "noopener"; a.textContent = "✎ " + (label || "הערה על זה");
  return a;
}

function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

/* ---------- map ---------- */
if (document.getElementById("tree")) {
var state = { field: "shared", ptype: "open", open: STAGES.map(function () { return false; }) };
var tree = document.getElementById("tree");
function examplesFor(i) { return EXAMPLES.filter(function (x) { return x.stages.indexOf(i + 1) >= 0; }); }
function renderTree() {
  tree.textContent = "";
  STAGES.forEach(function (s, i) {
    var closed = state.ptype === "closed" && s.closed ? s.closed : {};
    var term = state.field !== "shared" && s.terms[state.field];
    var li = el("li", "stage");
    var btn = el("button", "node"); btn.type = "button";
    btn.setAttribute("aria-expanded", String(state.open[i])); btn.setAttribute("aria-controls", "leaves-" + i);
    btn.appendChild(el("span", "num", String(i + 1)));
    var body = el("span");
    body.appendChild(el("span", "name", term || s.name));
    if (term) body.appendChild(el("span", "shared", "במונחים משותפים: " + s.name));
    body.appendChild(el("span", "gist", closed.gist || s.gist));
    var tag = closed.tag || s.tag; if (tag) body.appendChild(el("span", "tag", tag));
    btn.appendChild(body); btn.appendChild(el("span", "chev", "◀"));
    btn.addEventListener("click", function () { state.open[i] = !state.open[i]; renderTree(); var b = tree.querySelectorAll(".node")[i]; if (b) b.focus(); });
    li.appendChild(btn);
    var box = el("div"); box.id = "leaves-" + i; box.hidden = !state.open[i];
    var ul = el("ul", "leaves");
    s.leaves.forEach(function (l) { var leaf = el("li", "leaf" + (l.kind ? " " + l.kind : "")); leaf.appendChild(el("span", null, l.t)); ul.appendChild(leaf); });
    box.appendChild(ul);
    var extras = el("div", "extras"), by = (s.by && s.by[state.field]) || {};
    [["act", "דוגמת פעילות", by.act || s.act], ["fb", "היגד משוב", by.fb || s.fb], ["th", "בסיס תיאורטי", s.models.join(" · ")]].forEach(function (x) {
      var d = el("div", "extra " + x[0]); d.appendChild(el("b", null, x[1])); d.appendChild(el("span", null, x[2])); extras.appendChild(d);
    });
    box.appendChild(extras);
    var links = el("p", "stage-links");
    var a1 = el("a", null, "השלב מול המודלים התיאורטיים ←"); a1.href = "theory.html#theory-summary";
    links.appendChild(a1);
    var n = examplesFor(i).length;
    var a2 = el("a", null, n ? "דוגמאות מקורסים לשלב (" + n + ") ←" : "עוד אין דוגמאות לשלב הזה. להוסיף ←");
    a2.href = n ? "examples.html#stage-" + (i + 1) : "template.html";
    links.appendChild(a2);
    var a3 = el("a", null, "רעיון לשיעור לשלב הזה ←"); a3.href = "idea.html#stage-" + (i + 1); links.appendChild(a3);
    links.appendChild(fbLink("עץ · שלב " + (i + 1) + ": " + s.name, "הערה על השלב"));
    box.appendChild(links);
    li.appendChild(box); tree.appendChild(li);
  });
}
document.querySelectorAll('input[name="level"]').forEach(function (r) { r.addEventListener("change", function () { var full = r.value === "full"; state.open = STAGES.map(function () { return full; }); renderTree(); }); });
document.querySelectorAll('input[name="field"]').forEach(function (r) { r.addEventListener("change", function () { state.field = r.value; renderTree(); }); });
document.querySelectorAll('input[name="ptype"]').forEach(function (r) { r.addEventListener("change", function () { state.ptype = r.value; renderTree(); }); });

}

/* ---------- theory ---------- */
if (document.getElementById("theory-table")) {
(function () {
  var tb = document.getElementById("theory-table");
  STAGES.forEach(function (s, i) {
    var tr = el("tr"); var th = el("th", null, (i + 1) + ". " + s.name); th.scope = "row"; tr.appendChild(th);
    s.models.forEach(function (m) { tr.appendChild(el("td", null, m)); });
    tb.appendChild(tr);
  });
  function modelCard(m) {
    var d = el("article", "model");
    var h = el("div", "model-head"); h.appendChild(el("h3", null, m.name)); h.appendChild(el("span", "model-src", m.src)); d.appendChild(h);
    d.appendChild(el("p", "model-gist", m.gist));
    if (m.steps) {
      var ol = el("ol", "msteps");
      m.steps.forEach(function (s) {
        var li = el("li"); li.appendChild(el("span", "mstep", s[0]));
        var ch = el("span", "chips");
        s[1].forEach(function (n) { var c = el("span", "chip st-chip", n + ". " + STAGES[n - 1].name); ch.appendChild(c); });
        li.appendChild(ch); ol.appendChild(li);
      });
      d.appendChild(ol);
    }
    if (m.note) d.appendChild(el("p", "model-note", m.note));
    var fb = el("div", "fb-bar"); fb.appendChild(fbLink("תיאוריה · " + m.name + " (" + m.src + ")")); d.appendChild(fb);
    return d;
  }
  var mbox = document.getElementById("models"); MODELS.forEach(function (m) { mbox.appendChild(modelCard(m)); });
  var cbox = document.getElementById("concepts"); CONCEPTS.forEach(function (m) { cbox.appendChild(modelCard(m)); });
  var refs = document.getElementById("refs");
  REFS.forEach(function (r) { refs.appendChild(el("li", null, r)); });
})();

}

/* ---------- examples ---------- */
if (document.getElementById("ex-cards")) {
function fillSelect(id, opts) {
  var s = document.getElementById(id);
  opts.forEach(function (o) { var op = el("option", null, o[1]); op.value = o[0]; s.appendChild(op); });
  s.addEventListener("change", renderExamples);
}
fillSelect("f-field", [["", "כל התחומים"]].concat(Object.keys(FIELD_NAMES).map(function (k) { return [k, FIELD_NAMES[k]]; })));
fillSelect("f-stage", [["", "כל השלבים"]].concat(STAGES.map(function (s, i) { return [String(i + 1), (i + 1) + ". " + s.name]; })));
fillSelect("f-ptype", [["", "כל הסוגים"]].concat(Object.keys(PTYPE_NAMES).map(function (k) { return [k, PTYPE_NAMES[k]]; })));
fillSelect("f-scope", [["", "כל ההיקפים"]].concat(Object.keys(SCOPE_NAMES).map(function (k) { return [k, SCOPE_NAMES[k]]; })));

function val(id) { return document.getElementById(id).value; }
function renderExamples() {
  var f = val("f-field"), st = val("f-stage"), p = val("f-ptype"), sc = val("f-scope");
  var list = EXAMPLES.filter(function (x) {
    return (!f || x.field === f) && (!st || x.stages.indexOf(+st) >= 0) && (!p || x.ptype === p) && (!sc || x.scope === sc);
  });
  document.getElementById("ex-count").textContent = list.length + " מתוך " + EXAMPLES.length + " דוגמאות";
  var cards = document.getElementById("ex-cards"); cards.textContent = "";
  list.forEach(function (x) {
    var c = el("button", "card"); c.type = "button";
    c.appendChild(el("h3", null, x.title));
    c.appendChild(el("span", "meta", x.course));
    var chips = el("span", "chips");
    if (x.proposal) chips.appendChild(el("span", "chip proposal", "הצעה של Claude"));
    chips.appendChild(el("span", "chip", FIELD_NAMES[x.field]));
    chips.appendChild(el("span", "chip", PTYPE_NAMES[x.ptype]));
    x.stages.forEach(function (n) { chips.appendChild(el("span", "chip st-chip", n + ". " + STAGES[n - 1].name)); });
    c.appendChild(chips);
    c.addEventListener("click", function () { showDetail(x); });
    cards.appendChild(c);
  });
  var add = el("a", "card add"); add.href = "template.html";
  add.appendChild(el("h3", null, "+ להוסיף דוגמה"));
  add.appendChild(el("span", "meta", "יש לך פעילות מהקורס שמפתחת שלב במיומנות? כך מוסיפים אותה."));
  cards.appendChild(add);
  document.getElementById("ex-detail").hidden = true;
}
function ulOf(arr) { var u = el("ul"); arr.forEach(function (t) { u.appendChild(el("li", null, t)); }); return u; }
function showDetail(x) {
  var d = document.getElementById("ex-detail"); d.textContent = "";
  var head = el("div", "detail-head");
  var t = el("div"); t.appendChild(el("h2", null, x.title));
  if (x.draft) t.appendChild(el("span", "draft", "טיוטה, ממתינה לאישור"));
  if (x.proposal) t.appendChild(el("span", "draft", "הצעה של Claude, לא נוסתה בכיתה. לבחינת הצוות"));
  head.appendChild(t);
  var close = el("button", "btn", "סגירה"); close.type = "button";
  close.addEventListener("click", function () { d.hidden = true; });
  head.appendChild(close); d.appendChild(head);
  var dl = el("dl", "fields");
  [["ממלא/ת", x.by], ["קורס וקהל יעד", x.course], ["סוג הבעיה", PTYPE_NAMES[x.ptype]],
   ["השלב במיומנות", x.stages.map(function (n) { return n + ". " + STAGES[n - 1].name; }).join(" · ")],
   ["היקף", SCOPE_NAMES[x.scope]], ["משך זמן", x.duration], ["מה המרצה עושה", x.lecturer], ["מה הסטודנטים עושים", x.students],
   ["משוב על המיומנות", x.feedback], ["מה עבד ומה פחות", x.worked], ["התאמה לקורס אחר", x.adapt], ["חומרים מצורפים", x.materials]
  ].forEach(function (r) {
    if (!r[1]) return;
    dl.appendChild(el("dt", null, r[0]));
    var dd = el("dd"); if (Array.isArray(r[1])) dd.appendChild(ulOf(r[1])); else dd.textContent = r[1];
    dl.appendChild(dd);
  });
  d.appendChild(dl);
  var fb = el("div", "fb-bar"); fb.appendChild(fbLink("דוגמה · " + x.title, "הערה על הדוגמה")); d.appendChild(fb);
  d.hidden = false; close.focus();
}

}

/* ---------- template ---------- */
if (document.getElementById("tpl")) {
(function () {
  var fields = [
    ["שם הדוגמה", "כותרת קצרה"], ["ממלא/ת ומוסד", ""], ["קורס וקהל יעד", "תחום, שנה, מספר סטודנטים"],
    ["סוג הבעיה", "מובנית (דרך פתרון ידועה) או לא מובנית (כמה חלופות אפשריות)"],
    ["השלב במיומנות", "אחד או יותר מששת השלבים"], ["היקף", "חלק משיעור · תרגיל או מטלה · לאורך כל הקורס"],
    ["משך זמן", "בכיתה ומחוץ לה"], ["מה המרצה עושה", "צעדים קונקרטיים, כולל איך משיימים את השלב לסטודנטים"],
    ["מה הסטודנטים עושים", ""], ["איך ניתן משוב על המיומנות", "ולא רק על התוצר. אפשר לצרף היגד משוב לדוגמה"],
    ["מה עבד ומה פחות", "תובנה אחת או שתיים מהניסיון"], ["התאמה לקורס אחר", "מה צריך לשנות כדי להשתמש בזה בתחום אחר"],
    ["חומרים מצורפים", "שקף, דף עבודה, קישור"]
  ];
  var ol = document.getElementById("tpl");
  fields.forEach(function (f) { var li = el("li"); li.appendChild(el("b", null, f[0])); li.appendChild(el("span", null, f[1] || " ")); ol.appendChild(li); });
})();
}


/* ---------- idea (רעיון לשיעור) ----------
   IDEA_API: כתובת ה-Web app של Apps Script (apps-script/SETUP.md). כל עוד ריקה, החלונית מציגה הודעה. */
var IDEA_API = "https://script.google.com/macros/s/AKfycbxEk566uHdTjYnWKGI8cy1BWYBmzZukOYc8sZUoggbUdcx617nA0ni-8JVIeNTC_H54CQ/exec";
if (document.getElementById("idea-form")) {
  var iStage = document.getElementById("i-stage");
  STAGES.forEach(function (s, i) { var o = el("option", null, (i + 1) + ". " + s.name); o.value = String(i + 1); iStage.appendChild(o); });
  var m2 = /^#stage-([1-6])$/.exec(location.hash); if (m2) iStage.value = m2[1];
  var iForm = document.getElementById("idea-form"), go = document.getElementById("i-go"), iStatus = document.getElementById("i-status"), card = document.getElementById("idea-card");
  var lastInput = null;
  function ideaParams() {
    return { course: document.getElementById("i-course").value.trim(), field: document.getElementById("i-field").value,
             year: document.getElementById("i-year").value, stage: iStage.value,
             when: document.getElementById("i-when").value, tool: document.getElementById("i-tool").value };
  }
  function showIdea(x, idea) {
    card.textContent = "";
    card.appendChild(el("span", "draft", "הצעה של AI. כדאי לעבור עליה לפני שימוש"));
    card.appendChild(el("h2", null, idea.title || "רעיון"));
    var dl = el("dl", "fields");
    [["קורס", x.course + " · " + x.field + " · " + x.year], ["שלב", x.stage + ". " + STAGES[x.stage - 1].name], ["כלי ועיתוי", x.tool + " · " + x.when],
     ["מה המרצה עושה", idea.lecturer], ["מה הסטודנטים עושים", idea.students], ["היגד משוב", idea.feedback], ["משך", idea.time]]
      .forEach(function (r) { if (!r[1]) return; dl.appendChild(el("dt", null, r[0])); dl.appendChild(el("dd", null, String(r[1]))); });
    card.appendChild(dl);
    var bar = el("div", "fb-bar");
    var again = el("button", "btn", "רעיון אחר"); again.type = "button";
    again.addEventListener("click", function () { request(lastInput); });
    bar.appendChild(again);
    bar.appendChild(fbLink("רעיון לשיעור · " + (idea.title || "") + " (" + x.course + ", שלב " + x.stage + ")", "הערה על הרעיון"));
    card.appendChild(bar);
    card.hidden = false;
  }
  function request(x) {
    lastInput = x;
    if (!IDEA_API) { iStatus.textContent = "החלונית עוד לא מחוברת לשירות ה-AI. בקרוב."; return; }
    go.disabled = true; iStatus.textContent = "חושב על רעיון…";
    var qs = Object.keys(x).map(function (k) { return k + "=" + encodeURIComponent(x[k]); }).join("&");
    fetch(IDEA_API + "?" + qs).then(function (r) { return r.json(); }).then(function (d) {
      if (d.error) { iStatus.textContent = d.error; return; }
      iStatus.textContent = ""; showIdea(x, d.idea || {});
      card.scrollIntoView({ block: "nearest" });
    }).catch(function () { iStatus.textContent = "לא הצלחנו להתחבר לשירות. נסו שוב בעוד רגע."; })
      .then(function () { go.disabled = false; });
  }
  iForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var x = ideaParams();
    if (!x.course) { iStatus.textContent = "צריך למלא שם קורס."; document.getElementById("i-course").focus(); return; }
    request(x);
  });
}

/* ---------- page init ---------- */
document.getElementById("fb-general").href = fbHref("כללי");
if (document.getElementById("tree")) renderTree();
if (document.getElementById("ex-cards")) {
  var m = /^#stage-([1-6])$/.exec(location.hash);
  if (m) document.getElementById("f-stage").value = m[1];
  renderExamples();
}
if (document.getElementById("theory-summary")) {
  var t = document.getElementById("theory-summary");
  var bar = el("div", "fb-bar"); bar.appendChild(fbLink("תיאוריה · טבלת הסיכום", "הערה על הטבלה"));
  t.parentNode.insertBefore(bar, t.nextSibling.nextSibling);
}
