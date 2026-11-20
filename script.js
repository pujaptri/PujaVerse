document.addEventListener("DOMContentLoaded", () => {
  /* ================= ELEMENT SELECTIONS ================= */
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll("nav a");
  const scrollProgressBar = document.getElementById("scroll-progress-bar");
  
  // Theme Toggle Elements
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");

  // Typing Effect Elements
  const typingElement = document.getElementById("typing-text");
  
  // Skills Filter Elements
  const filterTabs = document.querySelectorAll(".filter-tab");
  const skillCards = document.querySelectorAll(".skill-card");

  // Project Modal Elements
  const projectDetailsBtns = document.querySelectorAll(".btn-details");
  const projectModal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalProjectContent = document.getElementById("modal-project-content");



  // Contact Elements
  const btnCopyEmail = document.getElementById("btn-copy-email");
  const emailCopyFeedback = document.getElementById("email-copy-feedback");



  /* ================= SCROLL PROGRESS & SCROLL STYLING ================= */
  window.addEventListener("scroll", () => {
    // 1. Progress Bar Width
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${scrollPercent}%`;

    // 2. Navbar Styling
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });


  /* ================= NAVIGATION ACTIVE LINK TRACKING ================= */
  // Use IntersectionObserver to track and mark the active section in navigation links
  const sectionElements = document.querySelectorAll("section");
  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -25% 0px", // Trigger when section takes up central viewport area
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sectionElements.forEach(section => {
    navObserver.observe(section);
  });


  /* ================= SMOOTH NAV ANCHOR SCROLLING ================= */
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      if (link.getAttribute("id") === "theme-toggle-btn" || link.closest("#theme-toggle-btn")) return;
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        navMenu.classList.remove("show");
        hamburger.classList.remove("active");
      }
    });
  });


  /* ================= HAMBURGER MOBILE MENU TOGGLE ================= */
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");
  });

  // Close menu when clicking outside of navbar
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains("show")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("show");
    }
  });


  /* ================= THEME TOGGLER ================= */
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === "light") {
      themeIcon.className = "fa-solid fa-sun";
    } else {
      themeIcon.className = "fa-solid fa-moon";
    }
  }


  /* ================= TYPEWRITER EFFECT ================= */
  const typingTexts = ["New Experience", "Learning Opportunity", "Growth Journey"];
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeletingText = false;
  let typingSpeed = 100;

  function handleTypewriter() {
    const currentPhrase = typingTexts[phraseIndex];

    if (!isDeletingText) {
      typingElement.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;

      if (characterIndex === currentPhrase.length) {
        // Pause at end of text
        isDeletingText = true;
        typingSpeed = 1500; // Delay before deleting
      } else {
        typingSpeed = 80; // Speed of typing
      }
    } else {
      typingElement.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;

      if (characterIndex === 0) {
        isDeletingText = false;
        phraseIndex = (phraseIndex + 1) % typingTexts.length;
        typingSpeed = 400; // Pause before typing next phrase
      } else {
        typingSpeed = 40; // Speed of deleting
      }
    }

    setTimeout(handleTypewriter, typingSpeed);
  }

  handleTypewriter();


  /* ================= SCROLL REVEAL EFFECT ================= */
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserverOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px", // Trigger slightly before scrolling into view
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target); // Trigger once only
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ================= SKILLS CATEGORY FILTER ================= */
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // 1. Remove active state from current tabs
      filterTabs.forEach(t => t.classList.remove("active"));
      // 2. Add active to clicked tab
      tab.classList.add("active");

      const filterValue = tab.getAttribute("data-filter");

      // 3. Filter cards
      skillCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.style.display = "block";
          // Quick entrance animation
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 30);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });


  /* ================= PROJECT MODAL CASE STUDIES ================= */
  const projectsData = {
    "project-inventory": {
      badge: "UI/UX & Prototyping",
      title: "School Inventory System Development",
      icon: "fa-solid fa-warehouse",
      challenge: "School administrators often struggle with messy spreadsheet records and physical checklists when managing school resources. The challenge was to design a clean system prototype that minimizes administrative bottlenecks, avoids asset shrinkage, and structures equipment check-outs.",
      approach: "A user-centric approach was taken starting with user persona research. Key interfaces were mapped in Figma, outlining inventory lists, check-out flows, status grids, and simple notification panels. Wireframes were designed and iterated into interactive high-fidelity clickable models.",
      results: [
        "A streamlined check-out flow reducing administrative inputs to 3 taps.",
        "A clear inventory visual board prioritizing damaged or missing assets.",
        "Highly positive feedback on prototype testing, indicating high usability for teachers and school officers."
      ]
    },
    "project-catering": {
      badge: "Quality Assurance Testing",
      title: "Catering Website QA Testing",
      icon: "fa-solid fa-shuttle-space",
      challenge: "E-Commerce catering systems handle multiple options, deliveries, and scheduling. Bugs in checkout or shopping cart processes directly impact sales. This project required comprehensive functional validation to verify system behavior against strict user story requirements.",
      approach: "Authored detail-oriented test cases addressing positive, negative, and edge-case boundaries. Conducted thorough Black Box Testing across multiple browsers, verifying page responsiveness, validation constraints, and transaction processing. Blockers and edge bugs were logged in structured report files.",
      results: [
        "Created over 40+ dynamic functional test cases.",
        "Discovered and documented 6 critical bugs including coupon discount calculation errors and layout misalignment.",
        "Increased ordering system flow stability prior to release, improving user check-out confidence metrics."
      ]
    },
    "project-attendance": {
      badge: "Database Design & Web Dev",
      title: "School E-Attendance System",
      icon: "fa-solid fa-clipboard-user",
      challenge: "Tracking student attendance on paper registers is tedious, error-prone, and hinders school audit processes. This database development project aimed to digitize attendance collection, ensuring high data integrity and quick report generation for school records.",
      approach: "Formulated an Entity-Relationship (ER) model and normalized tables to 3NF structure to prevent data duplication. Implemented MySQL relational queries with primary and foreign key constraints. Built a simple web dashboard utilizing HTML and styling variables to display attendance stats.",
      results: [
        "Eliminated redundant records and structured quick index search queries.",
        "Created automated query routines capable of reporting monthly student absences in milliseconds.",
        "Designed a functional UI dashboard allowing teachers to mark and update attendance statuses on mobile screen widths."
      ]
    },
    "project-thesis": {
      badge: "Thesis & Web Dev",
      title: "Web-Based Mail Information System Development",
      icon: "fa-solid fa-envelope-open-text",
      challenge: "Manual physical mail distribution and unstructured tracking systems at PT XYZ led to delayed internal communication, misplaced documents, and search inefficiencies during audits.",
      approach: "Adopted the Prototyping software development life cycle model to design iterative layouts based on administrative staff feedback. Built the application using the Laravel framework with structured MySQL query relations, featuring digital incoming/outgoing mail logs, automated routing sheets, and access permission security.",
      results: [
        "Digitized and structured mail tracking procedures, reducing search time for documents by over 80%.",
        "Developed automated routing logic ensuring mails are channeled to correct department heads instantaneously.",
        "Successfully defended this project as a Bachelor's Degree thesis with an A grade and GPA of 3.69."
      ]
    }
  };

  projectDetailsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project");
      const project = projectsData[projectId];
      
      if (project) {
        let resultsListHTML = "";
        project.results.forEach(res => {
          resultsListHTML += `<li>${res}</li>`;
        });

        modalProjectContent.innerHTML = `
          <div class="modal-header">
            <span class="modal-badge">${project.badge}</span>
            <h3>${project.title}</h3>
          </div>
          <div class="modal-image-area">
            <i class="${project.icon}"></i>
          </div>
          <div class="modal-body">
            <div class="modal-body-section">
              <h4>The Challenge</h4>
              <p>${project.challenge}</p>
            </div>
            <div class="modal-body-section">
              <h4>Our Approach & Tools</h4>
              <p>${project.approach}</p>
            </div>
            <div class="modal-body-section">
              <h4>Key Results & Outputs</h4>
              <ul>
                ${resultsListHTML}
              </ul>
            </div>
          </div>
        `;

        projectModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      }
    });
  });

  function closeModal() {
    projectModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  modalCloseBtn.addEventListener("click", closeModal);
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
      closeModal();
    }
  });





  /* ================= EMAIL TO CLIPBOARD COPY ================= */
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener("click", () => {
      const emailText = document.getElementById("email-link").textContent;
      
      navigator.clipboard.writeText(emailText).then(() => {
        emailCopyFeedback.style.opacity = "1";
        btnCopyEmail.innerHTML = '<i class="fa-solid fa-check" style="color:#10B981;"></i> Email Copied';
        
        setTimeout(() => {
          emailCopyFeedback.style.opacity = "0";
          btnCopyEmail.innerHTML = '<i class="fa-regular fa-copy"></i> Copy to Clipboard';
        }, 2500);
      }).catch(err => {
        console.error("Clipboard copy failed: ", err);
      });
    });
  }



});
