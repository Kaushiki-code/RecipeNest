/* ─── Recipe Detail Page JS ─────────────────────────────────── */

let servings = 4;
const baseServings = 4;

function changeServings(delta) {
  servings = Math.max(1, Math.min(12, servings + delta));
  const servingsCount = document.getElementById('servings-count');
  if (servingsCount) servingsCount.textContent = servings;
  
  document.querySelectorAll('.ingredient-amount').forEach(el => {
    const base = parseFloat(el.dataset.base);
    const scaled = (base / baseServings) * servings;
    el.textContent = scaled % 1 === 0 ? scaled : scaled.toFixed(1);
  });
}

function toggleIngredient(li) {
  const cb = li.querySelector('input[type="checkbox"]');
  if (cb) {
    cb.checked = !cb.checked;
    li.classList.toggle('checked', cb.checked);
  }
}

function toggleSave(btn) {
  const saved = btn.dataset.saved === 'true';
  btn.dataset.saved = (!saved).toString();
  btn.textContent = saved ? '♡ Save recipe' : '♥ Saved';
  showToast(saved ? 'Removed from collection' : 'Saved to your collection!', saved ? 'default' : 'success');
}

function shareRecipe() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard!', 'success');
  }
}

function printRecipe() {
  window.print();
}

function submitComment() {
  const textInput = document.getElementById('comment-input');
  if (!textInput) return;
  const text = textInput.value.trim();
  const ratingEl = document.querySelector('.star-rating input:checked');
  if (!text) {
    showToast('Please write a comment first', 'error');
    return;
  }
  const stars = ratingEl ? '★'.repeat(ratingEl.value) + '☆'.repeat(5 - ratingEl.value) : '★★★★★';
  const list = document.getElementById('comments-list');
  if (!list) return;

  const comment = document.createElement('div');
  comment.className = 'comment';
  comment.innerHTML = `
    <div class="avatar avatar--md" style="background:var(--rust);color:white;">Y</div>
    <div class="comment__body">
      <div class="comment__header">
        <span class="comment__name">You</span>
        <span class="comment__date">Just now</span>
      </div>
      <div style="color:#F59E0B;font-size:0.9rem;margin-bottom:6px;">${stars}</div>
      <p class="comment__text">${text}</p>
    </div>
  `;
  list.prepend(comment);
  textInput.value = '';
  if (ratingEl) ratingEl.checked = false;
  showToast('Review posted! Thank you 🎉', 'success');
}

document.addEventListener('DOMContentLoaded', () => {
  // Prevent checkbox clicks from double triggering because of the li.onclick event
  document.querySelectorAll('.ingredient-item input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('click', (e) => {
      e.stopPropagation();
      cb.parentElement.classList.toggle('checked', cb.checked);
    });
  });
});
