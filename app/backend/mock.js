// Backend מדומה מבוסס localStorage - מדמה את Firebase כדי שנוכל לפתח ולבדוק בלי פרויקט ענן.
// אותו ממשק בדיוק ימומש ב-backend/firebase.js בשלב 3.
import { defaultOpenUnits } from "../../content/index.js";

const K = {
  user: "wk:currentUser",
  users: "wk:users",
  config: "wk:config",
  groups: "wk:groups",
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
    }
    // כמו ב-Firebase: כניסה אחרונה + צירוף לקבוצה הפעילה.
    const active = read(K.config, {})?.activeGroup;
    user.lastSeen = Date.now();
    user.groups = user.groups || [];
    if (active && user.groups.length === 0) user.groups = [active];
    users[user.uid] = user;
    write(K.users, users);
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
  async setAllUnitsOpen(unitIds, open) {
    const cfg = await this.getConfig();
    unitIds.forEach((id) => { cfg.openUnits[id] = !!open; });
    write(K.config, cfg);
  },
  async listUsers() { return Object.values(read(K.users, {})); },
  async listGroups() { return Object.values(read(K.groups, {})).sort((a, b) => b.createdAt - a.createdAt); },
  async createGroup(name, { activate = true } = {}) {
    const groups = read(K.groups, {});
    const id = "g" + Date.now().toString(36);
    groups[id] = { id, name, createdAt: Date.now() };
    write(K.groups, groups);
    if (activate) await this.setActiveGroup(id);
    return id;
  },
  async moveUsersToGroup(uids, gid) {
    const users = read(K.users, {});
    uids.forEach((u) => { if (users[u]) users[u].groups = [gid]; });
    write(K.users, users);
  },
  async setActiveGroup(id) {
    const cfg = await this.getConfig();
    cfg.activeGroup = id || null;
    write(K.config, cfg);
  },

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
