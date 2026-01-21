// INTRO LOADER
window.onload = () => {
  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("site").classList.remove("hidden");
  }, 2000);
};

// LOGIN MODAL
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("loginModal");

loginBtn.onclick = () => {
  modal.classList.remove("hidden");
};

function closeLogin() {
  modal.classList.add("hidden");
}
