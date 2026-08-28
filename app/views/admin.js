// לוח מנחָה — פשוט בכוונה: מי נרשם, ומתגי פתיחה/סגירה לכל יחידה.
import { data } from "../api.js";
import { meetings } from "../../content/index.js";

export async function adminView() {
  const [users, config] = await Promise.all([data.listUsers(), data.getConfig()]);
  const wrap = document.createElement("main");
  wrap.className = "admin";

  wrap.innerHTML = `<div class="wk-head"><span class="eyebrow">לוח מנחָה</span><h1>ניהול הסדנה</h1>
    <p class="wk-sub">כאן שולטים במה שהמשתתפים רואים. הכל נשמר מיד.</p></div>`;

  // --- משתתפים ---
  const usersSec = document.createElement("section");
  usersSec.className = "admin-block";
  usersSec.innerHTML = `<h2>נרשמו (${users.length})</h2>`;
  if (users.length === 0) usersSec.innerHTML += `<p class="muted">עדיין אין נרשמים.</p>`;
  else {
    const ul = document.createElement("ul");
    ul.className = "user-list";
    users.forEach((u) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="avatar" aria-hidden="true">${(u.name||"?").charAt(0)}</span>
        <span class="u-main"><strong>${u.name}</strong><small>${u.email}</small></span>
        <span class="u-role ${u.role}">${u.role === "admin" ? "מנחָה" : "משתתפ/ת"}</span>`;
      ul.append(li);
    });
    usersSec.append(ul);
  }
  wrap.append(usersSec);

  // --- שליטה בפתיחת יחידות ---
  meetings.forEach((m) => {
    const sec = document.createElement("section");
    sec.className = "admin-block";
    sec.innerHTML = `<h2>${m.subtitle} · ${m.title}</h2>`;
    const list = document.createElement("ul");
    list.className = "gate-list";
    m.units.forEach((u, i) => {
      const li = document.createElement("li");
      const on = !!config.openUnits[u.id];
      li.innerHTML = `<span class="gate-num">${String(i+1).padStart(2,"0")}</span>
        <span class="gate-title">${u.title}</span>`;
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "switch" + (on ? " on" : "");
      toggle.setAttribute("role", "switch");
      toggle.setAttribute("aria-checked", String(on));
      toggle.setAttribute("aria-label", `פתיחת ${u.title}`);
      toggle.innerHTML = `<span class="knob"></span>`;
      toggle.addEventListener("click", async () => {
        const next = !(toggle.classList.contains("on"));
        toggle.classList.toggle("on", next);
        toggle.setAttribute("aria-checked", String(next));
        await data.setUnitOpen(u.id, next);
        config.openUnits[u.id] = next;
      });
      li.append(toggle);
      list.append(li);
    });
    sec.append(list);
    wrap.append(sec);
  });

  return wrap;
}
