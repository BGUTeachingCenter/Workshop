const units = [
  {
    body: `<div class="reflection">
      <small>שאלה למחשבה</small>
      <p>מה הסטודנטים שלך מפספסים שוב ושוב?</p>
      <textarea class="answer" data-answer="need" placeholder="למשל: הסטודנטים מכירים את הנוסחה, אבל מתקשים לראות מתי נכון להשתמש בה..."></textarea>
      <span class="hint">מספיק משפט אחד. אין צורך לפתור את הבעיה עדיין.</span>
    </div>`,
  },
  {
    body: `<div class="reflection">
      <small>המשימה שלך</small>
      <p>השלימו: הייתי רוצה שהסטודנטים שלי יוכלו...</p>
      <textarea class="answer" data-answer="goal" placeholder="לזהות, להשוות, לבחור, לתרגל, לראות קשר..."></textarea>
      <span class="hint">בחרו פעולה אחת ממוקדת שאפשר לתרגל או להמחיש.</span>
    </div>`,
  },
  {
    body: `<div class="prompt-box">
      <button class="copy-button" data-copy>העתקה</button>
      <pre>אני מרצה בתחום [התחום שלי].
הסטודנטים שלי מתקשים ב־[הקושי שזיהיתי].
אני רוצה כלי קטן שיעזור להם [המטרה שניסחתי].
הצע רעיון פשוט שאפשר לממש בעמוד HTML אחד.</pre>
    </div>
    <p class="hint">העתיקו את התבנית, השלימו את הפרטים שלכם ושלחו אותה ל־AI.</p>`,
  },
  {
    body: `<div class="pause-box">
      <strong>נקודת עצירה</strong>
      <p>השאירו את החלון פתוח וחזרו לקבוצה.<br>השלב הבא ייפתח בהנחיית המנחה.</p>
    </div>`,
  },
];

let current = Number(localStorage.getItem("workshop-unit") || 0);
if (current > 3) current = 0;

const content = document.querySelector("#unit-content");
const number = document.querySelector("#unit-number");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");

function render() {
  number.textContent = current + 1;
  content.innerHTML = units[current].body;
  previousButton.disabled = current === 0;
  nextButton.disabled = current === 3;
  nextButton.innerHTML = current === 2
    ? 'הגעתי לנקודת העצירה <span aria-hidden="true">←</span>'
    : current === 3
      ? "ממתינים להמשך"
      : 'סיימתי, לשלב הבא <span aria-hidden="true">←</span>';

  document.querySelectorAll(".journey-list li").forEach((item, index) => {
    item.classList.toggle("active", index === current);
  });

  document.querySelectorAll(".answer").forEach((answer) => {
    answer.value = localStorage.getItem(`answer-${answer.dataset.answer}`) || "";
    answer.addEventListener("input", () => {
      localStorage.setItem(`answer-${answer.dataset.answer}`, answer.value);
    });
  });

  const copyButton = document.querySelector("[data-copy]");
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(copyButton.nextElementSibling.textContent);
      copyButton.textContent = "הועתק!";
      setTimeout(() => { copyButton.textContent = "העתקה"; }, 1600);
    });
  }

  localStorage.setItem("workshop-unit", current);
}

previousButton.addEventListener("click", () => {
  if (current > 0) {
    current -= 1;
    render();
    document.querySelector(".unit-card").scrollIntoView({ behavior: "smooth" });
  }
});

nextButton.addEventListener("click", () => {
  if (current < 3) {
    current += 1;
    render();
    document.querySelector(".unit-card").scrollIntoView({ behavior: "smooth" });
  }
});

document.querySelectorAll("[data-unit]").forEach((button) => {
  button.addEventListener("click", () => {
    current = Number(button.dataset.unit);
    render();
  });
});

document.querySelector("[data-start]").addEventListener("click", () => {
  document.querySelector(".workspace").scrollIntoView({ behavior: "smooth" });
});

render();
