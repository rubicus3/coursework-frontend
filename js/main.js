document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector(".loading-screen");

    // loadingScreen.style.opacity = "0";

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
console.log(menuBtn);

function onMenuClick() {
    isMenuOpened = !isMenuOpened;

    if (isMenuOpened) {
        document.getElementsByTagName("html")[0].style.overflow = "hidden";

        mobileHeaderOverlay.style.display = "block";
        menuBtn.src = closeSrc;
    } else {
        document.getElementsByTagName("html")[0].style.overflow = "visible";

        mobileHeaderOverlay.style.display = "none";
        menuBtn.src = menuSrc;
    }
}
