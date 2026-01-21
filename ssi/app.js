const loader = document.getElementById("loader");
const site = document.getElementById("site");
const loadingText = document.getElementById("loading-text");

const messages = [
  "Initializing SS:I systems...",
  "Establishing secure connection...",
  "Decrypting archives...",
  "Loading case database...",
  "Access granted."
];

let index = 0;

const interval = setInterval(() => {
  if (index < messages.length) {
    loadingText.textContent = messages[index];
    index++;
  } else {
    clearInterval(interval);
    loader.style.display = "none";
    site.classList.remove("hidden");
  }
}, 900);
