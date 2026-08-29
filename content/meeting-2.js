// מפגש 2 — מכלי בודד לאפליקציה מלאה, מפורסמת ומוטמעת
// אותו מודל בלוקים כמו מפגש 1. לשון נקבה, כיתוב ממוקד־משימה.

export default {
  id: "m2",
  order: 2,
  title: "מכלי בודד לאפליקציה מלאה",
  subtitle: "מפגש 2",
  summary: "מעבירות את הכלי לסביבת פיתוח בענן, מרחיבות אותו לאפליקציה, מפרסמות לאתר, ומטמיעות במודל.",
  units: [
    {
      id: "m2-u1",
      title: "פותחות פרויקט ב־GitHub",
      lead: "",
      blocks: [
        { kind: "text", html: "GitHub הוא הבית של הפרויקט — משם אפשר לפתח, לפרסם ולשתף. נעביר אליו את הכלי מהמפגש הקודם." },
        {
          kind: "steps",
          items: [
            "היכנסי ל־<code>github.com</code> והירשמי לחשבון חינמי (או התחברי אם כבר יש לך).",
            "לחצי על <b>+</b> בפינה העליונה ← <b>New repository</b>.",
            "תני שם (למשל <code>my-tool</code>), סמני <b>Public</b> ו־<b>Add a README</b>, ולחצי <b>Create repository</b>.",
            "לחצי <b>Add file ← Upload files</b>, וגררי את הקובץ <code>tool.html</code> מהמפגש הקודם. שמרי (Commit)."
          ]
        },
        {
          kind: "selfcheck",
          label: "בדקי את עצמך",
          items: [
            "יש לך repository חדש ב־GitHub.",
            "הקובץ tool.html מופיע בתוכו."
          ]
        }
      ]
    },
    {
      id: "m2-u2",
      title: "סביבת עבודה בענן — Codespaces",
      lead: "",
      blocks: [
        { kind: "text", html: "Codespaces הוא מחשב פיתוח שרץ בדפדפן, ישר מתוך ה־repo — בלי שום התקנה על המחשב שלך." },
        {
          kind: "steps",
          items: [
            "ב־repo, לחצי על הכפתור הירוק <b>Code</b>.",
            "עברי ללשונית <b>Codespaces</b> ולחצי <b>Create codespace on main</b>.",
            "חכי שהסביבה תיטען — ייפתח עורך (VS Code) בתוך הדפדפן."
          ]
        },
        { kind: "task", label: "קבצים", html: "בצד — רשימת הקבצים של הפרויקט." },
        { kind: "task", label: "עורך", html: "באמצע — כאן רואים ועורכים את הקוד." },
        { kind: "task", label: "טרמינל", html: "למטה — שורת פקודה. אם היא סגורה: <b>Terminal ← New Terminal</b>." },
        {
          kind: "selfcheck",
          label: "בדקי את עצמך",
          items: [
            "נפתח עורך VS Code בתוך הדפדפן.",
            "רואים את הקבצים של הפרויקט."
          ]
        }
      ]
    },
    {
      id: "m2-u3",
      title: "מחברות את Claude Code",
      lead: "",
      blocks: [
        { kind: "text", html: "Claude Code הוא עוזר AI שמפתח איתך ישר בתוך הסביבה. נתקין אותו בטרמינל." },
        {
          kind: "steps",
          items: [
            "פתחי טרמינל (<b>Terminal ← New Terminal</b>).",
            "הדביקי את הפקודה הבאה והריצי (Enter):"
          ]
        },
        { kind: "code", code: "npm install -g @anthropic-ai/claude-code" },
        {
          kind: "steps",
          start: 3,
          items: [
            "כשההתקנה הסתיימה, כתבי <code>claude</code> והריצי.",
            "עקבי אחרי ההוראות כדי להתחבר לחשבון (ייפתח קישור התחברות)."
          ]
        },
        {
          kind: "selfcheck",
          label: "בדקי את עצמך",
          items: [
            "Claude Code רץ בטרמינל ומחכה להוראות."
          ]
        }
      ]
    },
    {
      id: "m2-u4",
      title: "מנהלות פיתוח עם AI",
      lead: "",
      blocks: [
        { kind: "text", html: "מכאן את מנהלת: מבקשת, בודקת, מאשרת. Claude Code כותב את הקוד. זו לולאה שחוזרת." },
        {
          kind: "prompt",
          label: "בקשה ל־Claude Code",
          code: "קח את הכלי הקיים (tool.html) והפוך אותו לאפליקציה.\nהוסף [היכולת שהייתי רוצה], שמור על עיצוב פשוט וברור,\nוהראה לי תצוגה מקדימה בדפדפן."
        },
        {
          kind: "steps",
          items: [
            "תארי ל־Claude Code מה תרצי להוסיף או לשנות.",
            "תני לו לבצע, ובקשי לראות תצוגה מקדימה.",
            "בדקי בעצמך — האם זה מה שרצית?",
            "לא? הסבירי מה לתקן ובקשי שוב. כן? אשרי, ובקשי לשמור ב־GitHub (commit + push)."
          ]
        },
        {
          kind: "task",
          label: "הרחיבי בשתי יכולות",
          html: "יכולת 1 · משהו שהסטודנט <b>עושה</b> · יכולת 2 · משוב או תוצאה שהסטודנט <b>מקבל</b>."
        },
        {
          kind: "reflection",
          id: "m2-features",
          label: "מה הוספת?",
          prompt: "כתבי אילו יכולות הוספת לכלי.",
          placeholder: "הוספתי אפשרות ל… ומשוב ש…",
          hint: ""
        }
      ]
    },
    {
      id: "m2-u5",
      title: "מפרסמות לאתר עם GitHub Pages",
      lead: "",
      blocks: [
        { kind: "text", html: "עכשיו נהפוך את ה־repo לאתר חי — קישור ציבורי שאפשר לתת לכל אחד." },
        {
          kind: "steps",
          items: [
            "ודאי שהקובץ הראשי נקרא <code>index.html</code>. אם לא — בקשי מ־Claude Code לשנות את השם ולשמור.",
            "ב־GitHub: <b>Settings</b> של ה־repo ← <b>Pages</b>.",
            "תחת <b>Branch</b> בחרי <b>main</b> ותיקייה <b>/ (root)</b>, ולחצי <b>Save</b>.",
            "חכי כדקה ורענני — יופיע קישור: <code>https://&lt;שם־המשתמש&gt;.github.io/&lt;שם־ה־repo&gt;</code>"
          ]
        },
        {
          kind: "selfcheck",
          label: "בדקי את עצמך",
          items: [
            "הקישור נפתח ומראה את הכלי.",
            "שליחת הקישור למישהו אחר — עובדת אצלו."
          ]
        }
      ]
    },
    {
      id: "m2-u6",
      title: "אורזות כ־SCORM ומעלות למודל",
      lead: "",
      blocks: [
        { kind: "text", html: "SCORM היא אריזה שמודל יודע לקרוא כפעילות לימודית — וגם לדעת מתי הסטודנט השלים אותה. נבקש מ־Claude Code לארוז." },
        {
          kind: "prompt",
          label: "בקשה ל־Claude Code",
          code: "ארוז את האפליקציה (index.html והקבצים שלה) כחבילת SCORM 1.2.\nצור imsmanifest.xml מתאים, כלול את כל הקבצים,\nוסמן את הפעילות כ'הושלמה' כשהסטודנט פותח אותה.\nתן לי קובץ zip מוכן להעלאה למודל.",
          note: "היתרון על קישור רגיל: מודל יודע לדווח שהסטודנט נכנס והשלים."
        },
        {
          kind: "steps",
          items: [
            "בקשי מ־Claude Code לארוז כ־SCORM (הפרומפט למעלה), והורידי את קובץ ה־zip.",
            "במודל, במצב עריכה: <b>הוספת משאב או פעילות</b> ← <b>חבילת SCORM</b>.",
            "גררי את קובץ ה־zip, שמרי, ולחצי כדי לבדוק שהכלי נפתח."
          ]
        },
        {
          kind: "selfcheck",
          label: "בדקי את עצמך",
          items: [
            "הפעילות מופיעה בקורס כ־SCORM.",
            "פתיחה שלה מריצה את הכלי."
          ]
        }
      ]
    },
    {
      id: "m2-u7",
      title: "עוצרות ומשתפות",
      lead: "",
      blocks: [
        {
          kind: "pause",
          title: "נקודת עצירה",
          html: "יש לך אפליקציה מלאה — בקוד, באתר חי, וכפעילות במודל.<br>חזרי לקבוצה; השלב הבא ייפתח בהנחיית המנחָה."
        }
      ]
    }
  ]
};
