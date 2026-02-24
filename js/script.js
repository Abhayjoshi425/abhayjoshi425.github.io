/* Abhay Joshi Portfolio – script.js */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll + active link ── */
  const navbar = document.getElementById('navbar');
  const btt = document.getElementById('btt');
  const links = document.querySelectorAll('.navbar-nav .nav-link');
  const secs = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    btt.classList.toggle('visible', y > 380);
    let cur = '';
    secs.forEach(s => { if (y >= s.offsetTop - 90) cur = s.id; });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${cur}`);
    });
  }, { passive: true });

  /* ── Back to top ── */
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Mobile nav auto-close ── */
  const nc = document.getElementById('navbarNav');
  links.forEach(l => l.addEventListener('click', () => {
    if (nc.classList.contains('show'))
      bootstrap.Collapse.getInstance(nc)?.hide();
  }));

  /* ── Typing animation ── */
  const el = document.getElementById('typingText');
  const txts = ['.NET Developer', 'ASP.NET Core MVC Developer', 'SQL Server Developer', 'C# Developer'];
  let ti = 0, ci = 0, del = false;

  (function type() {
    const cur = txts[ti];
    el.textContent = del ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
    del ? ci-- : ci++;
    let wait = del ? 48 : 88;
    if (!del && ci === cur.length) { del = true; wait = 1800; }
    if (del && ci === 0) { del = false; ti = (ti + 1) % txts.length; wait = 300; }
    setTimeout(type, wait);
  })();

  /* ── Scroll reveal ── */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  /* ── Skill bars (trigger once on enter) ── */
  let fired = false;
  const so = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !fired) {
      fired = true;
      document.querySelectorAll('.fill').forEach(f => {
        f.style.width = f.dataset.w + '%';
      });
    }
  }, { threshold: 0.2 });
  const skillSec = document.getElementById('skills');
  if (skillSec) so.observe(skillSec);

  /* ── EmailJS init ── */
  emailjs.init({ publicKey: 'zDPBIlZZYPqp_q2zM' });

  /* ── Contact form (EmailJS) ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending…';
      btn.disabled = true;

      const templateParams = {
        to_email: 'joshiabhay425@gmail.com',
        from_name: form.querySelector('[name="name"]').value.trim(),
        from_email: form.querySelector('[name="email"]').value.trim(),
        phone: form.querySelector('[name="phone"]').value.trim() || 'Not provided',
        regarding: form.querySelector('[name="regarding"]').value.trim() || 'General Inquiry',
        message: form.querySelector('[name="message"]').value.trim(),
      };

      emailjs.send('service_6m4m166', 'template_1dkzx6a', templateParams)
        .then(() => {
          btn.innerHTML = '<i class="fas fa-check me-2"></i>Sent! I\'ll get back to you soon.';
          btn.style.background = 'linear-gradient(135deg,#22c55e,#06b6d4)';
          form.reset();
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        })
        .catch((err) => {
          console.error('EmailJS Error:', JSON.stringify(err));
          btn.innerHTML = '<i class="fas fa-times me-2"></i>Failed – please email me directly.';
          btn.style.background = 'linear-gradient(135deg,#ef4444,#f97316)';
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        });
    });
  }

});
