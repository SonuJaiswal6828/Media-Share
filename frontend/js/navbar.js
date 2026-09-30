function renderNavbar() {
  const container = document.getElementById("navbar");
  if (!container) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const isFriendPage =
    currentPage === "session-photos.html" ||
    currentPage === "request-access.html" ||
    currentPage === "request-status.html";

  const loggedIn = isLoggedIn() && !isFriendPage;

  const baseLink =
    "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/[0.06]";

  const activeLink =
    "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white bg-white/[0.08] border border-white/10";

  function navLink(href, label) {
    const isActive = href === currentPage;
    return `<a href="${href}" class="${isActive ? activeLink : baseLink}">${label}</a>`;
  }

  const signupBtn = `
    <a href="signup.html"
       class="ml-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-white
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-500 hover:to-indigo-500
              shadow-lg shadow-purple-900/40
              hover:shadow-purple-900/60
              hover:scale-[1.02] active:scale-[0.98]">
      Get Started
    </a>
  `;

  const logoutBtn = `
    <button onclick="logout()"
      class="ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
             text-gray-300 bg-white/[0.04] border border-white/10
             hover:bg-white/[0.08] hover:text-white hover:border-white/20">
      Logout
    </button>
  `;

  const publicLinks = `
    ${navLink("index.html", "Home")}
    ${navLink("about.html", "About")}
    ${navLink("request-access.html", "Request Access")}
    ${navLink("request-status.html", "Check Status")}
    ${navLink("login.html", "Login")}
    ${signupBtn}
  `;

  const authLinks = `
    ${navLink("index.html", "Home")}
    ${navLink("dashboard.html", "Dashboard")}
    ${navLink("groups.html", "Groups")}
    ${navLink("pending.html", "Requests")}
    ${navLink("sessions.html", "Sessions")}
    ${logoutBtn}
  `;

  container.innerHTML = `
    <div class="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
      <nav class="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex justify-between items-center gap-4">
        <a href="index.html" class="flex items-center gap-2.5 group">
          <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-base shadow-lg shadow-purple-900/40 group-hover:scale-105 transition">
            📁
          </span>
          <span class="text-lg font-semibold text-white tracking-tight">
            Media<span class="text-gray-400">Share</span>
          </span>
        </a>
        <div class="flex items-center gap-1 text-sm">
          ${loggedIn ? authLinks : publicLinks}
        </div>
      </nav>
    </div>
  `;
}