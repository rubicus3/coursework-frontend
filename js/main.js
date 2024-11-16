document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.style.opacity = "0";
    
    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        document.getElementsByTagName("html")[0].style.overflow = "visible";
    }, 5000);
});