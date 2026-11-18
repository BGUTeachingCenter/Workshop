// רישום המפגשים של הסדנה. הוספת מפגש = import + הוספה למערך (לפי order).
import meeting0 from "./meeting-0.js";
import meeting1 from "./meeting-1.js";
import meeting2 from "./meeting-2.js";
import meeting3 from "./meeting-3.js";

export const meetings = [meeting0, meeting1, meeting2, meeting3].sort((a, b) => a.order - b.order);

// כל בלוק "בדקו את עצמכם" בלי id מקבל מזהה ייחודי לפי היחידה (גם בתוך טאבים).
// בלי זה כל הבלוקים חולקים מפתח שמירה אחד, וסימון ביחידה אחת מופיע בכל האחרות.
meetings.forEach((m) => m.units.forEach((u) => {
  let n = 0;
  const walk = (blocks) => (blocks || []).forEach((b) => {
    if (b.kind === "selfcheck" && !b.id) b.id = `${u.id}-check-${++n}`;
    (b.tabs || []).forEach((t) => walk(t.blocks));
  });
  walk(u.blocks);
}));

// רשימה שטוחה של כל היחידות, לפי סדר המפגשים - נוח לניווט ולנעילה.
export const allUnits = meetings.flatMap((m, mi) =>
  m.units.map((u) => ({ ...u, meetingId: m.id, meetingIndex: mi, meetingTitle: m.subtitle }))
);

// קטלוג ה"בדיקה העצמית" של כל יחידה - ללוח המנחה (מה כל משתתף סימן).
// כל יחידה מחזיקה "משבצות": בלוק בדיקה רגיל = רשימת מפתחות שכולם צריכים להיות מסומנים;
// טאבים (למשל Claude / Codex / Copilot) = חלופות, ומספיק שאחת מהן הושלמה.
// המפתחות זהים לאלה ש-render/blocks.js שומר: `${b.id}-${i}`.
const plainText = (html) => String(html).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const checksIn = (blocks) => (blocks || []).flatMap((b) => b.kind === "selfcheck"
  ? b.items.map((it, i) => ({ key: `${b.id}-${i}`, text: plainText(it) })) : []);

export const checkCatalog = allUnits.map((u, i) => {
  const slots = [];
  (u.blocks || []).forEach((b) => {
    if (b.kind === "selfcheck") slots.push({ all: checksIn([b]) });
    if (b.kind === "tabs") {
      const alts = (b.tabs || []).map((t) => ({ label: t.label, items: checksIn(t.blocks) })).filter((a) => a.items.length);
      if (alts.length) slots.push({ any: alts });
    }
  });
  return { unitId: u.id, number: i + 1, title: u.title, meetingIndex: u.meetingIndex, slots };
}).filter((c) => c.slots.length);

// מצב יחידה אחת אצל משתתף: done = כל המשבצות הושלמו; checked = פריטים מסומנים (טקסטים).
export function unitCheckStatus(entry, checks) {
  const on = (it) => !!checks?.[it.key];
  let done = true; const checked = [];
  entry.slots.forEach((s) => {
    if (s.all) { s.all.filter(on).forEach((it) => checked.push(it.text)); if (!s.all.every(on)) done = false; }
    else {
      s.any.forEach((a) => a.items.filter(on).forEach((it) => checked.push(`${a.label}: ${it.text}`)));
      if (!s.any.some((a) => a.items.every(on))) done = false;
    }
  });
  return { done, checked };
}

export function findUnit(unitId) {
  return allUnits.find((u) => u.id === unitId) || null;
}

// ברירת המחדל של מצב הפתיחה: יחידה ראשונה פתוחה, השאר נעולות.
// (בשלב 2 האדמין ישלוט בזה; כרגע זה מדגים את חוויית ה-progressive disclosure.)
export function defaultOpenUnits() {
  const open = {};
  allUnits.forEach((u, i) => {
    open[u.id] = i < 3; // שלוש הראשונות פתוחות להדגמה
  });
  return open;
}
