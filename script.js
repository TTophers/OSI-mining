const supabaseUrl = "https://jwqruidvfgueeybhmimp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cXJ1aWR2Zmd1ZWV5YmhtaW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MjY1MjQsImV4cCI6MjA3ODIwMjUyNH0.IyunbSQVYaRfCnGqTCLTp4hubZNZG-xVsK3D5gun04M"; // anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

if (!window.supabase) {
  alert("Supabase is not loaded. Make sure supabase.js is included before script.js");
}

// Generic function to handle any contact form
function handleContactForm(formSelector, tableName, selectMappings = {}) {
  const form = document.querySelector(formSelector);
  if (!form) return; // skip if form doesn't exist

  form.addEventListener('submit', async (e) => {
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

    const payload = { full_name: fullName, email, company, message };

    // Handle all select fields dynamically
    for (const [columnName, selector] of Object.entries(selectMappings)) {
      const selectEl = form.querySelector(selector);
      if (selectEl) payload[columnName] = selectEl.value;
    }

    const { data, error } = await supabase.from(tableName).insert([payload]);
    if (error) {
      alert("Submission failed: " + error.message);
    } else {
      alert("Your inquiry was submitted successfully!");
      form.reset();
    }
  });
}

// Attach handlers for both forms on page load
document.addEventListener('DOMContentLoaded', () => {
  handleContactForm('#investorForm', 'investor_inquiries', { interest: '#interest-select' });
  handleContactForm('#goldContactForm', 'gold_inquiries', { weight: '#weight-select' });
});

// Mobile menu toggle functionality
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const button = document.querySelector('nav button i');
  menu.classList.toggle('hidden');
  const isOpen = !menu.classList.contains('hidden');
  button.dataset.feather = isOpen ? 'x' : 'menu';
  feather.replace();
}

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