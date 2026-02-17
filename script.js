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

// ---- Floating Particles (Canvas) ----
(function() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    const PARTICLE_COUNT = 55;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 2.2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.35;
            this.speedY = (Math.random() - 0.5) * 0.35;
            this.opacity = Math.random() * 0.5 + 0.15;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.015 + 0.005;
            // Color: teal or purple randomly
            this.color = Math.random() > 0.5 ? '34,211,197' : '129,140,248';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += this.pulseSpeed;
            if (this.x < -10 || this.x > w + 10 || this.y < -10 || this.y > h + 10) this.reset();
        }
        draw() {
            const glow = Math.sin(this.pulse) * 0.3 + 0.7;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.opacity * glow})`;
            ctx.fill();
            // Subtle glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.opacity * glow * 0.08})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    // Draw connection lines between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(34,211,197,${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }
    animate();
})();

// ---- Radial Glow on Cards (mouse tracking) ----
document.querySelectorAll('.ts-card, .hobby-card, .blog-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
});

// ---- Magnetic Hover on Buttons ----
document.querySelectorAll('.btn-primary, .btn-ghost, .hire-badge').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * 0.15;
        const dy = (e.clientY - cy) * 0.15;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ---- Tilt Effect on Code Window ----
(function() {
    const codeWindow = document.querySelector('.code-window');
    if (!codeWindow) return;
    codeWindow.addEventListener('mousemove', e => {
        const r = codeWindow.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        codeWindow.style.transform = `perspective(800px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg)`;
    });
    codeWindow.addEventListener('mouseleave', () => {
        codeWindow.style.transform = '';
    });
    codeWindow.style.transition = 'transform .4s ease';
})();

// ---- Parallax on Scroll for Orbs ----
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelectorAll('.orb').forEach((orb, i) => {
        const speed = (i + 1) * 0.03;
        orb.style.transform += ''; // Let CSS animation handle it, just adjust top offset
    });
});

// ---- Staggered reveal for Tech Stack & Hobby grids ----
const ioGridNew = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const children = e.target.querySelectorAll('.ts-card, .hobby-card');
            children.forEach((child, i) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = `all .5s cubic-bezier(.16,1,.3,1) ${i * 0.06}s`;
                requestAnimationFrame(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                });
            });
            ioGridNew.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.ts-grid, .hobby-grid').forEach(g => ioGridNew.observe(g));

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
