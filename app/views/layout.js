// מעטפת קבועה: סרגל עליון עם זהות הסדנה, מצב המשתמש, וניווט.
import { auth } from "../api.js";
import { navigate } from "../router.js";

export function appBar(user, active) {
  const bar = document.createElement("header");
  bar.className = "appbar";

  const brand = document.createElement("button");
  brand.className = "brand";
  brand.type = "button";
  brand.innerHTML = `<span class="brand-mark" aria-hidden="true"></span><span>מהצורך לכלי</span>`;
  brand.addEventListener("click", () => navigate("/workshop"));

  const nav = document.createElement("nav");
  nav.className = "appnav";
  if (user?.role === "admin") {
    const a = document.createElement("button");
    a.type = "button";
    a.className = "navlink" + (active === "admin" ? " current" : "");
    a.textContent = "ניהול";
    a.addEventListener("click", () => navigate("/admin"));
    nav.append(a);
  }

  const userChip = document.createElement("div");
  userChip.className = "userchip";
  const initial = (user?.name || "?").trim().charAt(0);
  userChip.innerHTML = `<span class="avatar" aria-hidden="true">${initial}</span><span class="uname">${user?.name || ""}</span>`;
  const out = document.createElement("button");
  out.type = "button";
  out.className = "logout";
  out.textContent = "יציאה";
  out.addEventListener("click", async () => { await auth.signOut(); navigate("/"); });
  userChip.append(out);

  bar.append(brand, nav, userChip);
  return bar;
}

export function mount(...nodes) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  nodes.forEach((n) => n && app.append(n));
}
