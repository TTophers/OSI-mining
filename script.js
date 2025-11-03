function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const button = document.querySelector('nav button i');

  // Toggle visibility
  menu.classList.toggle('hidden');

  // Animate icon (menu ↔ x)
  const isOpen = !menu.classList.contains('hidden');
  button.dataset.feather = isOpen ? 'x' : 'menu';
  feather.replace(); // refresh icon
}

// Optional: close the menu when clicking outside it
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobile-menu');
  const button = document.querySelector('nav button');

  if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !button.contains(e.target)) {
    menu.classList.add('hidden');
    const icon = button.querySelector('i');
    icon.dataset.feather = 'menu';
    feather.replace();
  }
});