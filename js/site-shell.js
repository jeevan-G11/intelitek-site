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

  // ── ALL PRODUCTS FOR SEARCH ──
  const ALL_PRODUCTS = [
    /* ELECTRICAL */
    { name:"AC Starter Training Kit", category:"Electrical", image:"images/ac-starter.png.jpg", link:"product-details.html?name=acstarter" },
    { name:"Basic Electricity & Electronics Training Kit", category:"Electrical", image:"images/Electrical-Electronics-Training-Kit.png", link:"product-details.html?name=basicelectrical" },
    { name:"Communication Training Kit", category:"Electrical", image:"images/COMMUNICATION-TRAINING-KIT.png", link:"product-details.html?name=communication" },
    { name:"Conveyor Training Kit", category:"Electrical", image:"images/Conveyor-Training-Kit-IES-7005.png", link:"product-details.html?name=conveyor" },
    { name:"DC Motor & Generator Training Kit", category:"Electrical", image:"images/DC-Shunt-Motor-Compound-Generator.png", link:"product-details.html?name=dcmotor" },
    { name:"Dissectible Machine Training Kit", category:"Electrical", image:"images/Dissectible-Machine-Training-Kit.png", link:"product-details.html?name=dissectible" },
    { name:"Electrical Basic Principle Trainer Kit", category:"Electrical", image:"images/ELECTRICAL-BASIC-PRINCIPLE-TRAINER-Kit.jpg", link:"product-details.html?name=basicprinciple" },
    { name:"Electrical Installation Trainer", category:"Electrical", image:"images/Electrical-Installation-Trainer.png", link:"product-details.html?name=installation" },
    { name:"Industrial Sensor Trainer Kit", category:"Electrical", image:"images/sensor.png", link:"product-details.html?name=industrialSensor" },

    /* ELECTRONICS */
    { name:"Basic Electricity and Electronics Fundamental Trainer", category:"Electronics", image:"images/Basic Electricity and Electronics Fundamental Trainer.jpeg", link:"product-details.html?name=electronicsbasic" },
    { name:"Electronic Workbench with Analog Trainer IES4041", category:"Electronics", image:"images/Electronic Workbench with Analog Trainer – IES4041.png", link:"product-details.html?name=analogtrainer" },
    { name:"Electronic Workbench with Instrument Panel", category:"Electronics", image:"images/Electronic Workbench with Instrument Panel .jpg", link:"product-details.html?name=instrumentpanel" },
    { name:"Electronics Lab Trainer Kit", category:"Electronics", image:"images/Electronics Lab Trainer Kit Manufacturers & Suppliers.jpg", link:"product-details.html?name=electronicslab" },
    { name:"Industrial Sensor Trainer Kit", category:"Electronics", image:"images/INDUSTRIAL SENSOR TRAINER KIT.jpeg", link:"product-details.html?name=industrialsensor" },
    { name:"Micro Controller Training Kit IES 2044", category:"Electronics", image:"images/Micro-Controller Training Kit – IES 2044.png", link:"product-details.html?name=microcontroller" },

    /* MECHANICAL */
    { name:"Basic Refrigeration Trainer", category:"Mechanical", image:"images/mechanical/Basic Refrigeration Trainer.jpeg", link:"product-details.html?name=refrigeration" },
    { name:"Pneumatic Trainer Kit", category:"Mechanical", image:"images/mechanical/basic-pneumatic-trainer.jpg", link:"product-details.html?name=pneumatic" },
    { name:"Hydraulic Trainer Kit", category:"Mechanical", image:"images/mechanical/Hydraulic Trainer Kits.jpg", link:"product-details.html?name=hydraulic" },
    { name:"Electro Hydraulic Training Kit", category:"Mechanical", image:"images/mechanical/ELECTRO-HYDRAULIC TRAINING KIT.png", link:"product-details.html?name=electrohydraulic" },
    { name:"Electro Hydraulic Trainer Kit Advanced", category:"Mechanical", image:"images/mechanical/Electro Hydraulic Trainer Kit.png", link:"product-details.html?name=electrohydraulictrainer" },
    { name:"Electro Pneumatic Trainer Kit", category:"Mechanical", image:"images/mechanical/Electro Pneumatic Trainer Kit .png", link:"product-details.html?name=electropneumatic" },

    /* MECHATRONICS */
    { name:"6 Axis Articulated Robot Training Kit", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/6 Axis Articulated Training Robot Kit.jpeg", link:"product-details.html?name=sixaxisrobot" },
    { name:"Advance PLC Training Kit", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/Advance PLC Trainer kit.png", link:"product-details.html?name=advanceplc" },
    { name:"Miniature Industrial Production System", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/MINIATURE INDUSTRIAL PRODUCTION SYSTEM.png", link:"product-details.html?name=productionmodule" },
    { name:"Robot Training Cell", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/ROBOT TRAINING CELL.png", link:"product-details.html?name=robotcell" },
    { name:"Integrated Smart Control System with SCADA", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/INTEGRATED SMART CONTROL SYSTEM WITH SCADA.png", link:"product-details.html?name=scadasystem" },
    { name:"Automation Trainer Kit Industrial 4.0", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/Automation Trainer Kit-Industrial 4.0 Automation System Kit.jpg", link:"product-details.html?name=automationtrainer" },
    { name:"Basic PLC Trainer", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/basic-plc.jpg", link:"product-details.html?name=basicplc" },
    { name:"Bottle Filling Module Training Kit", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/Bottle Filling Module Training Kit.png", link:"product-details.html?name=bottlefilling" },
    { name:"Building Automation Training Booth", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/Building Automation Training Booth.jpeg", link:"product-details.html?name=buildingautomation" },
    { name:"CCTV Security System Training Kit", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/CCTV Security System Training Kit.jpeg", link:"product-details.html?name=cctvtraining" },
    { name:"COBOT Training Kit", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/COBOT-TRAINING-KIT.png", link:"product-details.html?name=cobot" },
    { name:"Fire Alarm Demonstrator", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/Fire Alarm Demonstrator.jpeg", link:"product-details.html?name=firealarm" },
    { name:"Hydraulic Training Kit IES1203A", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/Hydraulic Training Kit- IES1203A.png", link:"product-details.html?name=hydraulictrainer" },
    { name:"Modular Manufacturing Systems", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/Modular Manufacturing Systems.jpeg", link:"product-details.html?name=modularmanufacturing" },
    { name:"PLC Application System IES 3046", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/PLC APPLICATION SYSTEM – IES 3046.png", link:"product-details.html?name=plcapplication" },
    { name:"PLC Training Kit IES3040", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/PLC Training Kit – IES3040.png", link:"product-details.html?name=plctraining" },
    { name:"PLC Based Level Temperature Control System", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/PLC-Based-Level-Temperature-control-System.jpg", link:"product-details.html?name=plcleveltemp" },
    { name:"SCARA Robot Training Cell IES 7650", category:"Mechatronics", image:"images/Mechatronics, Robotics and Automation/SCARA Robot training cell (ABB-FANUC-KUKA)-IES-7650.png", link:"product-details.html?name=scararobot" },

    /* RENEWABLE ENERGY */
    { name:"Solar Wind Energy Training Kit IES0534", category:"Renewable Energy", image:"images/renewable/SOLAR & WIND ENERGY TRAINING KIT-IES-0534.png", link:"product-details.html?name=solarwind" },
    { name:"Solar Power Generation Training System", category:"Renewable Energy", image:"images/renewable/Solar Energy-Solar Power Generation & Training System.jpeg", link:"product-details.html?name=solarpower" },
    { name:"Solar Thermal Evacuated Tube System", category:"Renewable Energy", image:"images/renewable/SOLAR THERMAL EVACUATED TUBE.png", link:"product-details.html?name=solarthermal" },
    { name:"Green Technology Trainer Kit", category:"Renewable Energy", image:"images/renewable/green-technology-trainer-kit.jpg", link:"product-details.html?name=greentech" },
    { name:"Solar Training Kit", category:"Renewable Energy", image:"images/renewable/SOLAR TRAINING KIT.png", link:"product-details.html?name=solarkit" },

    /* PROCESS CONTROL */
    { name:"Sensor Training Kit IES 2045", category:"Process Control", image:"images/Process Control/Sensor Training Kit – IES 2045.png", link:"product-details.html?name=sensortrainer2045" },
    { name:"Analog Digital Sensor Trainer IES 2040", category:"Process Control", image:"images/Process Control/Analog and Digital Sensor Trainer Kit – IES 2040.png", link:"product-details.html?name=analogsensortrainer" },
    { name:"Industrial Process Control Trainer Kit", category:"Process Control", image:"images/Process Control/Industrial Process Control Trainer Kit.jpeg", link:"product-details.html?name=processcontroltrainer" },
    { name:"PLC Based Flow Pressure Control System", category:"Process Control", image:"images/Process Control/PLC-Based-Flow-Pressure-Control-System-1.jpg", link:"product-details.html?name=flowpressurecontrol" },
    { name:"Digital Oscilloscope 4000 Series", category:"Process Control", image:"images/Process Control/Digital Oscilloscope 4000 Series.png", link:"product-details.html?name=oscilloscope4000" },
    { name:"MSO 7000 Series Mixed Signal Oscilloscope", category:"Process Control", image:"images/Process Control/MSO 7000 Series.jpg", link:"product-details.html?name=mso7000" },
    { name:"Universal Work Bench Workstation", category:"Process Control", image:"images/Process Control/universal-work-bench.jpg", link:"product-details.html?name=universalworkbench" },
    { name:"Digital Oscilloscope 6000 Series", category:"Process Control", image:"images/Process Control/Digital Oscilloscope 6000 Series.jpg", link:"product-details.html?name=oscilloscope6000" },
    { name:"Digital Sensor Trainer", category:"Process Control", image:"images/Process Control/Digital Sensor Trainer.png", link:"product-details.html?name=digitalsensortrainer" },
    { name:"DS1000 Series Digital Oscilloscope", category:"Process Control", image:"images/Process Control/DS1000 Series Digital Oscilloscopes.jpg", link:"product-details.html?name=ds1000oscilloscope" },
    { name:"Electronic Fault Finding Test Simulation Board IES2041", category:"Process Control", image:"images/Process Control/Electronic fault finding test simulation board- IES2041.png", link:"product-details.html?name=faultfindingboard" },
    { name:"MSO Mixed Signal Oscilloscope", category:"Process Control", image:"images/Process Control/mso-mixed-signal-oscilloscope.jpg", link:"product-details.html?name=msomixedsignal" },

    /* EV TECHNOLOGY */
    { name:"Electric Vehicle Working Model Trainer", category:"EV Technology", image:"images/evtechnology/2-W Electric Vehicle Working Model Training Setup.png", link:"product-details.html?name=evworkingmodel" },
    { name:"2 Wheeler EV Drivetrain Trainer", category:"EV Technology", image:"images/evtechnology/2–Wheeler Electric Vehicle Drivetrain Training Setup with Mechanical Loading.png", link:"product-details.html?name=2wevdrivetrain" },
    { name:"2 Wheeler EV Motor Research Trainer", category:"EV Technology", image:"images/evtechnology/2-Wheeler EV Motor Drivetrain Training & Research Setup.png", link:"product-details.html?name=2wevresearch" },
    { name:"3 Wheeler EV Motor Drivetrain Trainer", category:"EV Technology", image:"images/evtechnology/03-Wheeler EV Motor Drivetrain with Loading Facility.png", link:"product-details.html?name=3wevdrivetrain" },
    { name:"Solar Powered 3 Wheeler EV Trainer", category:"EV Technology", image:"images/evtechnology/3-Wheeler Electric Vehicle Training Setup with Solar Powered Charging System .png", link:"product-details.html?name=3wevsolartrainer" },
    { name:"4 Wheeler EV Drivetrain Trainer", category:"EV Technology", image:"images/evtechnology/4-Wheeler EV Motor Drivetrain Training & Research Setup .png", link:"product-details.html?name=4wevdrivetrain" },
    { name:"2 Wheeler EV Chassis Dynamometer", category:"EV Technology", image:"images/evtechnology/Electric Vehicle Chassis Dynamometer for 2-Wheeler EVs with Electric 2-Wheeler .png", link:"product-details.html?name=evchassisdyno" },
    { name:"EV Motor Li Ion Battery Cut Section Trainer", category:"EV Technology", image:"images/evtechnology/E-Mobility Motors & Li-Ion Battery Cut-Section Display Workbench.png", link:"product-details.html?name=evbatterycutsection" },
    { name:"EV Golf Cart Working Model", category:"EV Technology", image:"images/evtechnology/EV Golf Kart (Battery Operated) 4-Wheeler Working Model.png", link:"product-details.html?name=evgolfkart" },
    { name:"4 Wheeler EV Cut Section Model", category:"EV Technology", image:"images/evtechnology/Four-Wheeler EV Working Cut-Section Model.png", link:"product-details.html?name=4wevcutsection" },
    { name:"Hybrid Electric Vehicle Anatomical Platform", category:"EV Technology", image:"images/evtechnology/Full Hybrid Electric Vehicle (HEV) Anatomical Working Car Platform.png", link:"product-details.html?name=hevcarplatform" },
    { name:"Hybrid Electric Vehicle Powertrain Trainer", category:"EV Technology", image:"images/evtechnology/Hybrid Electric Vehicle (HEV) Powertrain Training Setup .png", link:"product-details.html?name=hevpowertrain" },
    { name:"Hydrogen Fuel Cell EV Trainer", category:"EV Technology", image:"images/evtechnology/Hydrogen Fuel Cell Electric Vehicle Training System Integrated with Renewable Energy.png", link:"product-details.html?name=hydrogenfcev" },
    { name:"Smart Electric Two Wheeler Trainer IoT Fault Simulation", category:"EV Technology", image:"images/evtechnology/Interactive Electric Two-Wheeler Training System with Fault Simulation, IoT & Voice Control.png", link:"product-details.html?name=smart2wevtrainer" },
    { name:"Model Based Development Real Time Controller", category:"EV Technology", image:"images/evtechnology/Model-Based Development (MBD) Real-Time Controller .png", link:"product-details.html?name=mbdcontroller" },
    { name:"Electric Auto Rickshaw Cut Section Trainer", category:"EV Technology", image:"images/evtechnology/Working Electric Passenger Auto-Rickshaw – Cut-Sectioned Training System .png", link:"product-details.html?name=evautorickshaw" },
    { name:"Hybrid Petrol Engine Working Model", category:"EV Technology", image:"images/evtechnology/Working Model of Hybrid Petrol Engine.png", link:"product-details.html?name=hybridengine" }
  ];

  // Category color map
  const CAT_COLORS = {
    "Electrical":      "#1d4ed8",
    "Electronics":     "#7c3aed",
    "Mechanical":      "#b45309",
    "Mechatronics":    "#065f46",
    "Renewable Energy":"#15803d",
    "Process Control": "#0369a1",
    "EV Technology":   "#be123c"
  };

  function highlightMatch(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return text.slice(0, idx) +
      '<mark style="background:#fff3cd;color:#003366;font-weight:700;border-radius:2px;padding:0 1px;">' +
      text.slice(idx, idx + query.length) + '</mark>' +
      text.slice(idx + query.length);
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

        <div class="search-container" id="searchContainer">
          <div class="search-input-wrap">
            <svg class="search-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="search" id="searchInput" placeholder="Search products..." autocomplete="off" aria-label="Search products" aria-expanded="false" aria-haspopup="listbox">
            <button class="search-clear" id="searchClear" aria-label="Clear search" style="display:none;">&#x2715;</button>
          </div>
          <div id="searchResults" role="listbox" aria-label="Search suggestions"></div>
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
        /* ── SEARCH CONTAINER ── */
        .search-container {
          position: relative;
          flex: 0 0 auto;
          width: 260px;
        }
        .search-input-wrap {
          display: flex;
          align-items: center;
          background: #f1f5f9;
          border: 1.5px solid #e2e8f0;
          border-radius: 24px;
          padding: 0 12px;
          gap: 6px;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .search-input-wrap:focus-within {
          background: #fff;
          border-color: #003366;
          box-shadow: 0 0 0 3px rgba(0,51,102,0.10);
        }
        .search-icon-svg { flex-shrink: 0; }
        #searchInput {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.88rem;
          color: #1e293b;
          padding: 8px 0;
          font-family: inherit;
          min-width: 0;
        }
        #searchInput::placeholder { color: #94a3b8; }
        .search-clear {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          font-size: 0.85rem;
          padding: 0;
          line-height: 1;
          flex-shrink: 0;
          transition: color 0.15s;
        }
        .search-clear:hover { color: #E8700A; }

        /* ── DROPDOWN RESULTS ── */
        #searchResults {
          display: none;
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.16);
          z-index: 9999;
          max-height: 420px;
          overflow-y: auto;
          border: 1px solid #e2e8f0;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        #searchResults::-webkit-scrollbar { width: 5px; }
        #searchResults::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        #searchResults.open { display: block; animation: srFadeIn 0.15s ease; }
        @keyframes srFadeIn {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ── RESULT HEADER (count) ── */
        .sr-header {
          padding: 8px 14px 4px;
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border-bottom: 1px solid #f1f5f9;
        }

        /* ── INDIVIDUAL RESULT ITEM ── */
        .search-result-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 14px;
          cursor: pointer;
          border-bottom: 1px solid #f8fafc;
          transition: background 0.12s;
          text-decoration: none;
        }
        .search-result-item:hover,
        .search-result-item.keyboard-active {
          background: #f0f7ff;
        }
        .search-result-item:last-child { border-bottom: none; }
        .sri-img {
          width: 42px;
          height: 42px;
          object-fit: contain;
          border-radius: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          flex-shrink: 0;
        }
        .sri-img-fallback {
          width: 42px;
          height: 42px;
          border-radius: 6px;
          background: #e2e8f0;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }
        .sri-text { flex: 1; min-width: 0; }
        .sri-name {
          font-size: 0.84rem;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sri-cat {
          display: inline-block;
          margin-top: 2px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 1px 7px;
          border-radius: 20px;
          color: #fff;
          text-transform: uppercase;
        }
        .sri-arrow {
          color: #cbd5e1;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        /* ── NO RESULTS ── */
        .sr-no-results {
          padding: 22px 14px;
          text-align: center;
          color: #94a3b8;
          font-size: 0.84rem;
        }
        .sr-no-results strong { color: #475569; }

        /* ── VIEW ALL FOOTER ── */
        .sr-view-all {
          display: block;
          padding: 10px 14px;
          text-align: center;
          font-size: 0.80rem;
          font-weight: 700;
          color: #003366;
          text-decoration: none;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 0 0 12px 12px;
          transition: background 0.15s;
        }
        .sr-view-all:hover { background: #e0ecff; }

        /* ── PROFILE ── */
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
        .profile-info { display: flex; align-items: center; gap: 12px; padding: 16px; background: #f8fafc; }
        .profile-avatar-lg {
          width: 42px; height: 42px; border-radius: 50%;
          background: #E8700A; color: #fff;
          font-size: 1.1rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .profile-details { overflow: hidden; }
        .profile-name { font-size: 0.92rem; font-weight: 700; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .profile-email { font-size: 0.75rem; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .profile-divider { height: 1px; background: #e5e7eb; }
        .profile-logout {
          width: 100%; display: flex; align-items: center; gap: 8px;
          padding: 12px 16px; background: none; border: none;
          color: #dc2626; font-size: 0.88rem; font-weight: 600;
          font-family: inherit; cursor: pointer; transition: background 0.15s; text-align: left;
        }
        .profile-logout:hover { background: #fef2f2; }

        @media (max-width: 900px) {
          .search-container { width: 160px; }
        }
        @media (max-width: 768px) {
          .search-container { display: none; }
          .profile-wrap { display: none; }
        }
      </style>
    `;

    // ── SEARCH LOGIC ──
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchClear = document.getElementById("searchClear");
    let activeIndex = -1;

    function getItems() {
      return searchResults.querySelectorAll(".search-result-item");
    }

    function clearActive() {
      getItems().forEach(i => i.classList.remove("keyboard-active"));
    }

    function openResults(query) {
      const q = query.trim().toLowerCase();

      if (q === "") {
        searchResults.classList.remove("open");
        searchResults.innerHTML = "";
        searchClear.style.display = "none";
        activeIndex = -1;
        return;
      }

      searchClear.style.display = "block";

      // Filter — matches name OR category
      const matched = ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );

      activeIndex = -1;
      searchResults.innerHTML = "";

      if (matched.length === 0) {
        searchResults.innerHTML = `
          <div class="sr-no-results">
            No products found for <strong>"${query}"</strong><br>
            <span style="font-size:0.76rem;margin-top:4px;display:block;">Try: PLC, Solar, Robot, EV, Sensor…</span>
          </div>`;
        searchResults.classList.add("open");
        return;
      }

      // Header count
      const header = document.createElement("div");
      header.className = "sr-header";
      header.textContent = matched.length + " product" + (matched.length !== 1 ? "s" : "") + " found";
      searchResults.appendChild(header);

      // Show max 10 results in dropdown
      const shown = matched.slice(0, 10);
      shown.forEach(function(p) {
        const item = document.createElement("a");
        item.className = "search-result-item";
        item.href = p.link;
        item.setAttribute("role", "option");

        const catColor = CAT_COLORS[p.category] || "#475569";

        item.innerHTML = `
          <img class="sri-img" src="${p.image}" alt="" loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
          <span class="sri-img-fallback" style="display:none;">🔧</span>
          <span class="sri-text">
            <span class="sri-name">${highlightMatch(p.name, query.trim())}</span><br>
            <span class="sri-cat" style="background:${catColor};">${p.category}</span>
          </span>
          <span class="sri-arrow">›</span>
        `;

        searchResults.appendChild(item);
      });

      // View all footer if more results exist
      if (matched.length > 10) {
        const more = document.createElement("a");
        more.className = "sr-view-all";
        more.href = "products.html";
        more.textContent = "View all " + matched.length + " results →";
        searchResults.appendChild(more);
      }

      searchResults.classList.add("open");
    }

    searchInput.addEventListener("input", function() {
      openResults(this.value);
    });

    // Keyboard navigation
    searchInput.addEventListener("keydown", function(e) {
      const items = getItems();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        clearActive();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        if (items[activeIndex]) items[activeIndex].classList.add("keyboard-active");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        clearActive();
        activeIndex = Math.max(activeIndex - 1, 0);
        if (items[activeIndex]) items[activeIndex].classList.add("keyboard-active");
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && items[activeIndex]) {
          window.location.href = items[activeIndex].href;
        } else {
          // Go to first result on Enter
          const q = searchInput.value.trim().toLowerCase();
          const match = ALL_PRODUCTS.find(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
          if (match) window.location.href = match.link;
        }
      } else if (e.key === "Escape") {
        searchResults.classList.remove("open");
        searchResults.innerHTML = "";
        activeIndex = -1;
        searchInput.blur();
      }
    });

    // Clear button
    searchClear.addEventListener("click", function() {
      searchInput.value = "";
      searchResults.classList.remove("open");
      searchResults.innerHTML = "";
      searchClear.style.display = "none";
      activeIndex = -1;
      searchInput.focus();
    });

    // Close on outside click
    document.addEventListener("click", function(e) {
      const container = document.getElementById("searchContainer");
      if (container && !container.contains(e.target)) {
        searchResults.classList.remove("open");
        activeIndex = -1;
      }
    });
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

  // Toggle profile dropdown
  window.__toggleProfile = function() {
    const dd = document.getElementById("profileDropdown");
    if (dd) dd.classList.toggle("open");
  };

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