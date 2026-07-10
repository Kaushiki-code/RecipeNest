/* ─── Create Recipe Page JS ─────────────────────────────────── */

/* ── Photo preview ── */
function previewPhoto(input) {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    const previewImg = document.getElementById('preview-img');
    const placeholder = document.getElementById('upload-placeholder');
    const previewContainer = document.getElementById('photo-preview');
    const dotPhoto = document.getElementById('dot-photo');

    if (previewImg) previewImg.src = e.target.result;
    if (placeholder) placeholder.style.display = 'none';
    if (previewContainer) previewContainer.style.display = 'block';
    if (dotPhoto) dotPhoto.classList.add('done');
  };
  reader.readAsDataURL(input.files[0]);
}

function removePhoto(e) {
  e.stopPropagation();
  const previewImg = document.getElementById('preview-img');
  const placeholder = document.getElementById('upload-placeholder');
  const previewContainer = document.getElementById('photo-preview');
  const coverPhoto = document.getElementById('cover-photo');
  const dotPhoto = document.getElementById('dot-photo');

  if (previewImg) previewImg.src = '';
  if (placeholder) placeholder.style.display = 'block';
  if (previewContainer) previewContainer.style.display = 'none';
  if (coverPhoto) coverPhoto.value = '';
  if (dotPhoto) dotPhoto.classList.remove('done');
}

/* ── Progress tracker ── */
function updateProgress() {
  const titleInput = document.getElementById('recipe-title');
  const descInput = document.getElementById('recipe-desc');
  const catInput = document.getElementById('recipe-category');
  const dotTitle = document.getElementById('dot-title');
  const dotCategory = document.getElementById('dot-category');

  if (!titleInput || !descInput || !catInput) return;

  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  const cat = catInput.value;

  if (dotTitle) dotTitle.classList.toggle('done', title.length > 2 && desc.length > 5);
  if (dotCategory) dotCategory.classList.toggle('done', cat !== '');
}

/* ── Add ingredient ── */
function addIngredient() {
  const rows = document.getElementById('ingredient-rows');
  if (!rows) return;
  const row = document.createElement('div');
  row.className = 'ingredient-row';
  row.innerHTML = `
    <input type="text" class="form-input" placeholder="Amount" style="text-align:center;" />
    <input type="text" class="form-input" placeholder="Ingredient name" />
    <button type="button" class="remove-btn" onclick="removeRow(this, '#ingredient-rows .ingredient-row')">−</button>
  `;
  rows.appendChild(row);
  row.querySelector('input').focus();
  const dotIngredients = document.getElementById('dot-ingredients');
  if (dotIngredients) dotIngredients.classList.add('done');
}

/* ── Add step ── */
function addStep() {
  const rows = document.getElementById('step-rows');
  if (!rows) return;
  const num = rows.querySelectorAll('.step-row').length + 1;
  const row = document.createElement('div');
  row.className = 'step-row';
  row.innerHTML = `
    <div class="step-num-badge">${num}</div>
    <textarea class="form-textarea" placeholder="Describe this step…" style="min-height:80px;"></textarea>
    <button type="button" class="remove-btn" style="margin-top:10px;" onclick="removeRow(this, '#step-rows .step-row');renumberSteps()">−</button>
  `;
  rows.appendChild(row);
  row.querySelector('textarea').focus();
  const dotSteps = document.getElementById('dot-steps');
  if (dotSteps) dotSteps.classList.add('done');
}

/* ── Remove row ── */
function removeRow(btn, selector) {
  const allRows = document.querySelectorAll(selector);
  if (allRows.length <= 1) {
    showToast('You need at least one row', 'error');
    return;
  }
  const rowElement = btn.closest(selector.split(' ').pop());
  if (rowElement) rowElement.remove();
}

/* ── Renumber steps ── */
function renumberSteps() {
  document.querySelectorAll('#step-rows .step-num-badge').forEach((badge, i) => {
    badge.textContent = i + 1;
  });
}

/* ── Tag input ── */
function handleTagKey(e) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    const val = e.target.value.trim().replace(/,$/, '');
    if (!val) return;
    const wrap = document.getElementById('tag-wrap');
    if (!wrap) return;
    const chip = document.createElement('div');
    chip.className = 'tag-chip';
    chip.innerHTML = `<span>${val}</span><button type="button" onclick="this.parentElement.remove()">✕</button>`;
    wrap.insertBefore(chip, e.target);
    e.target.value = '';
  }
}

/* ── Save draft ── */
function saveDraft() {
  showToast('Draft saved!', 'success');
}

/* ── Publish ── */
function publishRecipe(e) {
  if (e) e.preventDefault();
  const titleInput = document.getElementById('recipe-title');
  const descInput = document.getElementById('recipe-desc');
  if (!titleInput || !descInput) return;

  const title = titleInput.value.trim();
  if (!title) {
    showToast('Please add a recipe title', 'error');
    titleInput.focus();
    return;
  }
  const desc = descInput.value.trim();
  if (!desc) {
    showToast('Please add a description', 'error');
    return;
  }
  showToast('Recipe published! 🎉', 'success');
  setTimeout(() => { window.location.href = 'recipe.html'; }, 1200);
}

document.addEventListener('DOMContentLoaded', () => {
  /* ── Title counter ── */
  const titleInput = document.getElementById('recipe-title');
  if (titleInput) {
    titleInput.addEventListener('input', function() {
      const countEl = document.getElementById('title-count');
      if (countEl) countEl.textContent = this.value.length;
    });
  }
});
