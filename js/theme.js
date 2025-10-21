// Theme Toggle
const toggleBtn = document.createElement("button");
toggleBtn.className = "theme-toggle";
toggleBtn.innerHTML = "🌙";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.innerHTML = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load user preference
window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.innerHTML = "☀️";
  }
});
