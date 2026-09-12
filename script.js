/* ==========================================================================
   RISHI RAJ - GENERATIVE AI DATA SCIENTIST & FULL STACK GENAI DEVELOPER
   Interactive JavaScript Core File
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
   0. THEME TOGGLER
   ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
      if (document.documentElement.classList.contains('light')) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    });
  }

  /* ------------------------------------------------------------------------
   1. CANVAS PARTICLE BACKGROUND ENGINE
   ------------------------------------------------------------------------ */
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 15), 65);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.color = Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(20, 184, 166, ';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }

  animateParticles();


  /* ------------------------------------------------------------------------
   2. HERO TYPEWRITER TITLE ANIMATION
   ------------------------------------------------------------------------ */
  const titles = [
    "Generative AI Data Scientist",
    "Full Stack GenAI Developer",
    "RAG & LLM Systems Builder"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typingText');

  function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typingElement) typeEffect();


  /* ------------------------------------------------------------------------
   3. NAVBAR SCROLL & MOBILE TOGGLE
   ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });


  /* ------------------------------------------------------------------------
   4. CORE EXPERTISE (SKILLS) TABS SWITCHER
   ------------------------------------------------------------------------ */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });


  /* ------------------------------------------------------------------------
   5. PROJECT FILTERING ENGINE
   ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ------------------------------------------------------------------------
   6. GET QUOTE SERVICE MODAL MANAGER
   ------------------------------------------------------------------------ */
  const quoteModal = document.getElementById('quoteModal');
  const closeQuoteModal = document.getElementById('closeQuoteModal');
  const quoteBtns = document.querySelectorAll('.quote-btn');
  const serviceTitleElement = document.getElementById('selectedServiceTitle');

  quoteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      serviceTitleElement.textContent = serviceName;
      quoteModal.classList.add('active');
    });
  });

  if (closeQuoteModal) {
    closeQuoteModal.addEventListener('click', () => {
      quoteModal.classList.remove('active');
    });
  }

  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(`Thank you! Your quote request for "${serviceTitleElement.textContent}" has been sent to Rishi Raj.`);
      quoteModal.classList.remove('active');
      quoteForm.reset();
    });
  }


  /* ------------------------------------------------------------------------
   7. PROJECT DEEP-DIVE MODAL DRAWER
   ------------------------------------------------------------------------ */
  const projectModal = document.getElementById('projectModal');
  const closeProjectModal = document.getElementById('closeProjectModal');
  const projectModalContent = document.getElementById('projectModalContent');
  const openModalBtns = document.querySelectorAll('.open-modal');

  const projectDetailsMap = {
    project1: `
      <h2 style="font-size: 1.6rem; margin-bottom: 12px;" class="gradient-text">End-to-End Text-to-SQL LLM Application</h2>
      <p style="margin-bottom: 16px;"><strong>Architecture:</strong> Google Gemini 1.5 Pro + LangChain + Streamlit + SQLite</p>
      <hr style="border-color: var(--border-glass); margin-bottom: 16px;">
      <h4 style="margin-bottom: 8px;">Key Capabilities:</h4>
      <ul style="padding-left: 20px; color: var(--text-muted); margin-bottom: 16px;">
        <li>Converts natural language queries directly into syntactically correct SQL statements.</li>
        <li>Executes queries against SQLite databases in real time and renders table summaries.</li>
        <li>Features built-in schema evaluation, fallback prompts, and error handling for bad SQL generation.</li>
      </ul>
      <a href="https://github.com/chalescharli/end-to-end-text-to-SQL-LLM-app" target="_blank" class="btn btn-primary btn-sm"><i class="fa-brands fa-github"></i> View Repository</a>
    `,
    project2: `
      <h2 style="font-size: 1.6rem; margin-bottom: 12px;" class="gradient-text">Medical AI Assistant (RAG System)</h2>
      <p style="margin-bottom: 16px;"><strong>Architecture:</strong> Hugging Face Transformers + FAISS + PyTesseract OCR + Voice Synthesis</p>
      <hr style="border-color: var(--border-glass); margin-bottom: 16px;">
      <h4 style="margin-bottom: 8px;">Key Capabilities:</h4>
      <ul style="padding-left: 20px; color: var(--text-muted); margin-bottom: 16px;">
        <li>Ingests clinical documents, PDFs, and scanned medical records using OCR ingestion.</li>
        <li>Generates dense vector embeddings indexed with FAISS for sub-millisecond semantic document search.</li>
        <li>Synthesizes accurate medical answers and reads them aloud using voice output APIs.</li>
      </ul>
      <a href="https://github.com/chalescharli/medical_agent" target="_blank" class="btn btn-primary btn-sm"><i class="fa-brands fa-github"></i> View Repository</a>
    `,
    project3: `
      <h2 style="font-size: 1.6rem; margin-bottom: 12px;" class="gradient-text">Application Scorecard for Credit Risk Prediction</h2>
      <p style="margin-bottom: 16px;"><strong>Tech Stack:</strong> Python, Scikit-Learn, Logistic Regression, Pandas, Statsmodels</p>
      <hr style="border-color: var(--border-glass); margin-bottom: 16px;">
      <h4 style="margin-bottom: 8px;">Key Results & Achievements:</h4>
      <ul style="padding-left: 20px; color: var(--text-muted); margin-bottom: 16px;">
        <li>Built Probability of Default (PD) scoring model on credit bureau and alternative data sources.</li>
        <li>Evaluated performance using Area Under Curve (AUC) and Gini coefficient metrics.</li>
        <li><strong>Captured 38% of defaulters within top 20% riskiest users</strong> and achieved a <strong>27% model performance boost</strong> over baseline.</li>
      </ul>
    `,
    project4: `
      <h2 style="font-size: 1.6rem; margin-bottom: 12px;" class="gradient-text">AI Gesture-Controlled Robotic Arm</h2>
      <p style="margin-bottom: 16px;"><strong>Tech Stack:</strong> Python, OpenCV, MediaPipe, Arduino C++, Hardware Robotics</p>
      <hr style="border-color: var(--border-glass); margin-bottom: 16px;">
      <h4 style="margin-bottom: 8px;">Key Features:</h4>
      <ul style="padding-left: 20px; color: var(--text-muted); margin-bottom: 16px;">
        <li>Real-time hand tracking and skeletal landmark extraction via webcam feed using OpenCV.</li>
        <li>Maps hand angles and gestures directly into multi-axis servo motor angles on an Arduino microcontroller.</li>
        <li>Enables touchless human-machine interaction for sanitary and industrial robotics applications.</li>
      </ul>
    `
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      if (projectDetailsMap[projectId]) {
        projectModalContent.innerHTML = projectDetailsMap[projectId];
        projectModal.classList.add('active');
      }
    });
  });

  if (closeProjectModal) {
    closeProjectModal.addEventListener('click', () => {
      projectModal.classList.remove('active');
    });
  }

  // Close modals on clicking overlay background
  window.addEventListener('click', (e) => {
    if (e.target === quoteModal) quoteModal.classList.remove('active');
    if (e.target === projectModal) projectModal.classList.remove('active');
  });


  /* ------------------------------------------------------------------------
   8. CONTACT FORM SUBMISSION HANDLER
   ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thank you, Rishi Raj has received your message! He will get back to you shortly.");
      contactForm.reset();
    });
  }


  /* ------------------------------------------------------------------------
   9. FLOATING AI ASSISTANT CHAT ENGINE
   ------------------------------------------------------------------------ */
  const aiChatToggle = document.getElementById('aiChatToggle');
  const aiChatWindow = document.getElementById('aiChatWindow');
  const closeAiChat = document.getElementById('closeAiChat');
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const aiChatMessages = document.getElementById('aiChatMessages');
  const promptChips = document.querySelectorAll('.prompt-chip');

  if (aiChatToggle && aiChatWindow) {
    aiChatToggle.addEventListener('click', () => {
      aiChatWindow.classList.toggle('active');
    });

    if (closeAiChat) {
      closeAiChat.addEventListener('click', () => {
        aiChatWindow.classList.remove('active');
      });
    }

    const respondToQuery = (userQuery) => {
      // Append User Message
      const userMsgDiv = document.createElement('div');
      userMsgDiv.className = 'chat-msg user-msg';
      userMsgDiv.textContent = userQuery;
      aiChatMessages.appendChild(userMsgDiv);

      // Typing Indicator
      const botMsgDiv = document.createElement('div');
      botMsgDiv.className = 'chat-msg bot-msg';
      botMsgDiv.textContent = "Thinking...";
      aiChatMessages.appendChild(botMsgDiv);
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

      setTimeout(() => {
        const queryLower = userQuery.toLowerCase();
        let response = "";

        // Greetings
        if (/\b(hi|hello|hey|namaste|greetings)\b/i.test(queryLower)) {
          response = "Hi there! 👋 I'm Rishi's virtual assistant. You can ask me about his skills, experience, projects, or how to contact him. How can I help you today?";
        } 
        // Skills & Tech Stack
        else if (/\b(skill|skills|tech|stack|technologies|tools|languages|programming|frameworks)\b/i.test(queryLower)) {
          response = "🚀 Rishi is a Full-Stack GenAI Developer! His core stack includes Python, Google Gemini 1.5, LangChain, Vector DBs (Pinecone/FAISS), React, Node.js, and 3D Computer Vision using OpenCV.";
        } 
        // Experience / Work History
        else if (/\b(experience|work|job|jobs|exl|telus|petpooja|history|background|internship|career)\b/i.test(queryLower)) {
          response = "💼 Rishi has worked as a Data Scientist at Petpooja, a Data Analyst at TELUS Digital, and an Analyst at EXL AI Studio, where he built production-grade RAG pipelines and Document Processing systems.";
        } 
        // Projects
        else if (/\b(project|projects|portfolio|built|made|created|app|apps|application)\b/i.test(queryLower)) {
          response = "🛠️ Rishi has built some amazing stuff! Including a 10K+ Spatial 3D CV Dataset platform, Medical RAG chatbots, a Text-to-SQL query bot, and an AI gesture-controlled robotic arm. You can check them out in the Projects section above!";
        } 
        // Education
        else if (/\b(education|degree|college|university|study|graduate|graduated|parul|btech)\b/i.test(queryLower)) {
          response = "🎓 Rishi holds a B.Tech in Computer Science with a specialization in Artificial Intelligence from Parul University (2021–2025).";
        } 
        // Certifications
        else if (/\b(certifications|certified|certificate|oracle|ibm|upgrad|credentials|badges)\b/i.test(queryLower)) {
          response = "🏆 He is an Oracle Certified OCI GenAI & LLM Professional! He also holds advanced certifications from upGrad (GenAI), IBM (Data Science), and freeCodeCamp (Machine Learning).";
        } 
        // Contact / Hire
        else if (/\b(hire|contact|email|phone|whatsapp|reach|freelance|resume)\b/i.test(queryLower)) {
          response = "📬 You can reach Rishi by emailing Rishiraj1131@gmail.com, calling +91 77798 39102, or clicking the WhatsApp icon on the screen. He's always open to discussing exciting GenAI opportunities!";
        } 
        // Easter Egg / Casual
        else if (/\b(how are you|how r u|what's up|whats up)\b/i.test(queryLower)) {
          response = "I'm just a bunch of JavaScript logic living in your browser, but I'm doing great! 😄 How can I help you learn more about Rishi?";
        }
        else if (/\b(who are you|are you ai|are you real|bot)\b/i.test(queryLower)) {
          response = "I'm Rishi's custom-built virtual portfolio assistant! I might not be as smart as the Gemini 1.5 models he works with, but I know everything about his resume. Try asking me about his 'projects' or 'skills'!";
        }
        // Fallback
        else {
          response = "🤔 Hmm, I'm not entirely sure how to answer that. But I do know that Rishi is a brilliant Generative AI Developer! Try asking me about his 'Experience', 'Projects', or 'Skills'. Or you can email him directly at Rishiraj1131@gmail.com.";
        }

        botMsgDiv.textContent = response;
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
      }, 700);
    };

    if (aiChatForm) {
      aiChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = aiChatInput.value.trim();
        if (query) {
          respondToQuery(query);
          aiChatInput.value = '';
        }
      });
    }

    promptChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const promptText = chip.getAttribute('data-prompt');
        respondToQuery(promptText);
      });
    });
  }

});
