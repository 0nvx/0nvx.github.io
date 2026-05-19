/* ============================================================
   main.js — All site-wide interactivity
   - Theme toggle (dark / light)
   - Navbar scroll effect + active link highlighting
   - Mobile hamburger menu
   - Count-up stat animation (IntersectionObserver)
   - Scroll-triggered fade-in animations
   - Contact link brand-colour hover effects
   - Smooth scroll to #contact section
   ============================================================ */

/* ── Wait for DOM ── */
document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     THEME — dark / light toggle
     Persists choice in localStorage; applies .dark to <html>
     ============================================================ */
  const THEME_KEY = "0nvx-theme";

  function getTheme() {
    return localStorage.getItem(THEME_KEY) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }

  /* Apply saved theme immediately */
  applyTheme(getTheme());

  /* Wire up all theme toggle buttons on the page */
  document.querySelectorAll(".btn-theme-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
      applyTheme(next);
    });
  });


  /* ============================================================
     NAVBAR — scroll shadow + active link underline
     ============================================================ */
  const navbar = document.getElementById("navbar");

  if (navbar) {
    /* Scroll shadow effect */
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); /* run once on load */

    /* Highlight the current page's nav link */
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(link => {
      const href = link.getAttribute("href").replace(/\/$/, "") || "/";
      /* Match exact path or prefix for sub-pages */
      const isActive =
        href === currentPath ||
        (href !== "/" && currentPath.startsWith(href));
      link.classList.toggle("active", isActive);
    });
  }


  /* ============================================================
     MOBILE MENU — hamburger open / close
     ============================================================ */
  const btnHamburger  = document.getElementById("btn-hamburger");
  const mobileMenu    = document.getElementById("mobile-menu");
  const iconMenuOpen  = document.getElementById("icon-menu-open");
  const iconMenuClose = document.getElementById("icon-menu-close");

  if (btnHamburger && mobileMenu) {
    btnHamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      if (iconMenuOpen)  iconMenuOpen.style.display  = isOpen ? "none"   : "block";
      if (iconMenuClose) iconMenuClose.style.display = isOpen ? "block"  : "none";
    });

    /* Close menu when a link is tapped */
    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        if (iconMenuOpen)  iconMenuOpen.style.display  = "block";
        if (iconMenuClose) iconMenuClose.style.display = "none";
      });
    });
  }


  /* ============================================================
     COUNT-UP ANIMATION
     Animates a number from 0 → target when the element scrolls into view.
     Targets: elements with data-countup="<number>"
     ============================================================ */
  function animateCount(el, target, duration = 1400) {
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.countup, 10);
        animateCount(el, target);
        countObserver.unobserve(el); /* only once */
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll("[data-countup]").forEach(el => {
    el.textContent = "0";
    countObserver.observe(el);
  });


  /* ============================================================
     SCROLL-TRIGGERED FADE-IN
     Adds .visible to .fade-in-up elements when they enter viewport
     ============================================================ */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in-up").forEach(el => fadeObserver.observe(el));


  /* ============================================================
     CONTACT LINKS — brand colour hover effects
     GitHub  → #24292e (dark charcoal)
     LinkedIn → #0A66C2 (LinkedIn blue)
     Discord  → #5865F2 (Discord purple)
     ============================================================ */
  document.querySelectorAll(".contact-link").forEach(link => {
    const bg     = link.dataset.hoverBg;
    const border = link.dataset.hoverBorder || bg;
    const icon   = link.querySelector(".contact-link-icon");
    const label  = link.querySelector(".contact-link-label");

    if (!bg || !icon) return;

    link.addEventListener("mouseenter", () => {
      icon.style.backgroundColor = bg;
      icon.style.borderColor     = border;
      icon.style.color           = "#ffffff";
      icon.style.boxShadow       = `0 0 16px ${bg}88`;
      if (label) label.style.color = bg;
      link.style.color = bg;
    });

    link.addEventListener("mouseleave", () => {
      icon.style.backgroundColor = "";
      icon.style.borderColor     = "";
      icon.style.color           = "";
      icon.style.boxShadow       = "";
      if (label) label.style.color = "";
      link.style.color = "";
    });
  });


  /* ============================================================
     SMOOTH SCROLL to #contact
     Used by the "Get in Touch" CTA button on the homepage
     ============================================================ */
  document.querySelectorAll("[data-scroll-to]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(btn.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });


  /* ============================================================
     PAGE ENTER ANIMATION
     Adds .page-enter to main on every page load for the fade-in effect
     ============================================================ */
  const mainEl = document.querySelector("main");
  if (mainEl) {
    mainEl.classList.add("page-enter");
  }

});
