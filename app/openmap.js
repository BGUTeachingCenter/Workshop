// אילו יחידות פתוחות - לכל קבוצה מפה משלה.
//
// workshop/config:
//   openUnits  { <unitId>: bool }              - מפה כללית: למי שלא שייך לקבוצה, ולקבוצה שעוד אין לה מפה
//   groupOpen  { <groupId>: { <unitId>: bool } } - מפה לכל קבוצה
//
// כך קבוצה שכבר התחילה שומרת על מה שנפתח לה, וקבוצה חדשה מתחילה כשהכול סגור.
// המנחה פותח וסוגר תמיד עבור הקבוצה הפעילה (config.activeGroup).

export function openMapFor(config, groupId) {
  const g = groupId && config.groupOpen && config.groupOpen[groupId];
  return g || config.openUnits || {};
}

// הקבוצה של משתתף/ת: השיוך הראשון (מצטרפים פעם אחת, לקבוצה שפעילה בכניסה הראשונה).
export function groupOf(user) {
  return user?.group ?? (Array.isArray(user?.groups) ? user.groups[0] : null) ?? null;
}

// עדכון מקומי של config אחרי שינוי - אותה לוגיקה כמו ב-backend, כדי שהמסך יתאים בלי טעינה מחדש.
export function applyOpen(config, groupId, changes) {
  if (!groupId) { config.openUnits = { ...(config.openUnits || {}), ...changes }; return; }
  config.groupOpen = config.groupOpen || {};
  config.groupOpen[groupId] = { ...openMapFor(config, groupId), ...changes };
}

// קבוצה חדשה הופכת לפעילה: הקבוצה הקודמת "מוקפאת" עם מה שנפתח לה, והחדשה מתחילה סגורה.
export function startGroup(config, newId, allUnitIds) {
  config.groupOpen = config.groupOpen || {};
  const prev = config.activeGroup;
  if (prev && !config.groupOpen[prev]) config.groupOpen[prev] = { ...(config.openUnits || {}) };
  config.groupOpen[newId] = Object.fromEntries(allUnitIds.map((id) => [id, false]));
  config.activeGroup = newId;
  return { activeGroup: newId, groupOpen: { [newId]: config.groupOpen[newId], ...(prev ? { [prev]: config.groupOpen[prev] } : {}) } };
}
