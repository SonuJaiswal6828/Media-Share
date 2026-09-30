// ===========================
// API Base URL
// ===========================
const API_BASE = "https://photo-sharing-access-system.onrender.com";

// ===========================
// Token helpers
// ===========================
function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function clearToken() {
  localStorage.removeItem("token");
}

function isLoggedIn() {
  return !!getToken();
}

// ===========================
// Core fetch wrapper
// ===========================
async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    const message = data?.detail
      ? typeof data.detail === "string"
        ? data.detail
        : JSON.stringify(data.detail)
      : `Error ${res.status}`;
    throw new Error(message);
  }

  return data;
}

// ===========================
// Shorthand methods
// ===========================
const api = {
  get: (path) => apiFetch(path),
  post: (path, body) =>
    apiFetch(path, { method: "POST", body: JSON.stringify(body) }),
  patch: (path, body) =>
    apiFetch(path, { method: "PATCH", body: JSON.stringify(body || {}) }),
  delete: (path) => apiFetch(path, { method: "DELETE" }),
};

// ===========================
// Toast helper
// ===========================
function showToast(message, type = "info") {
  const colors = {
    info: "bg-blue-500",
    success: "bg-green-500",
    error: "bg-red-500",
  };
  const div = document.createElement("div");
  div.className = `fixed top-4 right-4 ${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg z-[9999] transition-opacity duration-300`;
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => {
    div.style.opacity = "0";
    setTimeout(() => div.remove(), 300);
  }, 3000);
}

// ===========================
// Require login
// ===========================
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

// ===========================
// Logout
// ===========================
function logout() {
  clearToken();
  window.location.href = "login.html";
}

function showToast(message, type = "info") {
  const colors = {
    info: "bg-blue-500/90 border-blue-400/30",
    success: "bg-green-500/90 border-green-400/30",
    error: "bg-red-500/90 border-red-400/30",
  };
  const div = document.createElement("div");
  div.className = `toast-anim fixed top-4 right-4 ${colors[type]} backdrop-blur border text-white px-4 py-3 rounded-xl shadow-2xl shadow-black/50 z-[9999] text-sm font-medium`;
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => {
    div.style.transition = "opacity 0.3s, transform 0.3s";
    div.style.opacity = "0";
    div.style.transform = "translateX(20px)";
    setTimeout(() => div.remove(), 300);
  }, 3000);
}