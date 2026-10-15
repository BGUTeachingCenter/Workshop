// מילון מושגים נפתח (מגירה). מתמלא בהדרגה לפי מיקום היחידה הנוכחית ברצף.
// מושגים חדשים (שמופיעים ביחידה הנוכחית) מוצגים ראשונים ומסומנים "חדש".
import { glossaryUpTo } from "../../content/glossary.js";

export function renderGlossary(unitId) {
  const wrap = document.createElement("div");
  wrap.className = "glossary";

  const terms = glossaryUpTo(unitId);
  if (!terms.length) return wrap;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "gloss-toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = `<span aria-hidden="true">📖</span> מילון מושגים <span class="gloss-count">${terms.length}</span>`;

  const overlay = document.createElement("div");
  overlay.className = "gloss-overlay";
  overlay.hidden = true;

  const drawer = document.createElement("aside");
  drawer.className = "gloss-drawer";
  drawer.hidden = true;
  drawer.setAttribute("role", "dialog");
  drawer.setAttribute("aria-label", "מילון מושגים");

  // מושגים חדשים קודם, ואז השאר לפי סדר תוכנית הלימוד.
  const ordered = [...terms.filter((t) => t.isNew), ...terms.filter((t) => !t.isNew)];
  const items = ordered.map((t) => `
    <div class="gloss-item${t.isNew ? " is-new" : ""}">
      <span class="gt">${t.term}${t.isNew ? `<span class="gloss-badge">חדש</span>` : ""}</span>
      <span class="gd">${t.def}</span>
    </div>`).join("");

  drawer.innerHTML = `
    <div class="gloss-head">
      <strong>מילון מושגים</strong>
      <button type="button" class="gloss-close" aria-label="סגירה">×</button>
    </div>
    <div class="gloss-list">${items}</div>`;

  const onKey = (e) => { if (e.key === "Escape") close(); };
  const open = () => {
    overlay.hidden = false; drawer.hidden = false;
    requestAnimationFrame(() => { overlay.classList.add("show"); drawer.classList.add("open"); });
    toggle.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", onKey);
  };
  const close = () => {
    overlay.classList.remove("show"); drawer.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onKey);
    setTimeout(() => { overlay.hidden = true; drawer.hidden = true; }, 220);
  };

  toggle.addEventListener("click", open);
  overlay.addEventListener("click", close);
  drawer.querySelector(".gloss-close").addEventListener("click", close);

  wrap.append(toggle, overlay, drawer);
  return wrap;
}
