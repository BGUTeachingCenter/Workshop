// קונטיינר שקפים (מצגת) לראש היחידה. מכיל שקף אחד או יותר, עם ניווט ביניהם.
// כל שקף: { title, body }  (body = HTML — פסקאות, רשימות, הדגשות).
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

export function renderSlides(slides) {
  const wrap = el("section", "slides");
  wrap.setAttribute("aria-roledescription", "מצגת");
  const stage = el("div", "slide-stage");
  wrap.append(stage);

  let cur = 0;
  const multi = slides.length > 1;

  const draw = () => {
    const s = slides[cur];
    stage.innerHTML = `<div class="slide-inner">${s.title ? `<h2>${s.title}</h2>` : ""}<div class="slide-body">${s.body || ""}</div></div>`;
  };

  if (multi) {
    const footer = el("div", "slide-footer");
    const prev = el("button", "slide-nav", "הקודם"); prev.type = "button";
    const next = el("button", "slide-nav", "הבא"); next.type = "button";
    const dots = el("div", "slide-dots");
    const counter = el("span", "slide-counter");
    const dotEls = slides.map((_, i) => {
      const d = el("button", "slide-dot"); d.type = "button";
      d.setAttribute("aria-label", `שקף ${i + 1}`);
      d.addEventListener("click", () => go(i));
      dots.append(d);
      return d;
    });

    const sync = () => {
      counter.textContent = `${cur + 1} / ${slides.length}`;
      dotEls.forEach((d, i) => d.classList.toggle("active", i === cur));
      prev.disabled = cur === 0;
      next.disabled = cur === slides.length - 1;
    };
    function go(i) { cur = Math.min(Math.max(i, 0), slides.length - 1); draw(); sync(); }
    prev.addEventListener("click", () => go(cur - 1));
    next.addEventListener("click", () => go(cur + 1));

    footer.append(prev, dots, counter, next);
    wrap.append(footer);
    draw(); sync();
  } else {
    draw();
  }

  return wrap;
}
