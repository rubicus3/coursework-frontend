var enableLoadingOverlay = false;

document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector(".loading-screen");

    if (!enableLoadingOverlay) {
        loadingScreen.style.display = "none";
        loadingScreen.style.opacity = "0";
        document.getElementsByTagName("html")[0].style.overflow = "visible";
    } else {
        loadingScreen.style.display = "block";
        loadingScreen.style.opacity = "1";
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
    }

    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        document.getElementsByTagName("html")[0].style.overflow = "visible";
        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 500);
    }, 5000);
});

// script.js
document.addEventListener("scroll", function () {
    const parallaxContainer = document.querySelector(".overflow-container");
    const parallaxContent = document.querySelector("#text1");
    const scrollPosition = window.scrollY;
    const containerOffsetTop = parallaxContainer.offsetTop;
    const containerHeight = parallaxContainer.offsetHeight;

    if (scrollPosition >= containerOffsetTop && scrollPosition <= containerOffsetTop + containerHeight) {
        const parallaxSpeed = 0.5; // Скорость параллакса
        const parallaxOffset = (scrollPosition - containerOffsetTop) * parallaxSpeed;
        parallaxContent.style.transform = translateY(`${parallaxOffset}px`);
    }
});
