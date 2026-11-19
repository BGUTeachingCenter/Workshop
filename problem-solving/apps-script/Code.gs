/**
 * "רעיון לשיעור" — מתווך קטן בין האתר ל-Gemini API.
 * המפתח נשמר כאן (Script Properties) ולא באתר, כך שלא נחשף לגולשים.
 *
 * הגדרה חד-פעמית (ראו SETUP.md):
 *   Project Settings → Script Properties:
 *     GEMINI_API_KEY = המפתח מ-Google AI Studio
 *     GEMINI_MODEL   = שם המודל (ברירת מחדל: gemini-3.8-flash)
 *     GEMINI_FALLBACK_MODEL = מודל גיבוי, אם הראשי עמוס או לא זמין (ברירת מחדל: gemini-3.5-flash-lite)
 *     DAILY_LIMIT    = מקסימום בקשות ביום (ברירת מחדל: 100)
 *   Deploy → New deployment → Web app → Execute as: Me · Who has access: Anyone
 */

var STAGE_NAMES = ["זיהוי הבעיה", "איסוף נתונים וחקר", "חיפוש חלופות", "הערכה ובחירה", "תכנון ויישום", "בקרה, רפלקציה ושיפור"];

function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    checkLimits_();
    var stage = parseInt(p.stage, 10);
    if (!(stage >= 1 && stage <= 6)) return json_({ error: "שלב לא תקין" });
    var input = {
      course: clip_(p.course, 120), field: clip_(p.field, 80), year: clip_(p.year, 30),
      when: clip_(p.when, 40), tool: clip_(p.tool, 40), stage: stage
    };
    if (!input.course) return json_({ error: "חסר שם קורס" });
    return json_({ idea: askGemini_(input) });
  } catch (err) {
    return json_({ error: String(err.message || err) });
  }
}

function askGemini_(x) {
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty("GEMINI_API_KEY") || props.getProperty("Gemini API key");
  if (key) key = key.trim();
  if (!key) throw new Error("החלונית עוד לא הוגדרה (חסר מפתח).");
  var models = [props.getProperty("GEMINI_MODEL") || "gemini-3.8-flash",
                props.getProperty("GEMINI_FALLBACK_MODEL") || "gemini-3.5-flash-lite"];

  var prompt =
    "את/ה יועץ/ת פדגוגי/ת למרצים באקדמיה. הצע/י רעיון אחד, קונקרטי ומעשי, לפיתוח מיומנות פתרון בעיות אצל סטודנטים.\n" +
    "המיומנות מחולקת לשישה שלבים: " + STAGE_NAMES.map(function (n, i) { return (i + 1) + ". " + n; }).join(" · ") + ".\n" +
    "הרעיון מתמקד בשלב " + x.stage + ": " + STAGE_NAMES[x.stage - 1] + ".\n\n" +
    "פרטי ההקשר:\n" +
    "- קורס: " + x.course + "\n" +
    (x.field ? "- תחום: " + x.field + "\n" : "") +
    (x.year ? "- שנת לימוד: " + x.year + "\n" : "") +
    (x.when ? "- מתי בסמסטר: " + x.when + "\n" : "") +
    (x.tool ? "- כלי: " + x.tool + "\n" : "") +
    "\nכתוב/י בעברית, בשפה פשוטה, בלי ז'רגון. הרעיון צריך להיות ישים כבר בשבוע הבא, בתוכן של הקורס הזה.\n" +
    "החזר/י JSON בלבד, בדיוק עם השדות: " +
    "title (כותרת קצרה), lecturer (מה המרצה עושה, 2–3 משפטים), students (מה הסטודנטים עושים, 2–3 משפטים), " +
    "feedback (היגד משוב אחד לסטודנטים על המיומנות ולא על התוצר), time (משך משוער).";

  var payload = JSON.stringify({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.9, maxOutputTokens: 1200, responseMimeType: "application/json" }
  });
  /* קודם Gemini API (מפתחות של AI Studio — AIza או AQ.), ואם נדחה — Vertex AI (express mode). */
  var endpoints = [
    function (m) { return { url: "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(m) + ":generateContent",
                            headers: { "x-goog-api-key": key } }; },
    function (m) { return { url: "https://aiplatform.googleapis.com/v1/publishers/google/models/" + encodeURIComponent(m) + ":generateContent?key=" + encodeURIComponent(key),
                            headers: {} }; }
  ];
  var lastCode = 0, lastMsg = "", errs = [];
  for (var e = 0; e < endpoints.length; e++) {
    for (var i = 0; i < models.length; i++) {
      var ep = endpoints[e](models[i]);
      var res = UrlFetchApp.fetch(ep.url, {
        method: "post", contentType: "application/json", muteHttpExceptions: true,
        headers: ep.headers, payload: payload
      });
      lastCode = res.getResponseCode();
      if (lastCode !== 200) {
        try { lastMsg = (JSON.parse(res.getContentText()).error || {}).message || ""; } catch (x) { lastMsg = ""; }
        errs.push((e === 0 ? "Gemini API" : "Vertex") + " " + lastCode + ": " + lastMsg.slice(0, 160));
        if (lastCode === 401 || lastCode === 403) break;   /* המפתח לא מתאים לשירות הזה → השירות הבא */
        continue;                                           /* עומס / מודל לא קיים / תקלה → מודל הגיבוי */
      }
      var data = JSON.parse(res.getContentText());
      var parts = (((data.candidates || [])[0] || {}).content || {}).parts;
      var text = parts && parts[0] && parts[0].text;
      if (!text) continue;
      var idea;
      try { idea = JSON.parse(text); } catch (x2) { idea = { title: "רעיון", lecturer: text }; }
      idea.model = models[i];
      return idea;
    }
  }
  if (lastCode === 429) throw new Error("הגענו למגבלת השימוש החינמית לרגע זה. נסו שוב בעוד דקה.");
  throw new Error("השירות לא זמין. " + errs.join(" | "));
}

/* מגבלות: לא יותר מ-10 בקשות בדקה, ותקרה יומית. */
function checkLimits_() {
  var cache = CacheService.getScriptCache();
  var minuteKey = "m" + Math.floor(Date.now() / 60000);
  var m = parseInt(cache.get(minuteKey) || "0", 10);
  if (m >= 10) throw new Error("יש כרגע הרבה בקשות. נסו שוב בעוד דקה.");
  cache.put(minuteKey, String(m + 1), 120);

  var props = PropertiesService.getScriptProperties();
  var today = Utilities.formatDate(new Date(), "Asia/Jerusalem", "yyyy-MM-dd");
  var limit = parseInt(props.getProperty("DAILY_LIMIT") || "100", 10);
  var lock = LockService.getScriptLock(); lock.waitLock(5000);
  try {
    var used = props.getProperty("USED_" + today);
    used = used ? parseInt(used, 10) : 0;
    if (used >= limit) throw new Error("הגענו למכסה היומית של הדגמה. נסו שוב מחר.");
    props.setProperty("USED_" + today, String(used + 1));
  } finally { lock.releaseLock(); }
}

function clip_(s, n) { return String(s || "").trim().slice(0, n); }
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
