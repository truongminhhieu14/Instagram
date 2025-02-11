const TOKEN = "TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const USER = "USER";

export function setToken(value: string) {
  if (typeof window === "undefined") return "";
  localStorage.setItem(TOKEN, JSON.stringify(value));
}

export function getToken() {
  if (typeof window === "undefined") return "";
  const token: string = localStorage.getItem(TOKEN) || "";
  if (!token || token === "undefined") return "";
  return JSON.parse(token);
}

export function removeToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN);
}

export function setRefreshToken(value: any) {
  if (typeof window === "undefined") return "";
  localStorage.setItem(REFRESH_TOKEN, JSON.stringify(value));
}

export function getRefreshToken() {
  if (typeof window === "undefined") return "";
  const token: string = localStorage.getItem(REFRESH_TOKEN) || "";
  if (!token || token === "undefined") return "";
  return JSON.parse(token);
}

export function removeRefreshToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(REFRESH_TOKEN);
}

export function removeAllStorage() {
  if (typeof window === "undefined") return;
  localStorage.clear();
}

export function setUser(value: {
  user_id: string;
  username: string;
  email: string;
  avatar: string;
}) {
  if (typeof window === "undefined") return "";
  localStorage.setItem(USER, JSON.stringify(value));
}

export function getUser() {
  if (typeof window === "undefined") return "";
  const token = localStorage.getItem(USER) || "";
  if (!token || token === "undefined") return "";
  return JSON.parse(token);
}

export function removeUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER);
}
