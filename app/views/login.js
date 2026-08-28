// מסך פתיחה + כניסה. מסגור פדגוגי: מתחילים משאלה על ההוראה, לא מטכנולוגיה.
import { auth } from "../api.js";
import { BACKEND } from "../config.js";
import { navigate } from "../router.js";

export function loginView() {
  const wrap = document.createElement("main");
  wrap.className = "login";

  wrap.innerHTML = `
    <div class="login-hero">
      <span class="eyebrow">סדנת סגל · Vibe Coding בהוראה</span>
      <h1>מהצורך לכלי</h1>
      <p class="login-invite">חשבי על דבר אחד שהסטודנטים שלך מפספסים שוב ושוב.<br>משם נתחיל.</p>
    </div>
    <form class="login-card" novalidate>
      <h2>כניסה לסדנה</h2>
      <label>השם שלך
        <input name="name" type="text" autocomplete="name" placeholder="שם פרטי" required />
      </label>
      <label>אימייל
        <input name="email" type="email" autocomplete="email" placeholder="you@example.com" required />
      </label>
      <button class="primary" type="submit">כניסה</button>
      <p class="login-note"></p>
    </form>`;

  const form = wrap.querySelector("form");
  const note = wrap.querySelector(".login-note");
  note.textContent = BACKEND === "firebase"
    ? "יישלח לך קישור כניסה למייל — בלי סיסמה לזכור."
    : "מצב הדגמה: הכניסה מיידית (ב-Firebase יישלח קישור למייל).";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    if (!name || !email) { note.textContent = "נא למלא שם ואימייל."; note.classList.add("err"); return; }
    const btn = form.querySelector("button");
    btn.disabled = true; btn.textContent = "רגע…";
    try {
      const res = await auth.requestLink(email, name);
      if (res?.immediate) navigate("/workshop");
      else { note.classList.remove("err"); note.textContent = "שלחנו לך קישור כניסה למייל. פתחי אותו כדי להיכנס."; btn.textContent = "נשלח ✓"; }
    } catch (err) {
      note.classList.add("err"); note.textContent = err.message || "משהו השתבש. נסי שוב.";
      btn.disabled = false; btn.textContent = "כניסה";
    }
  });

  return wrap;
}
