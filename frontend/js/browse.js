/* ─── Browse Page JS ──────────────────────────────────────── */

/* Category pill filter */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      document.querySelectorAll('#grid-container .recipe-card').forEach(card => {
        const cat = card.dataset.category;
        card.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
      });
    });
  });

  /* Search */
  const recipeSearch = document.getElementById('recipe-search');
  if (recipeSearch) {
    recipeSearch.addEventListener('input', function() {
      const q = this.value.toLowerCase();
      document.querySelectorAll('#grid-container .recipe-card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  /* Pagination buttons */
  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.textContent === '← Prev' || this.textContent === 'Next →' || this.textContent === '…') return;
      document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

/* View toggle */
function setView(view) {
  const grid = document.getElementById('grid-container');
  const list = document.getElementById('list-container');
  const gridBtn = document.getElementById('grid-view-btn');
  const listBtn = document.getElementById('list-view-btn');
  if (!grid || !list || !gridBtn || !listBtn) return;

  if (view === 'grid') {
    grid.style.display = 'grid';
    list.style.display = 'none';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  } else {
    grid.style.display = 'none';
    list.style.display = 'block';
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');
  }
}

/* Difficulty filter */
function filterDiff(btn) {
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  showToast('Filter applied: ' + btn.textContent, 'success');
}

function handleAuth(e) {
  e.preventDefault();
  closeModal('auth-modal');
  showToast('Welcome back! 👋', 'success');
}
