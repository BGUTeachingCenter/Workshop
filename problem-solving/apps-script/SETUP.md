# הגדרת "רעיון לשיעור" — פעם אחת, כ-10 דקות

הכל בכלים של Google, בלי עלות: **Gemini API** (מסלול חינמי) דרך **Google Apps Script**, שמחזיק את המפתח כך שהאתר לא חושף אותו.

## 1. מפתח Gemini
1. נכנסים ל-[aistudio.google.com](https://aistudio.google.com) עם חשבון Google של הפרויקט.
2. **Get API key → Create API key**. מעתיקים.

## 2. פרויקט Apps Script
1. נכנסים ל-[script.google.com](https://script.google.com) → **New project**. נותנים שם: "רעיון לשיעור — פתרון בעיות".
2. מוחקים את מה שיש בקובץ `Code.gs` ומדביקים את התוכן של `Code.gs` מהתיקייה הזו.
3. ⚙️ **Project Settings** → למטה **Script Properties** → **Add script property**:
   - `GEMINI_API_KEY` = המפתח מסעיף 1
   - (רשות) `DAILY_LIMIT` = 100
   - (רשות) `GEMINI_MODEL` = שם מודל אחר, אם המודל ברירת המחדל לא זמין
   - (רשות) `GEMINI_FALLBACK_MODEL` = מודל גיבוי (ברירת מחדל: `gemini-2.5-flash-lite`). משמש כשהראשי עמוס, הגיע למכסה או לא קיים.
4. **Deploy → New deployment** → בגלגל השיניים בוחרים **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - **Deploy** → מאשרים הרשאות (Advanced → Go to project).
5. מעתיקים את **Web app URL** (מסתיים ב-`/exec`) ושולחים ל-Claude. הוא מדביק אותו ב-`app.js` (`IDEA_API`).

## לשים לב
- במסלול החינמי של Gemini, Google עשויה להשתמש בטקסט שנשלח לשיפור המודלים. החלונית שולחת רק שם קורס ותחום — לא להכניס פרטים אישיים.
- כשמשנים את `Code.gs`: **Deploy → Manage deployments → ✎ → Version: New version**, כדי שהכתובת תישאר אותה כתובת.
