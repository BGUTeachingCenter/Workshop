// צבע לכל מפגש. כל היחידות של מפגש חולקות את צבע המפגש.
// גוונים מוגדרים ידנית כדי שיהיו נעימים ומובחנים. האינדקס הוא מיקום המפגש ברשימה:
// 0 = פרק 0 (הקדמה, ורוד), 1 = מפגש 1 (סגול המותג), 2 = מפגש 2 (ירוק), 3 = מפגש 3 (כתום).
const MEETING_HUES = [330, 250, 168, 30, 200, 96];

function varsForHue(h) {
  return {
    "--accent": `hsl(${h} 62% 53%)`,
    "--accent-deep": `hsl(${h} 60% 45%)`,
    "--accent-ink": `hsl(${h} 52% 38%)`,
    "--accent-tint": `hsl(${h} 66% 96%)`,
  };
}

export function applyMeetingAccent(el, meetingIndex) {
  const v = varsForHue(MEETING_HUES[meetingIndex % MEETING_HUES.length]);
  for (const k in v) el.style.setProperty(k, v[k]);
}
