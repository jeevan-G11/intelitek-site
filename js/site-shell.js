(function () {
  const pageName = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const active = pageName === "index.html" ? "home" : pageName.replace(".html", "");

  // ── LOGIN GUARD ──
  // login.html is excluded so it never redirects to itself
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

  // ── USER INFO FROM LOCALSTORAGE ──
  const userName  = localStorage.getItem("userName") || "";
  const firstWord = userName ? userName.split(" ")[0] : "";

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
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="nav-links">
          <li><a href="index.html"      class="${isActive("home")     ? "active" : ""}">Home</a></li>
          <li><a href="about.html"      class="${isActive("about")    ? "active" : ""}">About Us</a></li>
          <li><a href="products.html"   class="${isActive("products") ? "active" : ""}">Products</a></li>
          <li><a href="services.html"   class="${isActive("services") ? "active" : ""}">Services</a></li>
          <li><a href="contact.html"    class="${isActive("contact")  ? "active" : ""}">Contact</a></li>
          <li><a href="our-work.html"   class="${isActive("our-work") ? "active" : ""}">Our Work</a></li>
        </ul>
        <div class="search-container">
          <input type="text" id="productSearch" placeholder="Search products..."
                 autocomplete="off" aria-label="Search products">
          <button id="searchBtn" type="button">Search</button>
          <div id="searchResults" class="search-results" aria-hidden="true"></div>
        </div>
        ${firstWord ? `
        <div class="user-pill">
          <span class="user-pill-name">👤 ${firstWord}</span>
          <button class="user-pill-logout" onclick="window.__logout()">Logout</button>
        </div>` : ""}
      </nav>
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

  // expose logout globally so onclick works
  window.__logout = logout;

  renderHeader();
  renderFooter();
})();