/* ─── RecipeNest — shared utilities ───────────────────────── */

/* Toast notifications */
function showToast(msg, type = 'default') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${msg}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

/* Bookmark / save toggle */
function initBookmarks() {
  document.querySelectorAll('.recipe-card__bookmark').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('saved');
      const saved = btn.classList.contains('saved');
      btn.innerHTML = saved ? '♥' : '♡';
      showToast(saved ? 'Saved to your collection' : 'Removed from collection', saved ? 'success' : 'default');
    });
  });
}

/* Scroll fade-in observer */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* Active nav link highlight */
function initNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
}

/* Star rating interactive */
function initStarRating(containerId, onRate) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const labels = container.querySelectorAll('label');
  const inputs = container.querySelectorAll('input');
  labels.forEach((lbl, i) => {
    lbl.addEventListener('click', () => {
      const val = inputs[inputs.length - 1 - i].value;
      if (onRate) onRate(Number(val));
    });
  });
}

/* Search filter for recipe grids */
function initSearch(inputId, cardSelector) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll(cardSelector).forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

/* Category filter pills */
function initCategoryFilter(pillsSelector, cardSelector, attr) {
  document.querySelectorAll(pillsSelector).forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll(pillsSelector).forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter || 'all';
      document.querySelectorAll(cardSelector).forEach(card => {
        const val = card.dataset[attr] || '';
        card.style.display = (filter === 'all' || val === filter) ? '' : 'none';
      });
    });
  });
}

/* Modal helpers */
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* Init everything on page load */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFadeIn();
  initBookmarks();

  /* Close modals on overlay click */
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });
});
