window.onload = () => {
  const loader = document.getElementById("loader");
  const site = document.getElementById("site");

  setTimeout(() => {
    loader.style.display = "none";
    site.classList.remove("hidden");
  }, 2500);
};