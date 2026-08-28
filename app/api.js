// נקודת גישה אחת ל-backend. שאר האפליקציה מייבאת מכאן בלבד —
// כך שהחלפת mock ⟷ firebase נעשית במקום אחד (app/config.js).
import { BACKEND } from "./config.js";
import * as mock from "./backend/mock.js";
import * as firebase from "./backend/firebase.js";

const impl = BACKEND === "firebase" ? firebase : mock;

export const auth = impl.auth;
export const data = impl.data;
