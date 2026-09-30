function renderFooter() {
  const container = document.getElementById("footer");
  if (!container) return;

  container.innerHTML = `
    <footer class="border-t border-white/[0.06] bg-[#0a0a0a] mt-24">
      <div class="max-w-7xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-4 gap-10">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2.5 mb-4">
            <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-base shadow-lg shadow-purple-900/40">
              📁
            </span>
            <span class="text-lg font-semibold text-white tracking-tight">
              Media<span class="text-gray-400">Share</span>
            </span>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed max-w-md">
            Secure media sharing platform. Organize photos and documents into groups,
            and grant temporary 1-hour access that can be revoked anytime.
          </p>
          <div class="flex gap-3 mt-6">
            <a href="https://github.com/SonuJaiswal6828" target="_blank"
               class="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.69-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15v3.19c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
              </svg>
            </a>
            <a href="https://sonuj-portfolio.netlify.app" target="_blank"
               class="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/>
              </svg>
            </a>
            <a href="mailto:sonuj6828@gmail.com"
               class="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="index.html" class="text-gray-400 hover:text-white transition">Home</a></li>
            <li><a href="about.html" class="text-gray-400 hover:text-white transition">About</a></li>
            <li><a href="request-access.html" class="text-gray-400 hover:text-white transition">Request Access</a></li>
            <li><a href="request-status.html" class="text-gray-400 hover:text-white transition">Check Status</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-wider mb-4">Developer</h4>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li class="text-white font-medium">Sonu Jaiswal</li>
            <li>sonuj6828@gmail.com</li>
            <li>+91 77768 39491</li>
            <li>Vasai East, Maharashtra</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/[0.06]">
        <div class="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© 2026 MediaShare. All rights reserved.</p>
          <p>Made with <span class="text-purple-400">♥</span> by <span class="text-white font-medium">Sonu Jaiswal</span></p>
        </div>
      </div>
    </footer>
  `;
}