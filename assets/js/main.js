document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Theme Toggle (Dark/Light)
     ========================================================================== */
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Check for saved theme preference or OS preference
  const savedTheme = localStorage.getItem('lumina_theme') || localStorage.getItem('campusly_theme');
  
  // Set initial theme (Dark is default for immersive light exhibit)
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcons('light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcons('dark');
  }
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('lumina_theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
  
  function updateThemeIcons(theme) {
    themeToggles.forEach(toggle => {
      const icon = toggle.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'ph ph-sun';
        } else {
          icon.className = 'ph ph-moon';
        }
      }
    });
  }

  /* ==========================================================================
     RTL Toggle
     ========================================================================== */
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const htmlTag = document.documentElement;
  
  // Check saved RTL state
  const savedRTL = localStorage.getItem('campusly_rtl');
  if (savedRTL === 'true') {
    htmlTag.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl');
  }
  
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isRTL = htmlTag.getAttribute('dir') === 'rtl';
      if (isRTL) {
        htmlTag.removeAttribute('dir');
        document.body.classList.remove('rtl');
        localStorage.setItem('campusly_rtl', 'false');
      } else {
        htmlTag.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl');
        localStorage.setItem('campusly_rtl', 'true');
      }
    });
  });

  /* ==========================================================================
     Mobile Navigation Drawer
     ========================================================================== */
  const hamburger = document.querySelector('.hamburger');
  const navDrawer = document.querySelector('.nav-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');
  
  function openDrawer() {
    if (navDrawer) navDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  
  function closeDrawer() {
    if (navDrawer) navDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  /* ==========================================================================
     Form Validation
     ========================================================================== */
  const forms = document.querySelectorAll('.validate-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        // Reset state
        input.classList.remove('error', 'success');
        const container = input.closest('.password-input-wrap') || input;
        const errorMsg = container.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('form-error-msg')) {
          errorMsg.style.display = 'none';
        }
        
        // Validation logic
        if (!input.value.trim()) {
          showError(input, 'This field is required');
          isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          showError(input, 'Please enter a valid email');
          isValid = false;
        } else if (input.type === 'password' && input.value.length < 8) {
          showError(input, 'Password must be at least 8 characters');
          isValid = false;
        } else if (input.name === 'confirm_password') {
          const pwd = form.querySelector('input[name="password"]');
          if (pwd && input.value !== pwd.value) {
            showError(input, 'Passwords do not match');
            isValid = false;
          }
        } else if (input.type === 'checkbox' && !input.checked) {
          showError(input, 'You must accept the terms');
          isValid = false;
        } else {
          input.classList.add('success');
        }
      });
      
      if (isValid) {
        // Show success state (mocking submission)
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Success!';
        btn.style.backgroundColor = 'var(--success)';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
          form.reset();
          inputs.forEach(i => i.classList.remove('success'));
        }, 3000);
      }
    });
  });
  
  function showError(input, message) {
    input.classList.add('error');
    const container = input.closest('.password-input-wrap') || input;
    const errorMsg = container.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('form-error-msg')) {
      errorMsg.textContent = message;
      errorMsg.style.display = 'block';
    } else {
      // Create error msg if it doesn't exist
      const msg = document.createElement('span');
      msg.className = 'form-error-msg';
      msg.textContent = message;
      msg.style.display = 'block';
      container.parentNode.insertBefore(msg, container.nextSibling);
    }
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /* ==========================================================================
     Password Visibility Toggle
     ========================================================================== */
  const passwordToggles = document.querySelectorAll('.password-toggle');
  passwordToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const wrap = btn.closest('.password-input-wrap');
      if (!wrap) return;
      const input = wrap.querySelector('input');
      if (!input) return;
      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isPassword ? 'ph ph-eye-slash' : 'ph ph-eye';
      }
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  });

  /* ==========================================================================
     Back To Top Button
     ========================================================================== */
  function initBackToTop() {
    let btn = document.getElementById('back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'back-to-top';
      btn.className = 'back-to-top';
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', 'Back to top');
      btn.setAttribute('title', 'Back to top');
      btn.innerHTML = '<i class="ph-bold ph-arrow-up"></i>';
      document.body.appendChild(btn);
    }

    let ticking = false;
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(toggleVisible);
        ticking = true;
      }
    }, { passive: true });

    toggleVisible();

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  initBackToTop();

});

/* ==========================================================================
   Premium UI layer: scroll reveal, sticky nav, counters, interactive modules
   ========================================================================== */
(function () {
  'use strict';

  // Flag JS availability so CSS can switch fade-ups to scroll-triggered reveals
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.animate-fade-up');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Navbar scroll state ---------- */
  function initNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    var ticking = false;
    function apply() {
      navbar.classList.toggle('scrolled', window.scrollY > 24);
      ticking = false;
    }
    apply();
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(apply);
      }
    }, { passive: true });
  }

  /* ---------- Animated stat counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute('data-count-to'));
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

      if (reduceMotion) {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
        return;
      }

      var duration = 1500;
      var start = null;

      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(run);
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          run(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { obs.observe(el); });
  }

  onReady(function () {
    initReveal();
    initNavbar();
    initCounters();
  });
})();

/* ==========================================================================
   Interactive: Admissions Readiness Scorecard (index.html)
   ========================================================================== */
(function () {
  'use strict';

  function init() {
    var root = document.getElementById('scorecard');
    if (!root) return;

    var dial = root.querySelector('.dial-value');
    var numberEl = root.querySelector('.dial-number');
    var tierEl = root.querySelector('.score-tier');
    var noteEl = root.querySelector('.score-note');
    var resetBtn = root.querySelector('.quiz-reset');
    var steps = Array.prototype.slice.call(root.querySelectorAll('.quiz-step'));

    var CIRC = 2 * Math.PI * 82; // r = 82 in the markup
    if (dial) {
      dial.setAttribute('stroke-dasharray', CIRC);
      dial.setAttribute('stroke-dashoffset', CIRC);
    }

    var tiers = [
      {
        min: 0,
        label: 'Select your preferences',
        note: 'Select your sensory preferences to curate your custom exhibit route and ideal timeslot.'
      },
      {
        min: 1,
        label: 'Ambient Contemplative',
        note: 'You thrive in serene, meditative light environments. We recommend spending extra time in the Bioluminescent Flora Canopy and booking a Morning Calm or Twilight slot.'
      },
      {
        min: 45,
        label: 'Dynamic Harmony',
        note: 'You enjoy balanced rhythmic light, optical illusions, and spatial depth. Recommended route: Chromatic Infinity Chamber and Afternoon Radiance slot.'
      },
      {
        min: 65,
        label: 'Full Sensory Explorer',
        note: 'You love interactive projection mapping, spatial acoustics, and motion-reactive light. Recommended: The Kinetic Laser Symphony & Sunset Illumination pass.'
      },
      {
        min: 82,
        label: 'Hyper-Sensory Transcendence',
        note: 'You seek maximum sensory immersion, high-frequency laser matrices, and resonant sub-bass sound baths. Recommended: After-Dark Neon Immersion with VIP Lounge access.'
      }
    ];

    function tierFor(score) {
      var chosen = tiers[0];
      tiers.forEach(function (t) { if (score >= t.min) chosen = t; });
      return chosen;
    }

    function readScore() {
      var total = 0;
      var answered = 0;
      var breakdown = {};

      steps.forEach(function (step) {
        var selected = step.querySelector('.chip.selected');
        var key = step.getAttribute('data-metric');
        var weight = parseFloat(step.getAttribute('data-weight') || '20');
        if (selected) {
          answered++;
          var v = parseFloat(selected.getAttribute('data-value')); // 0..1
          total += v * weight;
          breakdown[key] = v;
        } else {
          breakdown[key] = 0;
        }
      });

      return { score: Math.round(total), answered: answered, breakdown: breakdown };
    }

    function render() {
      var result = readScore();
      var score = result.score;

      if (dial) {
        dial.setAttribute('stroke-dashoffset', CIRC - (CIRC * score) / 100);
      }

      if (numberEl) {
        var from = parseInt(numberEl.textContent, 10) || 0;
        animateNumber(numberEl, from, score);
      }

      var tier = result.answered === 0 ? tiers[0] : tierFor(score);
      if (tierEl) tierEl.textContent = tier.label;
      if (noteEl) noteEl.textContent = tier.note;

      // Sub-metric bars
      root.querySelectorAll('[data-bar]').forEach(function (bar) {
        var key = bar.getAttribute('data-bar');
        var pct = Math.round((result.breakdown[key] || 0) * 100);
        var fill = bar.querySelector('i');
        var label = bar.querySelector('[data-bar-value]');
        if (fill) fill.style.width = pct + '%';
        if (label) label.textContent = pct + '%';
      });
    }

    function animateNumber(el, from, to) {
      var duration = 600;
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(from + (to - from) * eased);
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }

    root.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var row = chip.closest('.chip-row');
        if (row) {
          row.querySelectorAll('.chip').forEach(function (c) {
            c.classList.remove('selected');
            c.setAttribute('aria-pressed', 'false');
          });
        }
        chip.classList.add('selected');
        chip.setAttribute('aria-pressed', 'true');
        render();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        root.querySelectorAll('.chip').forEach(function (c) {
          c.classList.remove('selected');
          c.setAttribute('aria-pressed', 'false');
        });
        render();
      });
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ==========================================================================
   Interactive: Application Timeline Explorer (home2.html)
   ========================================================================== */
(function () {
  'use strict';

  var PHASES = [
    {
      id: 'vestibule',
      tab: 'Phase 01',
      tag: 'Phase 01 - Lumina Vestibule',
      title: 'Decompress from the outside world into pure darkness',
      copy: 'Step into the acoustic threshold where ambient city sound dissolves. Your eyes calibrate to subtle optical wavelengths as warm, floating photon particles guide your first steps.',
      items: [
        ['Dark adaptation', 'Allow your vision to adjust across the twilight transition chamber.'],
        ['Spatial acoustics', 'Binaural sub-bass tones lower your heart rate to a meditative rhythm.'],
        ['Sensory wristband', 'Synched RFID beacon activates reactive installations as you approach.']
      ],
      stat: ['0 Hz – 20 kHz', 'full-spectrum binaural soundscape']
    },
    {
      id: 'prismatic',
      tab: 'Phase 02',
      tag: 'Phase 02 - Chromatic Infinity',
      title: 'Endless mirrored horizons and bending light waves',
      copy: 'Walk upon suspended glass bridges inside an infinite mirrored void where 120,000 individually addressable suspended LEDs mirror constellations across infinite space.',
      items: [
        ['Infinity geometry', 'Two-way architectural mirrors creating endless spatial depth.'],
        ['Color refraction', 'Dichroic prism filters splitting white lasers into pure hues.'],
        ['Visitor reflection', 'Your silhouette becomes an integrated beacon within the matrix.']
      ],
      stat: ['120,000', 'suspended volumetric LED light points']
    },
    {
      id: 'lasers',
      tab: 'Phase 03',
      tag: 'Phase 03 - Kinetic Laser Symphony',
      title: 'Architectural lasers choreographed to 3D spatial acoustics',
      copy: 'High-precision solid-state lasers sculpt luminous geometric planes and tunnels of light through atmospheric mist, pulsing in tight synchrony with orchestral electronic synthesis.',
      items: [
        ['Solid-state optics', 'Diffraction optics forming palpable architectural planes of light.'],
        ['Spatial audio sync', '64-channel beam-formed acoustic arrays pulse with light bursts.'],
        ['Dynamic haze', 'Pharmaceutical-grade organic haze capturing razor-sharp rays.']
      ],
      stat: ['64 Channels', 'of beam-forming spatial acoustics']
    },
    {
      id: 'canopy',
      tab: 'Phase 04',
      tag: 'Phase 04 - Bioluminescent Canopy',
      title: 'An organic ecosystem of reactive fiber-optic flora',
      copy: 'Wander beneath a towering 20-foot botanical canopy that reacts to human touch, body heat, and footsteps. Glowing vines pulse with bioluminescent phosphorescence.',
      items: [
        ['Haptic responsiveness', 'Fiber-optic fronds gently shift hue when brushed by visitors.'],
        ['Thermodynamic sensors', 'Infrared vision arrays trace group presence into organic ripples.'],
        ['Botanical aromatics', 'Subtle cedar, night-blooming jasmine, and ozone mist infusion.']
      ],
      stat: ['450,000+', 'strands of reactive optical fiber']
    },
    {
      id: 'lounge',
      tab: 'Phase 05',
      tag: 'Phase 05 - The Reflection Lounge',
      title: 'Reintegrate your senses over sensory tea & ambient projection',
      copy: 'Conclude your journey in our meditative lounge. Savor chromatic herbal elixirs, explore the digital exhibition guide, and view high-resolution capture stills of your passage.',
      items: [
        ['Elixir bar', 'Botanical drinks formulated for sensory grounding and hydration.'],
        ['Digital exhibition guide', 'Download artist interviews and your personalized light portrait.'],
        ['Artist editions', 'Limited-run prism prints and catalog in the Lumina boutique.']
      ],
      stat: ['99.4%', 'visitor satisfaction & awe rating']
    }
  ];

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function init() {
    var root = document.getElementById('timeline-explorer');
    if (!root) return;

    var tabsWrap = root.querySelector('.tl-tabs');
    var panel = root.querySelector('.tl-panel');
    var progress = root.querySelector('.tl-progress i');
    if (!tabsWrap || !panel) return;

    // Build tabs
    PHASES.forEach(function (phase, i) {
      var btn = document.createElement('button');
      btn.className = 'tl-tab' + (i === 0 ? ' active' : '');
      btn.textContent = phase.tab;
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.addEventListener('click', function () { select(i); });
      tabsWrap.appendChild(btn);
    });

    function select(index) {
      var phase = PHASES[index];

      tabsWrap.querySelectorAll('.tl-tab').forEach(function (t, i) {
        t.classList.toggle('active', i === index);
        t.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      if (progress) {
        progress.style.width = ((index + 1) / PHASES.length) * 100 + '%';
      }

      var itemsHtml = phase.items.map(function (item) {
        return '<div class="tl-item">' +
          '<i class="ph-fill ph-check-circle mark"></i>' +
          '<p><strong>' + esc(item[0]) + '</strong>' + esc(item[1]) + '</p>' +
          '</div>';
      }).join('');

      panel.innerHTML =
        '<div>' +
          '<span class="tl-phase-tag">' + esc(phase.tag) + '</span>' +
          '<h3>' + esc(phase.title) + '</h3>' +
          '<p style="color: var(--text-muted);">' + esc(phase.copy) + '</p>' +
          '<div class="stat-item" style="text-align: start; padding: 0; margin-top: var(--spacing-4);">' +
            '<div class="stat-value" style="font-size: 2.4rem;"><bdi dir="ltr">' + esc(phase.stat[0]) + '</bdi></div>' +
            '<div class="stat-label" style="letter-spacing: 0.06em;">' + esc(phase.stat[1]) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="tl-list">' + itemsHtml + '</div>';

      panel.classList.remove('swap');
      void panel.offsetWidth; // restart the entrance animation
      panel.classList.add('swap');
    }

    select(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ==========================================================================
   Interactive: FAQ Accordion (contact.html)
   ========================================================================== */
(function () {
  'use strict';

  function init() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    function close(item) {
      var panel = item.querySelector('.faq-a');
      var btn = item.querySelector('.faq-q');
      if (!panel || !item.classList.contains('open')) return;
      panel.style.height = panel.scrollHeight + 'px';
      void panel.offsetHeight; // lock the current height before collapsing
      panel.style.height = '0px';
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }

    function open(item) {
      var panel = item.querySelector('.faq-a');
      var btn = item.querySelector('.faq-q');
      if (!panel) return;
      panel.style.height = panel.scrollHeight + 'px';
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }

    items.forEach(function (item) {
      var btn = item.querySelector('.faq-q');
      var panel = item.querySelector('.faq-a');
      if (!btn || !panel) return;

      // Let an open panel grow with its content once the transition settles.
      panel.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'height' && item.classList.contains('open')) {
          panel.style.height = 'auto';
        }
      });

      btn.addEventListener('click', function () {
        if (item.classList.contains('open')) {
          close(item);
          return;
        }
        items.forEach(close); // one answer open at a time
        open(item);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
