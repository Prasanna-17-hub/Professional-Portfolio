// Start fetching LeetCode data immediately on script load to minimize visual delay
const LEETCODE_USERNAME = 'Prasanna-1714';
const LEETCODE_API_URL = `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`;

const leetcodePromise = fetch(LEETCODE_API_URL)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    if (data && typeof data.totalSolved === 'number') {
      return data;
    }
    throw new Error('Invalid LeetCode data received');
  })
  .catch(error => {
    console.warn('Error fetching live LeetCode stats:', error);
    return null;
  });

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // ⚡ 1. ANIMATED PRELOADER SCREEN
  // ==========================================================================
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderLog = document.getElementById('preloader-log');
  const preloaderPercent = document.getElementById('preloader-percent');

  if (preloader) {
    let progress = 0;
    const logs = [
      "Initializing environment...",
      "Resolving Prasanna R profile...",
      "Loading Full-Stack & Java modules...",
      "Syncing LeetCode stats (280+ solved)...",
      "Rendering UI components...",
      "Ready!"
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 5;
      if (progress > 100) progress = 100;

      if (preloaderBar) preloaderBar.style.width = `${progress}%`;
      if (preloaderPercent) preloaderPercent.textContent = `${progress}%`;

      const logIndex = Math.min(Math.floor((progress / 100) * logs.length), logs.length - 1);
      if (preloaderLog) preloaderLog.textContent = logs[logIndex];

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('fade-out');
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 600);
        }, 300);
      }
    }, 60);
  }

  // ==========================================================================
  // ✨ 2. BACKGROUND PARTICLE CONSTELLATION CANVAS
  // ==========================================================================
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: null, y: null, radius: 150 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.color = 'rgba(255, 107, 74, 0.4)';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particlesArray = [];
    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.min(Math.floor((width * height) / 18000), 50);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();

    function connectParticles() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = 1 - distance / 120;
            ctx.strokeStyle = `rgba(255, 107, 74, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particlesArray.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ==========================================================================
  // 💻 3. INTERACTIVE CLI TERMINAL MODAL
  // ==========================================================================
  const terminalModal = document.getElementById('terminal-modal');
  const openTerminalBtn = document.getElementById('open-terminal-btn');
  const closeTerminalBtn = document.getElementById('close-terminal-btn');
  const closeTerminalX = document.getElementById('close-terminal-x');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  const openTerminal = () => {
    if (!terminalModal) return;
    terminalModal.classList.add('active');
    terminalModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => terminalInput && terminalInput.focus(), 100);
  };

  const closeTerminal = () => {
    if (!terminalModal) return;
    terminalModal.classList.remove('active');
    terminalModal.setAttribute('aria-hidden', 'true');
  };

  if (openTerminalBtn) openTerminalBtn.addEventListener('click', openTerminal);
  if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeTerminal);
  if (closeTerminalX) closeTerminalX.addEventListener('click', closeTerminal);

  // Keyboard shortcuts: Ctrl + K to open terminal, Esc to close
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (terminalModal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    }
    if (e.key === 'Escape' && terminalModal && terminalModal.classList.contains('active')) {
      closeTerminal();
    }
  });

  // Terminal Command Logic
  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        // Append entered command
        appendTermLine(`prasanna@dev:~$ ${cmd}`, 'term-cmd');

        // Execute command
        handleCommand(cmd);

        // Scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
    });
  }

  function appendTermLine(text, className = '') {
    const div = document.createElement('div');
    div.className = `term-line ${className}`;
    div.textContent = text;
    terminalOutput.appendChild(div);
  }

  function handleCommand(cmd) {
    switch (cmd) {
      case 'help':
        appendTermLine('Available commands:', 'term-welcome');
        appendTermLine('  about      - Brief overview and objective');
        appendTermLine('  skills     - List of technical capabilities');
        appendTermLine('  projects   - Show featured projects');
        appendTermLine('  education  - Academic degree and certifications');
        appendTermLine('  leetcode   - Problem solving statistics');
        appendTermLine('  contact    - Email and phone number');
        appendTermLine('  resume     - Download PDF resume');
        appendTermLine('  clear      - Clear the terminal screen');
        break;

      case 'about':
        appendTermLine('PRASANNA R - Software Developer', 'term-success');
        appendTermLine('Aspiring Software Developer with a strong foundation in Java, Full-Stack Development (React, Node.js, PostgreSQL), and problem-solving.');
        appendTermLine('Location: Puducherry, India');
        break;

      case 'skills':
        appendTermLine('Technical Skills:', 'term-welcome');
        appendTermLine('  Languages: Java, JavaScript, Python (Basics), HTML5, CSS3');
        appendTermLine('  Frontend : React.js, Tailwind/Vanilla CSS');
        appendTermLine('  Backend  : Node.js, Express.js, PostgreSQL');
        appendTermLine('  Tools    : Git, GitHub, VS Code, Postman, Manifest V3');
        break;

      case 'projects':
        appendTermLine('Featured Projects:', 'term-welcome');
        appendTermLine('  1. Smart Trip Planner (React, Node.js, PostgreSQL, Leaflet, Google OAuth)');
        appendTermLine('  2. Music Application (HTML, CSS, JS, Audio API, Firebase)');
        appendTermLine('  3. Quick Dictionary Chrome Extension (Manifest V3, Dictionary API, Web Speech API)');
        break;

      case 'education':
      case 'journey':
        appendTermLine('Education & Experience:', 'term-welcome');
        appendTermLine('  • B.Tech CSBS @ Panimalar Engineering College (2023 - 2027) | CGPA: 8.6/10');
        appendTermLine('  • HSC XII @ Vidhya Niketan Hr Sec School (2022 - 2023) | 78.16%');
        appendTermLine('  • Web Dev Intern @ VaultofCodes (1 Month)');
        break;

      case 'leetcode':
        appendTermLine('LeetCode Statistics:', 'term-success');
        appendTermLine('  Solved: 280+ Problems');
        appendTermLine('  Breakdown: ~190 Easy | ~84 Medium | ~6 Hard');
        appendTermLine('  Profile: https://leetcode.com/Prasanna-1714');
        break;

      case 'contact':
        appendTermLine('Contact Details:', 'term-welcome');
        appendTermLine('  Email: prasannaraja17032006@gmail.com');
        appendTermLine('  Phone: +91 7010185226');
        appendTermLine('  GitHub: https://github.com/Prasanna-17-hub');
        appendTermLine('  LinkedIn: https://linkedin.com/in/prasanna-17r');
        break;

      case 'resume':
        appendTermLine('Triggering resume download...', 'term-success');
        const a = document.createElement('a');
        a.href = 'assets/Prasanna - Hexaware .pdf';
        a.download = 'PRASANNA_R_Resume.pdf';
        a.click();
        break;

      case 'clear':
        terminalOutput.innerHTML = '';
        break;

      case '':
        break;

      default:
        appendTermLine(`Command not found: "${cmd}". Type "help" for a list of available commands.`, 'term-error');
        break;
    }
  }

  // ==========================================================================
  // 🎯 4. CATEGORY FILTER TABS FOR SKILLS & PROJECTS
  // ==========================================================================
  // Skills Filter
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // Projects Filter
  const projectFilterTabs = document.querySelectorAll('.project-filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      projectFilterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-project-filter');
      projectCards.forEach((card) => {
        const category = card.getAttribute('data-project-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // ==========================================================================
  // 📋 5. COPY TO CLIPBOARD & TOAST NOTIFICATIONS
  // ==========================================================================
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toastContainer = document.getElementById('toast-container');

  const showToast = (message) => {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: #10b981; font-size: 1.2rem;"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  };

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast(`Failed to copy.`);
        });
      }
    });
  });

  // ==========================================================================
  // 🧭 6. NAVBAR SCROLL EFFECT
  // ==========================================================================
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflowY = isExpanded ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.classList.remove('active');
    }
    if (navMenu) navMenu.classList.remove('open');
    document.body.style.overflowY = 'auto';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  // ==========================================================================
  // 🌟 7. INTERSECTION OBSERVER: FADE-IN ANIMATIONS
  // ==========================================================================
  const fadeInUpElements = document.querySelectorAll('.fade-in-up');
  const fadeInUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active', 'animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeInUpElements.forEach((el) => fadeInUpObserver.observe(el));

  // Intersection Observer for Skills Progress Animation
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated', 'active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-card').forEach((card) => skillsObserver.observe(card));

  // Metric Count-Up Animation
  const metricCard = document.querySelector('[data-metric-card]');
  const metricNumbers = document.querySelectorAll('.metric-number');
  let hasAnimatedMetrics = false;

  const animateMetrics = () => {
    metricNumbers.forEach((num) => {
      const target = parseInt(num.getAttribute('data-target'), 10);
      const duration = 1500;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(easeProgress * target);
        num.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          num.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimatedMetrics) {
        animateMetrics();
        hasAnimatedMetrics = true;
      }
    });
  }, { threshold: 0.3 });

  if (metricCard) metricObserver.observe(metricCard);

  // Spotlight Mouse Effect
  const spotlightCards = document.querySelectorAll('.skill-card, .project-card');
  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ==========================================================================
  // 📊 8. LIVE LEETCODE INTEGRATION & UI SYNC
  // ==========================================================================
  const updateLeetcodeUI = (data) => {
    const total = data.totalSolved || 280;
    const easy = data.easySolved || 190;
    const medium = data.mediumSolved || 84;
    const hard = data.hardSolved || 6;

    localStorage.setItem('leetcode_data', JSON.stringify({
      totalSolved: total,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard
    }));

    const leetcodeMetrics = [
      Array.from(document.querySelectorAll('.stat-box')).find((box) => box.querySelector('.stat-label')?.textContent.includes('LeetCode'))?.querySelector('.metric-number'),
      document.querySelector('.metric-number-wrapper .metric-number')
    ].filter(Boolean);

    leetcodeMetrics.forEach((el) => {
      el.setAttribute('data-target', total);
      if (hasAnimatedMetrics) {
        el.textContent = total;
      }
    });

    const easyPct = total > 0 ? (easy / total) * 100 : 0;
    const mediumPct = total > 0 ? (medium / total) * 100 : 0;
    const hardPct = total > 0 ? (hard / total) * 100 : 0;

    const segEasy = document.querySelector('.segment-easy');
    const segMedium = document.querySelector('.segment-medium');
    const segHard = document.querySelector('.segment-hard');

    if (segEasy) { segEasy.style.width = `${easyPct}%`; segEasy.setAttribute('title', `Easy: ${easy} solved`); }
    if (segMedium) { segMedium.style.width = `${mediumPct}%`; segMedium.setAttribute('title', `Medium: ${medium} solved`); }
    if (segHard) { segHard.style.width = `${hardPct}%`; segHard.setAttribute('title', `Hard: ${hard} solved`); }

    const lblEasy = document.querySelector('.lbl-easy');
    const lblMedium = document.querySelector('.lbl-medium');
    const lblHard = document.querySelector('.lbl-hard');

    if (lblEasy) lblEasy.innerHTML = `<span class="dot-green"></span> Easy: ${easy}`;
    if (lblMedium) lblMedium.innerHTML = `<span class="dot-yellow"></span> Medium: ${medium}`;
    if (lblHard) lblHard.innerHTML = `<span class="dot-red"></span> Hard: ${hard}`;
  };

  const cachedLeetcode = localStorage.getItem('leetcode_data');
  if (cachedLeetcode) {
    try {
      updateLeetcodeUI(JSON.parse(cachedLeetcode));
    } catch (err) {
      console.warn('Error reading LeetCode cache:', err);
    }
  }

  leetcodePromise.then((data) => {
    if (data) updateLeetcodeUI(data);
  });
});
