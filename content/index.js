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
