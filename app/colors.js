// צבע ייחודי לכל יחידה. גוון (hue) נגזר מהמיקום ברשימת היחידות,
// פרוס באופן שווה כדי שכל היחידות ייבדלו זו מזו — בהיר וקריא על רקע לבן.
export function accentVars(index, total) {
  const start = 250; // מתחילים מהסגול של המותג ומסתובבים
  const h = Math.round((start + index * (360 / Math.max(total, 1))) % 360);
  return {
    "--accent": `hsl(${h} 62% 53%)`,
    "--accent-deep": `hsl(${h} 60% 45%)`,
    "--accent-ink": `hsl(${h} 52% 38%)`,
    "--accent-tint": `hsl(${h} 66% 96%)`,
  };
}

export function applyAccent(el, index, total) {
  const v = accentVars(index, total);
  for (const k in v) el.style.setProperty(k, v[k]);
}
