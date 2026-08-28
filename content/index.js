// רישום המפגשים של הסדנה. הוספת מפגש = import + הוספה למערך (לפי order).
import meeting1 from "./meeting-1.js";

export const meetings = [meeting1].sort((a, b) => a.order - b.order);

// רשימה שטוחה של כל היחידות, לפי סדר המפגשים — נוח לניווט ולנעילה.
export const allUnits = meetings.flatMap((m) =>
  m.units.map((u) => ({ ...u, meetingId: m.id, meetingTitle: m.subtitle }))
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
