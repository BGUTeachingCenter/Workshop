// תצוגת יחידה בודדת — כותרת, פתיח, ובלוקים דרך ה-renderer הגנרי.
import { auth, data } from "../api.js";
import { allUnits, findUnit } from "../../content/index.js";
import { renderBlock } from "../render/blocks.js";
import { navigate } from "../router.js";

export async function unitView(unitId) {
  const user = auth.current();
  const unit = findUnit(unitId);
  const config = await data.getConfig();
  const wrap = document.createElement("main");
  wrap.className = "unit";

  if (!unit) { wrap.innerHTML = `<div class="notice">היחידה לא נמצאה.</div>`; return wrap; }
  if (!config.openUnits[unit.id]) {
    wrap.innerHTML = `<div class="notice locked"><strong>היחידה עדיין נעולה</strong><p>היא תיפתח בהמשך המפגש, בהנחיית המנחָה.</p>
      <button class="text-btn" type="button" onclick="location.hash='#/workshop'">→ חזרה למסע</button></div>`;
    return wrap;
  }

  const progress = await data.getProgress(user.uid);
  const saved = document.createElement("span");
  saved.className = "save-status";
  const flashSaved = () => { saved.innerHTML = `<i></i> נשמר`; saved.classList.add("show"); clearTimeout(flashSaved._t); flashSaved._t = setTimeout(() => saved.classList.remove("show"), 1400); };

  const ctx = {
    getAnswer: (k) => progress.answers[k],
    saveAnswer: (k, v) => { progress.answers[k] = v; data.saveAnswer(user.uid, k, v); flashSaved(); },
    getCheck: (k) => progress.checks[k],
    saveCheck: (k, v) => { progress.checks[k] = v; data.saveCheck(user.uid, k, v); flashSaved(); },
  };

  // ניווט בין יחידות פתוחות בלבד
  const openUnits = allUnits.filter((u) => config.openUnits[u.id]);
  const idx = openUnits.findIndex((u) => u.id === unit.id);
  const prev = openUnits[idx - 1];
  const next = openUnits[idx + 1];

  const card = document.createElement("article");
  card.className = "unit-card";
  const header = document.createElement("div");
  header.className = "unit-card-head";
  header.innerHTML = `<span class="unit-eyebrow">${unit.meetingTitle} · יחידה ${idx + 1} מתוך ${openUnits.length}</span>
    <h1>${unit.title}</h1><p class="lead">${unit.lead}</p>`;
  card.append(header);

  const body = document.createElement("div");
  body.className = "unit-body";
  unit.blocks.forEach((b) => body.append(renderBlock(b, ctx)));
  card.append(body);

  const footer = document.createElement("footer");
  footer.className = "unit-nav";
  const back = document.createElement("button");
  back.className = "text-btn"; back.type = "button";
  back.innerHTML = prev ? `→ ${prev.title}` : "→ חזרה למסע";
  back.addEventListener("click", () => navigate(prev ? "/unit/" + prev.id : "/workshop"));

  const fwd = document.createElement("button");
  fwd.className = "primary"; fwd.type = "button";
  fwd.innerHTML = next ? `הבא <span aria-hidden="true">←</span>` : `סיימתי — למסע <span aria-hidden="true">←</span>`;
  fwd.addEventListener("click", () => navigate(next ? "/unit/" + next.id : "/workshop"));

  footer.append(back, saved, fwd);
  card.append(footer);
  wrap.append(card);
  wrap.scrollTo?.(0, 0);
  return wrap;
}
