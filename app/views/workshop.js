// מסע הסדנה - כל המפגשים והיחידות, עם מצב פתוח/נעול (progressive disclosure).
import { auth, data } from "../api.js";
import { meetings } from "../../content/index.js";
import { navigate } from "../router.js";
import { applyMeetingAccent } from "../colors.js";

const unitTouched = (unit, progress) =>
  unit.blocks.some((b) => (b.id && progress.answers[b.id]) ||
    (b.items && b.items.some((_, i) => progress.checks[`${b.id || "check"}-${i}`])));

export async function workshopView() {
  const user = auth.current();
  const [config, progress] = await Promise.all([data.getConfig(), data.getProgress(user.uid)]);
  const isOpen = (id) => !!config.openUnits[id];

  const openCount = meetings.flatMap((m) => m.units).filter((u) => isOpen(u.id)).length;
  const totalCount = meetings.flatMap((m) => m.units).length;

  const wrap = document.createElement("main");
  wrap.className = "workshop";

  const head = document.createElement("div");
  head.className = "wk-head";
  head.innerHTML = `
    <span class="eyebrow">שלום ${user.name} 👋</span>
    <h1>מסע הסדנה</h1>
    <p class="wk-sub">בכל שלב ייפתח לך החלק הבא. כרגע פתוחות ${openCount} מתוך ${totalCount} יחידות.</p>`;
  wrap.append(head);

  meetings.forEach((m, mi) => {
    const sec = document.createElement("section");
    sec.className = "meeting-block";
    applyMeetingAccent(sec, mi);
    sec.innerHTML = `<div class="meeting-head"><span class="m-sub">${m.subtitle}</span><h2>${m.title}</h2><p class="m-summary">${m.summary}</p></div>`;
    const list = document.createElement("ol");
    list.className = "unit-list";

    m.units.forEach((u, i) => {
      const open = isOpen(u.id);
      const touched = open && unitTouched(u, progress);
      const li = document.createElement("li");
      li.className = "unit-row" + (open ? "" : " locked") + (touched ? " done" : "");

      const num = String(i + 1).padStart(2, "0");
      const state = open
        ? (touched ? `<span class="state done">✓ המשך</span>` : `<span class="state open">פתוח</span>`)
        : `<span class="state lock">⌑ ייפתח בהמשך</span>`;

      const canEnter = open || user.role === "admin"; // המנחה יכול/ה להיכנס גם לנעולות
      const btn = document.createElement(canEnter ? "button" : "div");
      btn.className = "unit-row-inner";
      if (canEnter) { btn.type = "button"; btn.addEventListener("click", () => navigate("/unit/" + u.id)); }
      btn.innerHTML = `
        <span class="unit-num">${num}</span>
        <span class="unit-main"><strong>${u.title}</strong>${u.lead ? `<small>${u.lead}</small>` : ""}</span>
        ${state}`;
      li.append(btn);
      list.append(li);
    });

    sec.append(list);
    wrap.append(sec);
  });

  return wrap;
}
