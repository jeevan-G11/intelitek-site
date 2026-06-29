// Intelitek - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
  initHeaderScroll();
  initSmoothScroll();
  initSkeletonLoaders();
});

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Scroll-triggered animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// Header shadow on scroll
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target && this.getAttribute('href') !== '#') {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
// ===== SKELETON LOADER FOR PRODUCT IMAGES =====
function initSkeletonLoaders() {
  document.querySelectorAll(".product-image-wrap").forEach(function(wrap) {
    const img = wrap.querySelector("img");
    if (!img) return;

    // Add skeleton class to the wrap immediately
    wrap.classList.add("img-skeleton");

    // If image already loaded from cache (complete & natural size ok)
    if (img.complete && img.naturalWidth > 0) {
      wrap.classList.remove("img-skeleton");
      img.classList.add("img-loaded");
      return;
    }

    // Image loaded successfully — remove skeleton
    img.addEventListener("load", function() {
      wrap.classList.remove("img-skeleton");
      img.classList.add("img-loaded");
    });

    // Image failed — remove skeleton, show broken icon
    img.addEventListener("error", function() {
      wrap.classList.remove("img-skeleton");
      wrap.classList.add("img-error");
      // Only add icon if not already there
      if (!wrap.querySelector(".img-error-icon")) {
        const icon = document.createElement("span");
        icon.className = "img-error-icon";
        icon.textContent = "🖼️";
        wrap.appendChild(icon);
      }
    });
  });
}

// PRODUCT IMAGE POPUP
document.querySelectorAll(".product-image-wrap img").forEach(img => {
  img.addEventListener("click", function() {
    let popup = document.createElement("div");
    popup.classList.add("img-popup");

    popup.innerHTML = `
      <span class="close-popup">&times;</span>
      <img src="${this.src}">
    `;

    document.body.appendChild(popup);

    popup.querySelector(".close-popup").onclick = () => popup.remove();
    popup.onclick = e => { if(e.target === popup) popup.remove(); };
  });
});
// ================= PREMIUM PRODUCT SLIDER =================
document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector(".slider-track");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if(!track || !nextBtn || !prevBtn) return;
let position = 0;
const move = 320;

function getMaxScroll() {
  return -(track.scrollWidth - track.clientWidth);
}

nextBtn.addEventListener("click", () => {
  position -= move;
  if (position < getMaxScroll()) {
    position = getMaxScroll();
  }
  track.style.transform = `translateX(${position}px)`;
});

prevBtn.addEventListener("click", () => {
  position += move;
  if (position > 0) {
    position = 0;
  }
  track.style.transform = `translateX(${position}px)`;
});

// AUTO SLIDE
setInterval(() => {
  position -= move;
  if (position < getMaxScroll()) {
    position = 0; // reset to beginning
  }
  track.style.transform = `translateX(${position}px)`;
}, 3000);

});
// ===== TRUST SECTION COUNT ANIMATION =====
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".trust-number");

  const animateCounter = (counter) => {
    const targetText = counter.innerText.replace("+", "").replace("/", "");
    const target = parseInt(targetText);
    if (isNaN(target)) return;

    let count = 0;
    const speed = target / 50;

    const update = () => {
      count += speed;
      if (count < target) {
        counter.innerText = Math.floor(count) + "+";
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + "+";
      }
    };

    update();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});
// ===== CONTACT FORM AJAX SUBMIT =====
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const submitBtn = form.querySelector("button");
    const messageBox = document.getElementById("form-message");

    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        messageBox.style.display = "block";
        messageBox.scrollIntoView({ behavior: "smooth", block: "center" });
        submitBtn.innerText = "Message Sent ✓";
      } else {
        alert("Something went wrong. Please try again.");
        submitBtn.innerText = "Send Message";
        submitBtn.disabled = false;
      }
    } catch (error) {
      alert("Error submitting form.");
      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;
    }
  });
}
// Scroll Animation Observer
const animatedElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

animatedElements.forEach(el => observer.observe(el));
// Header Scroll Effect
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
document.addEventListener("DOMContentLoaded", function(){

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("searchResults");

if(!searchInput) return;
searchInput.addEventListener("keypress", function(e){

if(e.key === "Enter"){

let value = searchInput.value.toLowerCase();

let product = products.find(p =>
p.name.toLowerCase().includes(value)
);

if(product){
window.location.href = product.link;
}

}

});

const products = [

/* ELECTRICAL */

{ name:"AC Starter Training Kit", image:"images/ac-starter.png.jpg", link:"product-details.html?name=acstarter" },

{ name:"Basic Electricity & Electronics Training Kit", image:"images/Electrical-Electronics-Training-Kit.png", link:"product-details.html?name=basicelectrical" },

{ name:"Communication Training Kit", image:"images/COMMUNICATION-TRAINING-KIT.png", link:"product-details.html?name=communication" },

{ name:"Conveyor Training Kit", image:"images/Conveyor-Training-Kit-IES-7005.png", link:"product-details.html?name=conveyor" },

{ name:"DC Motor & Generator Training Kit", image:"images/DC-Shunt-Motor-Compound-Generator.png", link:"product-details.html?name=dcmotor" },

{ name:"Dissectible Machine Training Kit", image:"images/Dissectible-Machine-Training-Kit.png", link:"product-details.html?name=dissectible" },

{ name:"Electrical Basic Principle Trainer Kit", image:"images/ELECTRICAL-BASIC-PRINCIPLE-TRAINER-Kit.jpg", link:"product-details.html?name=basicprinciple" },

{ name:"Electrical Installation Trainer", image:"images/Electrical-Installation-Trainer.png", link:"product-details.html?name=installation" },

{ name:"Industrial Sensor Trainer Kit", image:"images/sensor.png", link:"product-details.html?name=industrialSensor" },

/* ELECTRONICS */

{ name:"Basic Electricity and Electronics Fundamental Trainer", image:"images/Basic Electricity and Electronics Fundamental Trainer.jpeg", link:"product-details.html?name=electronicsbasic" },

{ name:"Electronic Workbench with Analog Trainer – IES4041", image:"images/Electronic Workbench with Analog Trainer – IES4041.png", link:"product-details.html?name=analogtrainer" },

{ name:"Electronic Workbench with Instrument Panel", image:"images/Electronic Workbench with Instrument Panel .jpg", link:"product-details.html?name=instrumentpanel" },

{ name:"Electronics Lab Trainer Kit", image:"images/Electronics Lab Trainer Kit Manufacturers & Suppliers.jpg", link:"product-details.html?name=electronicslab" },

{ name:"Industrial Sensor Trainer", image:"images/INDUSTRIAL SENSOR TRAINER KIT.jpeg", link:"product-details.html?name=industrialsensor" },

{ name:"Micro Controller Training Kit – IES 2044", image:"images/Micro-Controller Training Kit – IES 2044.png", link:"product-details.html?name=microcontroller" },

/* MECHANICAL */

{ name:"Basic Refrigeration Trainer", image:"images/mechanical/Basic Refrigeration Trainer.jpeg", link:"product-details.html?name=refrigeration" },
{ name:"Pneumatic Trainer Kit", image:"images/mechanical/basic-pneumatic-trainer.jpg", link:"product-details.html?name=pneumatic" },
{ name:"Hydraulic Trainer Kit", image:"images/mechanical/Hydraulic Trainer Kits.jpg", link:"product-details.html?name=hydraulic" },
{ name:"Electro Hydraulic Training Kit", image:"images/mechanical/ELECTRO-HYDRAULIC TRAINING KIT.png", link:"product-details.html?name=electrohydraulic" },
{ name:"Electro Hydraulic Trainer Kit", image:"images/mechanical/Electro Hydraulic Trainer Kit.png", link:"product-details.html?name=electrohydraulictrainer" },
{ name:"Electro Pneumatic Trainer Kit", image:"images/mechanical/Electro Pneumatic Trainer Kit .png", link:"product-details.html?name=electropneumatic" },

/* MECHATRONICS */

{ name:"6 Axis Articulated Robot Training Kit", image:"images/Mechatronics, Robotics and Automation/6 Axis Articulated Training Robot Kit.jpeg", link:"product-details.html?name=sixaxisrobot" },

{ name:"Advance PLC Training Kit", image:"images/Mechatronics, Robotics and Automation/Advance PLC Trainer kit.png", link:"product-details.html?name=advanceplc" },

{ name:"Miniature Industrial Production System", image:"images/Mechatronics, Robotics and Automation/MINIATURE INDUSTRIAL PRODUCTION SYSTEM.png", link:"product-details.html?name=productionmodule" },

{ name:"Robot Training Cell", image:"images/Mechatronics, Robotics and Automation/ROBOT TRAINING CELL.png", link:"product-details.html?name=robotcell" },

{ name:"Integrated Smart Control System with SCADA", image:"images/Mechatronics, Robotics and Automation/INTEGRATED SMART CONTROL SYSTEM WITH SCADA.png", link:"product-details.html?name=scadasystem" },

{ name:"Automation Trainer Kit – Industrial 4.0", image:"images/Mechatronics, Robotics and Automation/Automation Trainer Kit-Industrial 4.0 Automation System Kit.jpg", link:"product-details.html?name=automationtrainer" },

{ name:"Basic PLC Trainer", image:"images/Mechatronics, Robotics and Automation/basic-plc.jpg", link:"product-details.html?name=basicplc" },

{ name:"Bottle Filling Module Training Kit", image:"images/Mechatronics, Robotics and Automation/Bottle Filling Module Training Kit.png", link:"product-details.html?name=bottlefilling" },

{ name:"Building Automation Training Booth", image:"images/Mechatronics, Robotics and Automation/Building Automation Training Booth.jpeg", link:"product-details.html?name=buildingautomation" },

{ name:"CCTV Security System Training Kit", image:"images/Mechatronics, Robotics and Automation/CCTV Security System Training Kit.jpeg", link:"product-details.html?name=cctvtraining" },

{ name:"COBOT Training Kit", image:"images/Mechatronics, Robotics and Automation/COBOT-TRAINING-KIT.png", link:"product-details.html?name=cobot" },

{ name:"Fire Alarm Demonstrator", image:"images/Mechatronics, Robotics and Automation/Fire Alarm Demonstrator.jpeg", link:"product-details.html?name=firealarm" },

{ name:"Industrial Automation Training System", image:"images/Mechatronics, Robotics and Automation/Automation Trainer Kit-Industrial 4.0 Automation System Kit.jpg", link:"product-details.html?name=automationtrainer" },

{ name:"Industrial Production Training Module", image:"images/Mechatronics, Robotics and Automation/MINIATURE INDUSTRIAL PRODUCTION SYSTEM.png", link:"product-details.html?name=productionmodule" },

{ name:"PLC Automation Trainer", image:"images/Mechatronics, Robotics and Automation/basic-plc.jpg", link:"product-details.html?name=basicplc" },


/* RENEWABLE */

{ name:"Solar Wind Energy Training Kit", image:"images/renewable/SOLAR & WIND ENERGY TRAINING KIT-IES-0534.png", link:"product-details.html?name=solarwind" },
{ name:"Solar Power Generation Training System", image:"images/renewable/Solar Energy-Solar Power Generation & Training System.jpeg", link:"product-details.html?name=solarpower" },
{ name:"Solar Thermal Evacuated Tube System", image:"images/renewable/SOLAR THERMAL EVACUATED TUBE.png", link:"product-details.html?name=solarthermal" },
{ name:"Green Technology Trainer Kit", image:"images/renewable/green-technology-trainer-kit.jpg", link:"product-details.html?name=greentech" },
{ name:"Solar Training Kit", image:"images/renewable/SOLAR TRAINING KIT.png", link:"product-details.html?name=solarkit" },


{ name:"Sensor Training Kit – IES 2045", image:"images/Process Control/Sensor Training Kit – IES 2045.png", link:"product-details.html?name=sensortrainer2045" },

{ name:"Analog & Digital Sensor Trainer – IES 2040", image:"images/Process Control/Analog and Digital Sensor Trainer Kit – IES 2040.png", link:"product-details.html?name=analogsensortrainer" },

{ name:"Industrial Process Control Trainer Kit", image:"images/Process Control/Industrial Process Control Trainer Kit.jpeg", link:"product-details.html?name=processcontroltrainer" },

{ name:"PLC-Based Flow & Pressure Control System", image:"images/Process Control/PLC-Based-Flow-Pressure-Control-System-1.jpg", link:"product-details.html?name=flowpressurecontrol" },

{ name:"Digital Oscilloscope – 4000 Series", image:"images/Process Control/Digital Oscilloscope 4000 Series.png", link:"product-details.html?name=oscilloscope4000" },

{ name:"MSO 7000 Series", image:"images/Process Control/MSO 7000 Series.jpg", link:"product-details.html?name=mso7000" },

{ name:"Universal Work Bench", image:"images/Process Control/universal-work-bench.jpg", link:"product-details.html?name=universalworkbench" },

{ name:"Digital Oscilloscope 6000 Series", image:"images/Process Control/Digital Oscilloscope 6000 Series.jpg", link:"product-details.html?name=oscilloscope6000" },

{ name:"Digital Sensor Trainer", image:"images/Process Control/Digital Sensor Trainer.png", link:"product-details.html?name=digitalsensortrainer" },

{ name:"DS1000 Series Digital Oscilloscope", image:"images/Process Control/DS1000 Series Digital Oscilloscopes.jpg", link:"product-details.html?name=ds1000" },

{ name:"Electronic Fault Finding Test Simulation Board", image:"images/Process Control/Electronic fault finding test simulation board- IES2041.png", link:"product-details.html?name=faultfinding" },

{ name:"Mixed Signal Oscilloscope", image:"images/Process Control/mso-mixed-signal-oscilloscope.jpg", link:"product-details.html?name=mso" },

/* EV TECHNOLOGY */

{ name:"Electric Vehicle Working Model Trainer", image:"images/evtechnology/2-W Electric Vehicle Working Model Training Setup.png", link:"product-details.html?name=evworkingmodel" },

{ name:"2-Wheeler EV Drivetrain Trainer", image:"images/evtechnology/2–Wheeler Electric Vehicle Drivetrain Training Setup with Mechanical Loading.png", link:"product-details.html?name=2wevdrivetrain" },

{ name:"2-Wheeler EV Motor Research Trainer", image:"images/evtechnology/2-Wheeler EV Motor Drivetrain Training & Research Setup.png", link:"product-details.html?name=2wevresearch" },

{ name:"3-Wheeler EV Motor Drivetrain Trainer", image:"images/evtechnology/03-Wheeler EV Motor Drivetrain with Loading Facility.png", link:"product-details.html?name=3wevdrivetrain" },

{ name:"Solar Powered 3-Wheeler EV Trainer", image:"images/evtechnology/3-Wheeler Electric Vehicle Training Setup with Solar Powered Charging System .png", link:"product-details.html?name=3wevsolartrainer" },

{ name:"4-Wheeler EV Drivetrain Trainer", image:"images/evtechnology/4-Wheeler EV Motor Drivetrain Training & Research Setup .png", link:"product-details.html?name=4wevdrivetrain" },

{ name:"2-Wheeler EV Chassis Dynamometer", image:"images/evtechnology/Electric Vehicle Chassis Dynamometer for 2-Wheeler EVs with Electric 2-Wheeler .png", link:"product-details.html?name=evchassisdyno" },

{ name:"EV Motor & Li-Ion Battery Cut Section Trainer", image:"images/evtechnology/E-Mobility Motors & Li-Ion Battery Cut-Section Display Workbench.png", link:"product-details.html?name=evbatterycutsection" },

{ name:"EV Golf Cart Working Model", image:"images/evtechnology/EV Golf Kart (Battery Operated) 4-Wheeler Working Model.png", link:"product-details.html?name=evgolfkart" },

{ name:"4-Wheeler EV Cut Section Model", image:"images/evtechnology/Four-Wheeler EV Working Cut-Section Model.png", link:"product-details.html?name=4wevcutsection" },

{ name:"Hybrid Electric Vehicle Anatomical Platform", image:"images/evtechnology/Full Hybrid Electric Vehicle (HEV) Anatomical Working Car Platform.png", link:"product-details.html?name=hevcarplatform" },

{ name:"Hybrid Electric Vehicle Powertrain Trainer", image:"images/evtechnology/Hybrid Electric Vehicle (HEV) Powertrain Training Setup .png", link:"product-details.html?name=hevpowertrain" },

{ name:"Hydrogen Fuel Cell EV Trainer", image:"images/evtechnology/Hydrogen Fuel Cell Electric Vehicle Training System Integrated with Renewable Energy.png", link:"product-details.html?name=hydrogenfcev" },

{ name:"Smart Electric Two-Wheeler Trainer", image:"images/evtechnology/Interactive Electric Two-Wheeler Training System with Fault Simulation, IoT & Voice Control.png", link:"product-details.html?name=smart2wevtrainer" },

{ name:"Model Based Development Real-Time Controller", image:"images/evtechnology/Model-Based Development (MBD) Real-Time Controller .png", link:"product-details.html?name=mbdcontroller" },

{ name:"Electric Auto Rickshaw Cut Section Trainer", image:"images/evtechnology/Working Electric Passenger Auto-Rickshaw – Cut-Sectioned Training System .png", link:"product-details.html?name=evautorickshaw" },

{ name:"Hybrid Petrol Engine Working Model", image:"images/evtechnology/Working Model of Hybrid Petrol Engine.png", link:"product-details.html?name=hybridengine" },

];


searchInput.addEventListener("input", function(){

let value = this.value.toLowerCase();

results.innerHTML="";

if(value===""){
results.style.display="none";
return;
}

let filtered = products.filter(product =>
product.name.toLowerCase().includes(value)
);

filtered.forEach(product=>{

let div=document.createElement("div");
div.classList.add("search-result");

div.innerHTML = `
<img src="${product.image}">
<span>${product.name}</span>
`;

div.onclick = ()=>{
window.location.href=product.link;
};

results.appendChild(div);

});

results.style.display="block";

});

});



document.querySelectorAll('.small-images img').forEach(img => {
  img.addEventListener('click', function() {
    const mainImg = this.closest('.project-images').querySelector('.main-img');
    mainImg.src = this.src;
  });
});