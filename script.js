// Initialize Supabase (only once)
const supabaseUrl = "https://jwqruidvfgueeybhmimp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cXJ1aWR2Zmd1ZWV5YmhtaW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MjY1MjQsImV4cCI6MjA3ODIwMjUyNH0.IyunbSQVYaRfCnGqTCLTp4hubZNZG-xVsK3D5gun04M";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Generic function to handle any contact form
function handleContactForm(formSelector, tableName, selectSelector, selectColumnName) {
  const form = document.querySelector(formSelector);
  if (!form) return; // skip if form doesn't exist on the page

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = form.querySelector('[placeholder*="full name"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const company = form.querySelector('[placeholder*="company"]').value;
    const message = form.querySelector('textarea').value;

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