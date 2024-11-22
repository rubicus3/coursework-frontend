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
