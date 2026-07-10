/* ─── Profile Page JS ───────────────────────────────────────── */

function switchTab(tabId) {
  document.querySelectorAll('.profile-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.id === `tab-${tabId}`);
  });
}

function unsaveRecipe(btn) {
  btn.classList.remove('saved');
  btn.innerHTML = '♡';
  btn.style.background = '';
  btn.style.color = '';
  showToast('Removed from collection', 'default');
}

function confirmDelete() {
  if (confirm('Delete this recipe? This cannot be undone.')) {
    showToast('Recipe deleted', 'error');
  }
}

function saveProfile() {
  showToast('Profile updated! ✓', 'success');
}
