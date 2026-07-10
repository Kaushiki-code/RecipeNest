let activeTab = 'signin';

function switchTab(tab) {
  activeTab = tab;
  const signupFields = document.getElementById('signup-fields');
  const tabSignin = document.getElementById('tab-signin');
  const tabSignup = document.getElementById('tab-signup');
  if (!signupFields || !tabSignin || !tabSignup) return;

  if (tab === 'signup'){
    signupFields.style.display = 'block';
    tabSignup.classList.add('auth-tab-active');
    tabSignup.classList.remove('auth-tab-inactive');
    tabSignin.classList.remove('auth-tab-active');
    tabSignin.classList.add('auth-tab-inactive');
  } 
  else {
    signupFields.style.display = 'none';
    tabSignin.classList.add('auth-tab-active');
    tabSignin.classList.remove('auth-tab-inactive');
    tabSignup.classList.remove('auth-tab-active');
    tabSignup.classList.add('auth-tab-inactive');
  }
}

function handleAuth(e) {
  e.preventDefault();
  closeModal('auth-modal');
  showToast(activeTab === 'signin' ? 'Welcome back! 👋' : 'Account created! Welcome to RecipeNest 🎉', 'success');
  setTimeout(() => { window.location.href = 'profile.html'; }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  const featuredSave = document.getElementById('featured-save');
  if (featuredSave) {
    featuredSave.addEventListener('click', function() {
      const saved = this.dataset.saved === 'true';
      this.dataset.saved = (!saved).toString();
      this.textContent = saved ? '♡ Save' : '♥ Saved';
      showToast(saved ? 'Removed from collection' : 'Saved to your collection', saved ? 'default' : 'success');
    });
  }
});
