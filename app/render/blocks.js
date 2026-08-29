// Renderer גנרי לבלוקי תוכן. כל kind → פונקציה שמחזירה אלמנט DOM.
// ctx: { getAnswer, saveAnswer, getCheck, saveCheck } - לשמירת התקדמות המשתתפת.

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const copyable = (text) => {
  const box = el("div", "codebox");
  const btn = el("button", "copy-btn", "העתקה");
  btn.type = "button";
  const pre = el("pre");
  pre.dir = "auto"; // עברית → RTL, קוד באנגלית → LTR
  pre.textContent = text;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "הועתק!";
      setTimeout(() => (btn.textContent = "העתקה"), 1600);
    } catch { btn.textContent = "בחרו והעתיקו ידנית"; }
  });
  box.append(btn, pre);
  return box;
};

const renderers = {
  text: (b) => el("div", "b-text", b.html),

  task: (b) => {
    const n = el("div", "b-task");
    if (b.label) n.append(el("span", "b-label", b.label));
    n.append(el("p", null, b.html));
    return n;
  },

  reflection: (b, ctx) => {
    const n = el("div", "b-reflection");
    if (b.label) n.append(el("span", "b-label", b.label));
    n.append(el("p", "b-prompt", b.prompt));
    const ta = el("textarea", "b-answer");
    ta.placeholder = b.placeholder || "";
    ta.value = ctx.getAnswer(b.id) || "";
    let t;
    ta.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => ctx.saveAnswer(b.id, ta.value), 350);
    });
    n.append(ta);
    if (b.hint) n.append(el("span", "b-hint", b.hint));
    return n;
  },

  prompt: (b) => {
    const n = el("div", "b-prompt-box");
    n.append(el("span", "b-label", b.label || "פְּרוֹמְפְּט ל־AI"));
    n.append(copyable(b.code));
    if (b.note) n.append(el("p", "b-note", b.note));
    return n;
  },

  code: (b) => {
    const n = el("div", "b-code");
    n.append(copyable(b.code));
    return n;
  },

  steps: (b) => {
    const ol = el("ol", "b-steps");
    if (b.start) ol.style.counterReset = "step " + (b.start - 1); // המשך מספור רציף
    b.items.forEach((it) => { const li = el("li"); li.innerHTML = it; ol.append(li); });
    return ol;
  },

  image: (b) => {
    const fig = el("figure", "b-image");
    const img = el("img");
    img.src = b.src; img.alt = b.alt || ""; img.loading = "lazy";
    fig.append(img);
    if (b.caption) fig.append(el("figcaption", null, b.caption));
    return fig;
  },

  link: (b) => {
    const a = el("a", "b-link", (b.label || b.href) + " ↗");
    a.href = b.href; a.target = "_blank"; a.rel = "noopener";
    return a;
  },

  selfcheck: (b, ctx) => {
    const n = el("div", "b-selfcheck");
    n.append(el("span", "b-label", b.label || "בדקו את עצמכם"));
    const ul = el("ul");
    b.items.forEach((it, i) => {
      const key = `${b.id || "check"}-${i}`;
      const li = el("li");
      const id = "chk-" + Math.random().toString(36).slice(2, 8);
      const cb = el("input");
      cb.type = "checkbox"; cb.id = id; cb.checked = !!ctx.getCheck(key);
      cb.addEventListener("change", () => ctx.saveCheck(key, cb.checked));
      const lbl = el("label"); lbl.htmlFor = id; lbl.innerHTML = it;
      li.append(cb, lbl);
      ul.append(li);
    });
    n.append(ul);
    return n;
  },

  pause: (b) => {
    const n = el("div", "b-pause");
    n.append(el("strong", null, b.title || "נקודת עצירה"));
    n.append(el("p", null, b.html));
    return n;
  },

  // טאבים - כל אחת בוחרת את שלה ורואה רק את התוכן שבו. remember=מפתח לשמירת הבחירה.
  tabs: (b, ctx) => {
    const wrap = el("div", "b-tabs");
    const bar = el("div", "tab-bar");
    bar.setAttribute("role", "tablist");
    const panels = el("div", "tab-panels");
    const key = b.remember ? "wk:tab:" + b.remember : null;
    const btns = [], pans = [];

    (b.tabs || []).forEach((t, i) => {
      const btn = el("button", "tab-btn", t.label);
      btn.type = "button"; btn.setAttribute("role", "tab");
      const pan = el("div", "tab-panel");
      (t.blocks || []).forEach((bl) => pan.append(renderBlock(bl, ctx)));
      btn.addEventListener("click", () => select(i));
      bar.append(btn); panels.append(pan);
      btns.push(btn); pans.push(pan);
    });

    function select(i) {
      btns.forEach((x, j) => { x.classList.toggle("active", j === i); x.setAttribute("aria-selected", j === i); });
      pans.forEach((x, j) => { x.hidden = j !== i; });
      if (key) { try { localStorage.setItem(key, String(i)); } catch {} }
    }

    let active = 0;
    if (key) { try { const s = localStorage.getItem(key); if (s != null) active = Math.min(Math.max(parseInt(s) || 0, 0), btns.length - 1); } catch {} }
    select(active);

    wrap.append(bar, panels);
    return wrap;
  },
};

export function renderBlock(block, ctx) {
  const fn = renderers[block.kind];
  if (!fn) return el("div", "b-text muted", `בלוק לא מוכר: ${block.kind}`);
  return fn(block, ctx);
}
