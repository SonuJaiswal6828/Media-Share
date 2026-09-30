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
    "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/[0.06] block md:inline-block";

  const activeLink =
    "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white bg-white/[0.08] border border-white/10 block md:inline-block";

  function navLink(href, label) {
    const isActive = href === currentPage;
    return `<a href="${href}" class="${isActive ? activeLink : baseLink}">${label}</a>`;
  }

  const signupBtn = `
    <a href="signup.html"
       class="w-full md:w-auto md:ml-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-white
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-500 hover:to-indigo-500
              shadow-lg shadow-purple-900/40
              hover:shadow-purple-900/60
              hover:scale-[1.02] active:scale-[0.98] text-center block">
      Get Started
    </a>
  `;

  const logoutBtn = `
    <button onclick="logout()"
      class="w-full md:w-auto md:ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
             text-gray-300 bg-white/[0.04] border border-white/10
             hover:bg-white/[0.08] hover:text-white hover:border-white/20 text-center block">
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
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-2.5 group flex-shrink-0">
          <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-base shadow-lg shadow-purple-900/40 group-hover:scale-105 transition">
            📁
          </span>
          <span class="text-lg font-semibold text-white tracking-tight">
            Media<span class="text-gray-400">Share</span>
          </span>
        </a>

        <!-- Desktop links -->
        <div class="hidden md:flex items-center gap-1 text-sm">
          ${loggedIn ? authLinks : publicLinks}
        </div>

        <!-- Mobile hamburger -->
        <button id="mobileMenuBtn" onclick="toggleMobileMenu()" 
                class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:text-white transition"
                aria-label="Menu">
          <svg id="menuIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <svg id="closeIcon" class="hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </nav>

      <!-- Mobile dropdown menu -->
      <div id="mobileMenu" class="hidden md:hidden border-t border-white/[0.06] bg-[#0a0a0a]">
        <div class="px-4 py-4 space-y-1 text-sm">
          ${loggedIn ? authLinks : publicLinks}
        </div>
      </div>
    </div>
  `;
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");
  if (!menu) return;
  
  const isHidden = menu.classList.contains("hidden");
  menu.classList.toggle("hidden");
  menuIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
  
  // Prevent body scroll when menu open
  document.body.style.overflow = isHidden ? "hidden" : "";
}