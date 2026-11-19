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
  const [users, config, groups, admins] = await Promise.all([data.listUsers(), data.getConfig(),
    data.listGroups().catch(() => { rulesOld = true; return []; }),
    data.listAdmins().catch(() => null)]);
  const wrap = document.createElement("main");
  wrap.className = "admin";

  wrap.innerHTML = `<div class="wk-head"><span class="eyebrow">לוח מנחה</span><h1>ניהול הסדנה</h1>
    <p class="wk-sub">קבוצות, מעקב אחרי המשתתפים, צוות ההנחיה, ופתיחה וסגירה של יחידות. הכול נשמר מיד.</p></div>`;

  // --- קבוצות + מעקב ---
  const groupSec = document.createElement("section");
  groupSec.className = "admin-block";
  const trackSec = document.createElement("section");
  trackSec.className = "admin-block";
  const staffSec = document.createElement("section");
  staffSec.className = "admin-block";
  wrap.append(groupSec, trackSec, staffSec);

  // --- צוות ההנחיה ---
  const nameOf = (email) => users.find((u) => (u.email || "").toLowerCase() === email)?.name || "";
  async function makeAdmins(list) { // list: [{email, name}]
    const who = list.map((x) => x.name || x.email).join(", ");
    if (!confirm(`לתת הרשאת מנחה ל: ${who}?\nהכניסה כמנחה היא רק בכפתור "כניסת מנחה עם Google", עם חשבון Google של אותו אימייל.`)) return false;
    try {
      for (const x of list) {
        await data.addAdmin(x.email, x.name);
        const e = x.email.trim().toLowerCase();
        if (!admins.some((a) => a.email === e)) admins.push({ email: e, name: x.name || "" });
      }
      renderStaff();
      return true;
    } catch (err) { alert("הפעולה נכשלה: " + (err.message || err)); return false; }
  }

  function renderStaff() {
    staffSec.innerHTML = `<h2>צוות ההנחיה</h2>`;
    if (!admins) {
      staffSec.innerHTML += `<p class="track-warn">כדי לנהל את צוות ההנחיה צריך לפרסם את כללי האבטחה המעודכנים (firestore.rules) בקונסולת Firebase.</p>`;
      return;
    }
    staffSec.innerHTML += `<p class="muted track-legend">הרשאת מנחה: שקפים, לוח הניהול וכל היחידות. הכניסה כמנחה היא רק בכפתור "כניסת מנחה עם Google".</p>`;
    const ul = document.createElement("ul");
    ul.className = "user-list";
    admins.forEach((a) => {
      const li = document.createElement("li");
      const name = a.name || nameOf(a.email);
      li.innerHTML = `<span class="avatar" aria-hidden="true">${esc((name || a.email).charAt(0))}</span>
        <span class="u-main"><strong>${esc(name || a.email)}</strong><small>${esc(a.email)}</small></span>`;
      if (a.root) li.insertAdjacentHTML("beforeend", `<span class="u-role admin">בעלים</span>`);
      else {
        const rm = document.createElement("button");
        rm.type = "button"; rm.className = "text-btn"; rm.textContent = "הסרה";
        rm.addEventListener("click", async () => {
          if (!confirm(`להסיר את הרשאת המנחה של ${name || a.email}?`)) return;
          try { await data.removeAdmin(a.email); admins.splice(admins.indexOf(a), 1); renderStaff(); }
          catch (err) { alert("הפעולה נכשלה: " + (err.message || err)); }
        });
        li.append(rm);
      }
      ul.append(li);
    });
    staffSec.append(ul);

    const form = document.createElement("form");
    form.className = "admin-bulk staff-add";
    form.innerHTML = `<input type="email" name="email" placeholder="אימייל של מנחה נוסף" aria-label="אימייל של מנחה נוסף" required>
      <button type="submit">הוספת מנחה</button>`;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (await makeAdmins([{ email, name: nameOf(email.toLowerCase()) }])) form.reset();
    });
    staffSec.append(form);
  }

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

    // --- העברת משתתפים מסומנים לקבוצה ---
    const chosen = new Set();
    const bar = document.createElement("div");
    bar.className = "admin-bulk move-bar";
    const moveLbl = document.createElement("span");
    const target = document.createElement("select");
    target.className = "group-pick";
    target.setAttribute("aria-label", "קבוצת היעד");
    [...groups.map((g) => [g.id, g.name]), ["__new", "קבוצה חדשה…"]].forEach(([v, label]) => {
      const o = document.createElement("option"); o.value = v; o.textContent = label; target.append(o);
    });
    const moveBtn = document.createElement("button");
    moveBtn.type = "button"; moveBtn.textContent = "העברה";
    const adminBtn = document.createElement("button");
    adminBtn.type = "button"; adminBtn.textContent = "הפיכה למנחה";
    adminBtn.addEventListener("click", async () => {
      const list = users.filter((u) => chosen.has(u.uid)).map((u) => ({ email: u.email, name: u.name }));
      adminBtn.disabled = true;
      await makeAdmins(list);
      adminBtn.disabled = false;
    });
    const syncBar = () => {
      moveLbl.textContent = chosen.size ? `סומנו ${chosen.size} · העברה לקבוצה:` : "סימון שורות כדי להעביר אותן לקבוצה אחרת או לתת הרשאת מנחה";
      target.hidden = moveBtn.hidden = !chosen.size;
      adminBtn.hidden = !chosen.size || !admins;
    };
    moveBtn.addEventListener("click", async () => {
      let gid = target.value, gname = target.selectedOptions[0]?.textContent;
      if (gid === "__new") {
        gname = (prompt("שם לקבוצה החדשה (היא לא תהפוך לפעילה)") || "").trim();
        if (!gname) return;
      }
      if (!confirm(`להעביר ${chosen.size} לקבוצה "${gname}"?\nההעברה מבטלת את השיוך לכל קבוצה אחרת.`)) return;
      moveBtn.disabled = true;
      try {
        if (gid === "__new") {
          gid = await data.createGroup(gname, { activate: false });
          groups.unshift({ id: gid, name: gname, createdAt: Date.now() });
        }
        const uids = [...chosen];
        await data.moveUsersToGroup(uids, gid);
        users.forEach((u) => { if (chosen.has(u.uid)) u.groups = [gid]; });
        selected = gid;
        renderGroups(); renderTracking();
      } catch (err) { alert("ההעברה נכשלה: " + (err.message || err)); moveBtn.disabled = false; }
    });
    bar.append(moveLbl, target, moveBtn, adminBtn);
    syncBar();
    trackSec.append(bar);

    const scroller = document.createElement("div");
    scroller.className = "track-scroll";
    const table = document.createElement("table");
    table.className = "track";
    const head = document.createElement("tr");
    head.innerHTML = `<th class="t-pick" scope="col"><input type="checkbox" aria-label="סימון כל השורות"></th><th class="t-name" scope="col">שם</th><th scope="col">כניסה אחרונה</th><th scope="col">הושלמו</th>`;
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
      tr.innerHTML = `<td class="t-pick"><input type="checkbox" aria-label="סימון ${esc(u.name)}"></td><th class="t-name" scope="row"><strong>${esc(u.name)}</strong><small>${esc(u.email)}</small></th>
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
      const box = tr.querySelector(".t-pick input");
      box.addEventListener("change", () => { box.checked ? chosen.add(u.uid) : chosen.delete(u.uid); syncBar(); });
      tbody.append(tr);
    });
    table.append(tbody);
    const all = head.querySelector(".t-pick input");
    all.addEventListener("change", () => {
      tbody.querySelectorAll(".t-pick input").forEach((b, i) => { b.checked = all.checked; all.checked ? chosen.add(people[i].uid) : chosen.delete(people[i].uid); });
      syncBar();
    });
    scroller.append(table);
    trackSec.append(scroller);
  }

  renderGroups();
  renderTracking();
  renderStaff();

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
