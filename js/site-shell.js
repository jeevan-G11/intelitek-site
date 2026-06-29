(function () {
  const pageName = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const active = pageName === "index.html" ? "home" : pageName.replace(".html", "");

  // ── LOGIN GUARD ──
  if (pageName !== "login.html") {
    if (!localStorage.getItem("userLogged")) {
      window.location.href = "login.html";
    }
  }

  function isActive(page) {
    if (page === "products") {
      return ["products", "electronics", "mechanical", "mechatronics", "renewable",
              "process-control", "product-details", "electrical", "evtechnology",
              "robotics"].includes(active);
    }
    return active === page;
  }

  // ── USER INFO ──
  const userName  = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "";
  const firstWord = userName.split(" ")[0];
  const initial   = firstWord.charAt(0).toUpperCase();

  function logout() {
    localStorage.removeItem("userLogged");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userOrg");
    window.location.href = "login.html";
  }

  function renderHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    header.innerHTML = `
      <nav class="navbar site-nav">
        <a href="index.html" class="logo" aria-label="Intelitek home">
          <img src="images/logo.png" alt="Intelitek Logo">
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links">
          <li><a href="index.html"    class="${isActive("home")     ? "active" : ""}">Home</a></li>
          <li><a href="about.html"    class="${isActive("about")    ? "active" : ""}">About Us</a></li>
          <li><a href="products.html" class="${isActive("products") ? "active" : ""}">Products</a></li>
          <li><a href="services.html" class="${isActive("services") ? "active" : ""}">Services</a></li>
          <li><a href="contact.html"  class="${isActive("contact")  ? "active" : ""}">Contact</a></li>
          <li><a href="our-work.html" class="${isActive("our-work") ? "active" : ""}">Our Work</a></li>
        </ul>
        <div class="search-container">
          <input type="search" id="searchInput" placeholder="Search training systems..."
                 autocomplete="new-password" aria-label="Search products">
          <div id="searchResults"></div>
        </div>

        <!-- PROFILE DROPDOWN -->
        <div class="profile-wrap" id="profileWrap">
          <button class="profile-avatar" id="profileBtn" onclick="window.__toggleProfile()">
            ${initial}
          </button>
          <div class="profile-dropdown" id="profileDropdown">
            <div class="profile-info">
              <div class="profile-avatar-lg">${initial}</div>
              <div class="profile-details">
                <div class="profile-name">${firstWord}</div>
                <div class="profile-email">${userEmail}</div>
              </div>
            </div>
            <div class="profile-divider"></div>
            <button class="profile-logout" onclick="window.__logout()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </div>

      </nav>

      <style>
        .profile-wrap { position: relative; flex-shrink: 0; }

        .profile-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #E8700A;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
          border: 2px solid rgba(255,255,255,0.3);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: inherit;
        }
        .profile-avatar:hover {
          transform: scale(1.08);
          box-shadow: 0 0 0 3px rgba(232,112,10,0.35);
        }

        .profile-dropdown {
          display: none;
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          min-width: 220px;
          z-index: 9999;
          overflow: hidden;
          animation: fadeDown 0.18s ease;
        }
        .profile-dropdown.open { display: block; }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f8fafc;
        }

        .profile-avatar-lg {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: #E8700A;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .profile-details { overflow: hidden; }
        .profile-name {
          font-size: 0.92rem;
          font-weight: 700;
          color: #0F172A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .profile-email {
          font-size: 0.75rem;
          color: #6b7280;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 0;
        }

        .profile-logout {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: none;
          border: none;
          color: #dc2626;
          font-size: 0.88rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s;
          text-align: left;
        }
        .profile-logout:hover { background: #fef2f2; }

        @media (max-width: 768px) {
          .profile-wrap { display: none; }
        }
      </style>
    `;
  }

  function renderFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;
    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-section">
          <h4><span style="font-size:1.1em;font-weight:700;color:#0ea5e9;">INTELITEK</span> edu solution private limited</h4>
          <p>Automation and engineering training solutions for Industry 4.0 education.</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="our-work.html">Our Work</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <p><a href="mailto:sales@intelitek.in">sales@intelitek.in</a></p>
          <p><a href="tel:+919187562018">+91 9187562018</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Intelitek. All rights reserved.</p>
      </div>
    `;
  }

  // Toggle dropdown
  window.__toggleProfile = function() {
    const dd = document.getElementById("profileDropdown");
    if (dd) dd.classList.toggle("open");
  };

  // Close dropdown when clicking outside
  document.addEventListener("click", function(e) {
    const wrap = document.getElementById("profileWrap");
    if (wrap && !wrap.contains(e.target)) {
      const dd = document.getElementById("profileDropdown");
      if (dd) dd.classList.remove("open");
    }
  });

  window.__logout = logout;

  renderHeader();
  renderFooter();
})();