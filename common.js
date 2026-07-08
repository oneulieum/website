// ── 내비게이션: 스크롤 시 화이트 전환 ──
const nav = document.querySelector('.nav');
function onScroll() {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 모바일 메뉴 토글
document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-menu')?.classList.toggle('open');
  nav?.classList.add('scrolled'); // 메뉴 열릴 때 배경 확보
});

// ── 스크롤 리빌 (형제 요소 자동 스태거) ──
document.querySelectorAll('.reveal').forEach((el) => {
  const parent = el.parentElement;
  const siblings = parent ? [...parent.children].filter((c) => c.classList?.contains('reveal')) : [el];
  el.style.setProperty('--stagger', siblings.indexOf(el) % 6);
});
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ── 숫자 카운트업 ──
const cio = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1600;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = Math.round(target * eased).toLocaleString() + '<em>' + suffix + '</em>';
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: 0.4 });
document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));
