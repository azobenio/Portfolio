/* ===========================================================
   JMS.dev — Portfolio Script
   =========================================================== */

// ---- Theme Toggle (dark/light) ----
(function() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }
})();

// ---- Cursor Stalker ----
const stalker = document.getElementById('cursorStalker');
let mx = 0, my = 0, sx = 0, sy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function loop() {
    sx += (mx - sx) * 0.07;
    sy += (my - sy) * 0.07;
    stalker.style.left = sx + 'px';
    stalker.style.top = sy + 'px';
    requestAnimationFrame(loop);
})();

// ---- Capability Card radial glow tracking ----
document.querySelectorAll('.cap-card').forEach(c => {
    c.addEventListener('mousemove', e => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
});

// ---- Header scroll ----
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- Burger / Mobile Nav ----
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ---- Scroll Reveal (Intersection Observer) ----
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.anim-scroll').forEach(el => io.observe(el));

// Staggered children inside grids
const ioGrid = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.anim-scroll').forEach((child, i) => {
                child.style.transitionDelay = `${i * 0.08}s`;
                child.classList.add('visible');
            });
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.process-row, .cap-grid, .blog-grid, .social-row').forEach(g => ioGrid.observe(g));

// ---- Animated Counters ----
function countUp(el, target) {
    let cur = 0;
    const step = target / 35;
    const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = Math.floor(cur);
    }, 40);
}
const ioStats = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.stat-num').forEach(n => countUp(n, +n.dataset.target));
            ioStats.unobserve(e.target);
        }
    });
}, { threshold: 0.35 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) ioStats.observe(statsEl);

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    });
});

// ---- Active nav link ----
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) cur = s.id; });
    navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
    });
});

// ---- Newsletter Form (Mailchimp) ----
const nlForm = document.getElementById('newsletterForm');
if (nlForm) {
    nlForm.addEventListener('submit', e => {
        const btn = nlForm.querySelector('button[type="submit"]');
        const original = btn.innerHTML;

        // If Mailchimp URL is not set, prevent submission
        if (nlForm.action.includes('YOUR_MAILCHIMP_URL')) {
            e.preventDefault();
            btn.innerHTML = '⚠ Mailchimp non configuré';
            btn.style.background = '#f59e0b';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
            return;
        }

        // Mailchimp URL is set — allow form to submit (opens in new tab)
        btn.innerHTML = '✓ Inscription réussie !';
        btn.style.background = '#14b8a6';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.disabled = false;
            nlForm.reset();
            nlForm.querySelectorAll('.nl-chip input[type="checkbox"]').forEach((cb, i) => {
                cb.checked = i < 3;
            });
        }, 3000);
    });
}

// ---- Newsletter Chip Toggle ----
document.querySelectorAll('.nl-chip').forEach(chip => {
    chip.addEventListener('click', e => {
        if (e.target.tagName !== 'INPUT') {
            const cb = chip.querySelector('input[type="checkbox"]');
            if (cb) cb.checked = !cb.checked;
        }
    });
});

// ---- Parallax deco circles ----
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelectorAll('.deco-circle').forEach((c, i) => {
        c.style.transform = `translateY(${y * (i + 1) * 0.02}px)`;
    });
});

// ---- Blog Search & Filter ----
(function() {
    const searchInput = document.getElementById('blogSearch');
    const searchCount = document.getElementById('searchCount');
    const filtersWrap = document.getElementById('blogFilters');
    const blogCards = document.querySelectorAll('.blog-card');
    const blogFeatured = document.querySelector('.blog-featured');
    let activeFilter = 'all';

    if (!searchInput || !filtersWrap) return;

    const filterBtns = filtersWrap.querySelectorAll('.filter-btn');

    function applyFilters() {
        const query = searchInput.value.toLowerCase().trim();
        let visible = 0;

        // All filterable items (featured + grid cards)
        const allItems = [];
        if (blogFeatured) allItems.push(blogFeatured);
        blogCards.forEach(c => allItems.push(c));

        allItems.forEach(card => {
            const cats = (card.dataset.cats || '').toLowerCase();
            const text = card.textContent.toLowerCase();

            const matchFilter = activeFilter === 'all' || cats.includes(activeFilter);
            const matchSearch = !query || text.includes(query);

            if (matchFilter && matchSearch) {
                card.classList.remove('hidden');
                card.style.display = '';
                visible++;
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });

        // Update count
        if (searchCount) {
            searchCount.textContent = visible + ' article' + (visible > 1 ? 's' : '');
        }
    }

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            applyFilters();
        });
    });

    // Search input
    searchInput.addEventListener('input', applyFilters);
})();

// ---- Local Time (Nantes / Europe/Paris) ----
(function() {
    const timeEl = document.getElementById('localTime');
    if (!timeEl) return;

    function updateTime() {
        const now = new Date();
        const opts = { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        timeEl.textContent = now.toLocaleTimeString('fr-FR', opts);
    }

    updateTime();
    setInterval(updateTime, 1000);
})();
