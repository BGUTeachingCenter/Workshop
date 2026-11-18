// לוח מנחה: קבוצות (מי נכנס ומה סימנו), ומתגי פתיחה/סגירה לכל יחידה.
import { data } from "../api.js";
import { meetings, checkCatalog, unitCheckStatus } from "../../content/index.js";
import { applyMeetingAccent } from "../colors.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const when = (t) => t ? new Date(t).toLocaleString("he-IL", { day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
const ALL = "__all", NONE = "__none";

export async function adminView() {
  // listGroups נכשל כשכללי האבטחה עוד לא עודכנו - הלוח ממשיך לעבוד, עם הודעה.
  let rulesOld = false;
  const [users, config, groups] = await Promise.all([data.listUsers(), data.getConfig(),
    data.listGroups().catch(() => { rulesOld = true; return []; })]);
  const wrap = document.createElement("main");
  wrap.className = "admin";

  wrap.innerHTML = `<div class="wk-head"><span class="eyebrow">לוח מנחה</span><h1>ניהול הסדנה</h1>
    <p class="wk-sub">קבוצות, מעקב אחרי המשתתפים, ופתיחה וסגירה של יחידות. הכול נשמר מיד.</p></div>`;

  // --- קבוצות + מעקב ---
  const groupSec = document.createElement("section");
  groupSec.className = "admin-block";
  const trackSec = document.createElement("section");
  trackSec.className = "admin-block";
  wrap.append(groupSec, trackSec);

  let selected = config.activeGroup || ALL;

  function renderGroups() {
    const active = groups.find((g) => g.id === config.activeGroup);
    groupSec.innerHTML = `<h2>קבוצות</h2>${rulesOld ? `<p class="track-warn">כדי להשתמש בקבוצות צריך לפרסם את כללי האבטחה המעודכנים (firestore.rules) בקונסולת Firebase.</p>` : ""}
      <p class="group-active">${active
        ? `קבוצה פעילה: <strong>${esc(active.name)}</strong>. מעכשיו, כל כניסה לאתר מצרפת אליה.`
        : `אין קבוצה פעילה. כניסות חדשות לא משויכות לקבוצה.`}</p>`;
    const row = document.createElement("div");
    row.className = "admin-bulk group-row";

    const add = document.createElement("button");
    add.type = "button"; add.textContent = "פתיחת קבוצה חדשה";
    add.addEventListener("click", async () => {
      const name = (prompt("שם לקבוצה החדשה (למשל: מכללת ספיר · נובמבר 2026)") || "").trim();
      if (!name) return;
      add.disabled = true;
      try {
        const id = await data.createGroup(name);
        groups.unshift({ id, name, createdAt: Date.now() });
        config.activeGroup = id; selected = id;
        if (confirm(`הקבוצה "${name}" נפתחה והיא הפעילה עכשיו.\nלסגור את כל היחידות, כדי שהקבוצה תתחיל מההתחלה?`)) {
          const ids = meetings.flatMap((m) => m.units.map((u) => u.id));
          await data.setAllUnitsOpen(ids, false);
          ids.forEach((u) => { config.openUnits[u] = false; });
          wrap.querySelectorAll(".switch").forEach((t) => { t.classList.remove("on"); t.setAttribute("aria-checked", "false"); });
        }
        renderGroups(); renderTracking();
      } catch (err) { alert("הפעולה נכשלה: " + (err.message || err)); }
      finally { add.disabled = false; }
    });

    const pick = document.createElement("select");
    pick.className = "group-pick";
    pick.setAttribute("aria-label", "איזו קבוצה להציג");
    const opts = [
      ...groups.map((g) => [g.id, g.name + (g.id === config.activeGroup ? " · פעילה" : "")]),
      [ALL, "כל הנרשמים"], [NONE, "ללא קבוצה"],
    ];
    opts.forEach(([v, label]) => { const o = document.createElement("option"); o.value = v; o.textContent = label; pick.append(o); });
    pick.value = selected;
    pick.addEventListener("change", () => { selected = pick.value; renderGroups(); renderTracking(); });

    row.append(add, pick);
    if (groups.some((g) => g.id === selected) && selected !== config.activeGroup) {
      const act = document.createElement("button");
      act.type = "button"; act.textContent = "הפיכה לקבוצה הפעילה";
      act.addEventListener("click", async () => {
        act.disabled = true;
        try { await data.setActiveGroup(selected); config.activeGroup = selected; renderGroups(); }
        catch (err) { alert("הפעולה נכשלה: " + (err.message || err)); act.disabled = false; }
      });
      row.append(act);
    }
    if (config.activeGroup) {
      const stop = document.createElement("button");
      stop.type = "button"; stop.textContent = "סיום הקבוצה הפעילה";
      stop.title = "כניסות חדשות לא יצורפו לאף קבוצה";
      stop.addEventListener("click", async () => {
        if (!confirm("לסיים את הקבוצה הפעילה? מי שכבר נכנסו יישארו ברשימה שלה; כניסות חדשות לא יצורפו לאף קבוצה.")) return;
        try { await data.setActiveGroup(null); config.activeGroup = null; renderGroups(); }
        catch (err) { alert("הפעולה נכשלה: " + (err.message || err)); }
      });
      row.append(stop);
    }
    groupSec.append(row);
  }

  async function renderTracking() {
    const sel = selected;
    const people = users.filter((u) => u.role !== "admin").filter((u) => {
      const g = Array.isArray(u.groups) ? u.groups : [];
      return sel === ALL ? true : sel === NONE ? g.length === 0 : g.includes(sel);
    }).sort((a, b) => (b.lastSeen || b.createdAt || 0) - (a.lastSeen || a.createdAt || 0));

    trackSec.innerHTML = `<h2>מעקב · ${people.length} נכנסו</h2>`;
    if (!people.length) { trackSec.innerHTML += `<p class="muted">עדיין אין כניסות לקבוצה הזו.</p>`; return; }
    trackSec.innerHTML += `<p class="muted">טוען סימונים…</p>`;

    let denied = false;
    const progress = await Promise.all(people.map((u) => data.getProgress(u.uid).catch(() => { denied = true; return null; })));
    if (sel !== selected) return; // בינתיים נבחרה קבוצה אחרת

    trackSec.innerHTML = `<h2>מעקב · ${people.length} נכנסו</h2>
      <p class="muted track-legend">✓ = כל הבדיקה העצמית ביחידה סומנה · מספר = כמה פריטים סומנו · ריחוף או לחיצה על משבצת מציגים מה סומן.</p>`;
    if (denied) trackSec.innerHTML += `<p class="track-warn">אין הרשאה לקרוא את הסימונים. צריך לפרסם את כללי האבטחה המעודכנים (firestore.rules) בקונסולת Firebase.</p>`;

    const scroller = document.createElement("div");
    scroller.className = "track-scroll";
    const table = document.createElement("table");
    table.className = "track";
    const head = document.createElement("tr");
    head.innerHTML = `<th class="t-name" scope="col">שם</th><th scope="col">כניסה אחרונה</th><th scope="col">הושלמו</th>`;
    checkCatalog.forEach((c) => {
      const th = document.createElement("th");
      th.className = "t-unit"; th.scope = "col";
      th.textContent = c.number; th.title = `יחידה ${c.number}: ${c.title}`;
      applyMeetingAccent(th, c.meetingIndex);
      head.append(th);
    });
    const thead = document.createElement("thead"); thead.append(head); table.append(thead);

    const tbody = document.createElement("tbody");
    people.forEach((u, i) => {
      const checks = progress[i]?.checks || {};
      const st = checkCatalog.map((c) => unitCheckStatus(c, checks));
      const tr = document.createElement("tr");
      tr.innerHTML = `<th class="t-name" scope="row"><strong>${esc(u.name)}</strong><small>${esc(u.email)}</small></th>
        <td class="t-seen">${when(u.lastSeen || u.createdAt)}</td>
        <td class="t-sum">${progress[i] ? `${st.filter((s) => s.done).length}/${checkCatalog.length}` : "—"}</td>`;
      st.forEach((s, k) => {
        const td = document.createElement("td");
        const c = checkCatalog[k];
        td.className = "t-cell " + (s.done ? "done" : s.checked.length ? "part" : "none");
        td.textContent = s.done ? "✓" : s.checked.length ? String(s.checked.length) : "";
        td.title = `יחידה ${c.number}: ${c.title}` + (s.checked.length ? "\n" + s.checked.map((t) => "✓ " + t).join("\n") : "\nלא סומן");
        applyMeetingAccent(td, c.meetingIndex);
        td.addEventListener("click", () => alert(`${u.name}\n${td.title}`)); // במובייל אין ריחוף
        tr.append(td);
      });
      tbody.append(tr);
    });
    table.append(tbody);
    scroller.append(table);
    trackSec.append(scroller);
  }

  renderGroups();
  renderTracking();

  // --- פתיחה/סגירה של כל היחידות בבת אחת ---
  const allIds = meetings.flatMap((m) => m.units.map((u) => u.id));
  const bulk = document.createElement("div");
  bulk.className = "admin-bulk";
  [[true, "פתיחת כל היחידות"], [false, "סגירת כל היחידות"]].forEach(([open, label]) => {
    const btn = document.createElement("button");
    btn.type = "button"; btn.textContent = label;
    btn.addEventListener("click", async () => {
      if (!confirm(`${open ? "לפתוח" : "לסגור"} את כל ${allIds.length} היחידות למשתתפים?`)) return;
      btn.disabled = true;
      try {
        await data.setAllUnitsOpen(allIds, open);
        allIds.forEach((id) => { config.openUnits[id] = open; });
        wrap.querySelectorAll(".switch").forEach((t) => { t.classList.toggle("on", open); t.setAttribute("aria-checked", String(open)); });
      } catch (err) { alert("הפעולה נכשלה: " + (err.message || err)); }
      finally { btn.disabled = false; }
    });
    bulk.append(btn);
  });
  wrap.append(bulk);

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
