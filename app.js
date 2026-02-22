/* ═══════════════════════════════════════════
   MADHURYA H V — PORTFOLIO JS
═══════════════════════════════════════════ */

// ── Hamburger / Mobile Nav ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navBar    = document.getElementById('navBar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navBar.classList.toggle('open');
});

navBar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navBar.classList.remove('open');
    });
});

document.addEventListener('click', (e) => {
    if (!navBar.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        navBar.classList.remove('open');
    }
});


// ── Project Videos — Play on Hover ───────────────────────────
const projectVideos = [
    document.getElementById('pv1'),
    document.getElementById('pv2'),
    document.getElementById('pv3'),
].filter(Boolean);

projectVideos.forEach(video => {
    const box = video.closest('.project-vidbox');
    if (!box) return;
    box.addEventListener('mouseenter', () => video.play().catch(() => {}));
    box.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
    box.addEventListener('touchstart', () => {
        video.paused ? video.play().catch(() => {}) : (video.pause(), video.currentTime = 0);
    }, { passive: true });
});


// ── Active Nav Link on Scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-bar ul li a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => { link.style.background = ''; link.style.boxShadow = ''; });
            const active = document.querySelector(`.nav-bar a[href="#${entry.target.id}"]`);
            if (active) { active.style.background = 'rgba(255,0,0,0.25)'; active.style.boxShadow = '0 0 10px rgba(255,0,0,0.4)'; }
        }
    });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));


// ── Header Shadow on Scroll ───────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20
        ? '0 0 30px rgba(255,0,0,0.5), 0 2px 0 #cc0000'
        : '0 0 20px rgba(255,0,0,0.3), 0 2px 0 #cc0000';
}, { passive: true });


// ── Scroll Reveal ─────────────────────────────────────────────
const revealElements = document.querySelectorAll('.section, .project-card, .skill-card, .achievement-card, .stat-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

const hero = document.querySelector('.hero');
if (hero) { hero.style.opacity = '1'; hero.style.transform = 'none'; }
