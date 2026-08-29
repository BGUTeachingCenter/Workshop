// צבע לכל מפגש. כל היחידות של מפגש חולקות את צבע המפגש.
// גוונים מוגדרים ידנית כדי שיהיו נעימים ומובחנים (מפגש 1 = סגול המותג).
const MEETING_HUES = [250, 168, 30, 330, 200, 96];

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
