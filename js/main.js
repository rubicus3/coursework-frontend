document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector(".loading-screen");
    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => (loadingScreen.style.display = "none"), 4000);
    }, 5000);
});