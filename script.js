// Supabase client is assumed to be included in HTML via UMD script
// const supabase = supabase.createClient(...);

if (!window.supabase) {
  alert("Supabase is not loaded. Make sure supabase.js is included before script.js");
}

// Generic function to handle any contact form
function handleContactForm(formSelector, tableName, selectSelector, selectColumnName) {
  const form = document.querySelector(formSelector);
  if (!form) return; // skip if form doesn't exist on the page

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullNameEl = form.querySelector('[placeholder*="full name"]');
    const emailEl = form.querySelector('input[type="email"]');
    const companyEl = form.querySelector('[placeholder*="company"]');
    const messageEl = form.querySelector('textarea');

    if (!fullNameEl || !emailEl || !companyEl || !messageEl) {
      alert("Form fields not found");
      return;
    }

    const fullName = fullNameEl.value;
    const email = emailEl.value;
    const company = companyEl.value;
    const message = messageEl.value;

    let selectValue = null;
    if (selectSelector) {
      const selectEl = form.querySelector(selectSelector);
      if (selectEl) selectValue = selectEl.value;
    }

    const payload = { full_name: fullName, email, company, message };
    if (selectColumnName && selectValue !== null) {
      payload[selectColumnName] = selectValue;
    }

    const { data, error } = await supabase
      .from(tableName)
      .insert([payload]);

    if (error) {
      alert("Submission failed: " + error.message);
    } else {
      alert("Your inquiry was submitted successfully!");
      form.reset();
    }
  });
}

// Call handlers for both forms on page load
document.addEventListener("DOMContentLoaded", () => {
  handleContactForm("#investorForm", "investor_inquiries", "#interest-select", "interest");
  handleContactForm("#goldContactForm", "gold_inquiries", "#weight-select", "weight");
});

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