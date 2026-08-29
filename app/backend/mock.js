// Backend מדומה מבוסס localStorage - מדמה את Firebase כדי שנוכל לפתח ולבדוק בלי פרויקט ענן.
// אותו ממשק בדיוק ימומש ב-backend/firebase.js בשלב 3.
import { defaultOpenUnits } from "../../content/index.js";

const K = {
  user: "wk:currentUser",
  users: "wk:users",
  config: "wk:config",
  progress: (uid) => `wk:progress:${uid}`,
};

const read = (k, fallback) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const uid = () => "u_" + Math.random().toString(36).slice(2, 10);

let listeners = [];
const notify = (u) => listeners.forEach((cb) => cb(u));

export const auth = {
  async init() { /* אין מה לאתחל במצב מדומה */ },
  async completeLinkIfPresent() { return false; },
  current() { return read(K.user, null); },
  onChange(cb) { listeners.push(cb); cb(this.current()); return () => { listeners = listeners.filter((x) => x !== cb); }; },

  // במצב מדומה אין מייל אמיתי - נכנסים מיד. ב-Firebase כאן יישלח קישור התחברות.
  async requestLink(email, name) {
    const users = read(K.users, {});
    let user = Object.values(users).find((u) => u.email === email);
    if (!user) {
      // אדמין ראשון: מי שנרשם עם מייל שמסתיים ב-+admin נכנס כמנהל (נוחות לפיתוח בלבד).
      const role = email.includes("+admin") ? "admin" : "participant";
      user = { uid: uid(), email, name: name || email.split("@")[0], role, createdAt: Date.now() };
      users[user.uid] = user;
      write(K.users, users);
    }
    write(K.user, user);
    notify(user);
    return { immediate: true };
  },

  async signOut() { localStorage.removeItem(K.user); notify(null); },
};

export const data = {
  async getConfig() {
    let cfg = read(K.config, null);
    if (!cfg) { cfg = { openUnits: defaultOpenUnits() }; write(K.config, cfg); }
    return cfg;
  },
  async setUnitOpen(unitId, open) {
    const cfg = await this.getConfig();
    cfg.openUnits[unitId] = !!open;
    write(K.config, cfg);
    return cfg;
  },
  async listUsers() { return Object.values(read(K.users, {})); },

  async getProgress(uid) { return read(K.progress(uid), { answers: {}, checks: {} }); },
  async saveAnswer(uid, key, value) {
    const p = read(K.progress(uid), { answers: {}, checks: {} });
    p.answers[key] = value; write(K.progress(uid), p);
  },
  async saveCheck(uid, key, value) {
    const p = read(K.progress(uid), { answers: {}, checks: {} });
    p.checks[key] = !!value; write(K.progress(uid), p);
  },
};
