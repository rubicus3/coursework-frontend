document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector(".loading-screen");

    loadingScreen.style.opacity = "0";

    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        document.getElementsByTagName("html")[0].style.overflow = "visible";
        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 500);
    }, 5000);
});

var closeSrc = "../assets/close.svg";
var menuSrc = "../assets/menu.svg";

var isMenuOpened = false;

var menuBtn = document.getElementById("menu-btn");
var mobileHeaderOverlay = document.getElementById("mobile-header-overlay");
menuBtn.addEventListener("onclick", onMenuClick);

document.addEventListener("keydown", (event) => {
    if ((event.key = "Escape")) hideMobileOverlay();
});

function onMenuClick() {
    if (!isMenuOpened) showMobileOverlay();
    else hideMobileOverlay();
}

function showMobileOverlay() {
    isMenuOpened = true;

    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    mobileHeaderOverlay.style.display = "block";
    menuBtn.src = closeSrc;
}

function hideMobileOverlay() {
    isMenuOpened = false;

    document.getElementsByTagName("html")[0].style.overflow = "visible";
    mobileHeaderOverlay.style.display = "none";
    menuBtn.src = menuSrc;
}

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
