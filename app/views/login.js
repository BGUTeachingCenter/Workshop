// מסך פתיחה + כניסה. מסגור פדגוגי: מתחילים משאלה על ההוראה, לא מטכנולוגיה.
import { auth } from "../api.js";
import { BACKEND } from "../config.js";
import { navigate } from "../router.js";

export function loginView() {
  const wrap = document.createElement("main");
  wrap.className = "login";

  const needsPassword = BACKEND === "firebase";
  const passwordField = needsPassword ? `
      <label>סיסמת הסדנה
        <input name="password" type="password" autocomplete="current-password" placeholder="הסיסמה שקיבלתם מהמנחה" required />
      </label>` : "";

  wrap.innerHTML = `
    <div class="login-hero">
      <span class="eyebrow">סדנת סגל · Vibe Coding בהוראה</span>
      <h1>מהצורך לכלי</h1>
      <p class="login-invite">חשבו על דבר אחד שהסטודנטים שלכם מפספסים שוב ושוב.<br>משם נתחיל.</p>
    </div>
    <form class="login-card" novalidate>
      <h2>כניסה לסדנה</h2>
      <label>השם שלך
        <input name="name" type="text" autocomplete="name" placeholder="שם פרטי" required />
      </label>
      <label>אימייל
        <input name="email" type="email" autocomplete="email" placeholder="you@example.com" required />
      </label>${passwordField}
      <button class="primary" type="submit">כניסה</button>
      <p class="login-note"></p>
    </form>`;

  const form = wrap.querySelector("form");
  const note = wrap.querySelector(".login-note");
  note.textContent = needsPassword
    ? "מכניסים שם, אימייל וסיסמת הסדנה שקיבלתם מהמנחה."
    : "מצב הדגמה: הכניסה מיידית (בלי סיסמה).";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = needsPassword ? form.password.value : undefined;
    if (!name || !email || (needsPassword && !password)) {
      note.textContent = needsPassword ? "נא למלא שם, אימייל וסיסמה." : "נא למלא שם ואימייל.";
      note.classList.add("err"); return;
    }
    const btn = form.querySelector("button");
    btn.disabled = true; btn.textContent = "רגע…";
    try {
      const res = await auth.requestLink(email, name, password);
      if (res?.immediate) navigate("/workshop");
      else { note.classList.remove("err"); note.textContent = "שלחנו לך קישור כניסה למייל. פתחו אותו כדי להיכנס."; btn.textContent = "נשלח ✓"; }
    } catch (err) {
      note.classList.add("err"); note.textContent = err.message || "משהו השתבש. נסו שוב.";
      btn.disabled = false; btn.textContent = "כניסה";
    }
  });

  return wrap;
}
