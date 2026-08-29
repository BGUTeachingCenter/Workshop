// Router מינימלי מבוסס hash. אין תלות בשרת - עובד מקומית וב-Codespaces.
export function currentRoute() {
  const h = (location.hash || "#/").replace(/^#/, "");
  const parts = h.split("/").filter(Boolean); // "/unit/m1-u1" → ["unit","m1-u1"]
  if (parts.length === 0) return { name: "home", params: {} };
  if (parts[0] === "workshop") return { name: "workshop", params: {} };
  if (parts[0] === "unit") return { name: "unit", params: { id: parts[1] } };
  if (parts[0] === "admin") return { name: "admin", params: {} };
  return { name: "home", params: {} };
}

export function navigate(path) {
  if (("#" + path) === location.hash) window.dispatchEvent(new HashChangeEvent("hashchange"));
  else location.hash = path;
}

export function onRoute(cb) {
  window.addEventListener("hashchange", cb);
  cb();
}
