// נקודת הכניסה: מאתחל auth, מאזין לשינויי מסלול ומצב התחברות, ומרנדר את התצוגה הנכונה.
import { auth } from "./api.js";
import { currentRoute, onRoute, navigate } from "./router.js";
import { appBar, mount } from "./views/layout.js";
import { loginView } from "./views/login.js";
import { workshopView } from "./views/workshop.js";
import { unitView } from "./views/unit.js";
import { adminView } from "./views/admin.js";

async function render() {
  const route = currentRoute();
  const user = auth.current();

  // לא מחובר → תמיד מסך כניסה
  if (!user) { mount(loginView()); return; }

  // מחובר אך במסלול הבית → למסע
  if (route.name === "home") { navigate("/workshop"); return; }

  // הרשאת אדמין
  if (route.name === "admin" && user.role !== "admin") { navigate("/workshop"); return; }

  const active = route.name === "admin" ? "admin" : "workshop";
  let content;
  try {
    if (route.name === "workshop") content = await workshopView();
    else if (route.name === "unit") content = await unitView(route.params.id);
    else if (route.name === "admin") content = await adminView();
    else content = await workshopView();
  } catch (err) {
    content = document.createElement("main");
    content.className = "workshop";
    content.innerHTML = `<div class="notice">שגיאה בטעינת התצוגה: ${err.message}</div>`;
  }
  mount(appBar(user, active), content);
}

async function boot() {
  await auth.init();
  await auth.completeLinkIfPresent(); // טיפול בקישור התחברות מהמייל (ב-Firebase)
  auth.onChange(() => render());      // כל שינוי התחברות מרנדר מחדש
  onRoute(() => render());            // כל שינוי מסלול מרנדר מחדש
}

boot();
