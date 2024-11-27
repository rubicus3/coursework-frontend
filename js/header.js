var closeSrc = "../assets/close.svg";
var menuSrc = "../assets/menu.svg";

var isMenuOpened = false;
var isPortrait = window.matchMedia("screen and (max-width: 712px)").matches;

var menuBtn = document.getElementById("menu-btn");
var navBar = document.getElementById("nav");

menuBtn.addEventListener("onclick", onMenuClick);

document.addEventListener("keydown", (event) => {
    if ((event.key = "Escape")) if (isMenuOpened) hideMenu();
});

function onMenuClick() {
    if (!isMenuOpened) openMenu();
    else hideMenu();
}

function openMenu() {
    isMenuOpened = true;
    menuBtn.src = closeSrc;
    header.style.flexDirection = "column";

    showNavBar();
}

function hideMenu() {
    isMenuOpened = false;
    menuBtn.src = menuSrc;
    header.style.flexDirection = "row";

    hideNavBar();
}
function showNavBar() {
    navBar.style.display = "flex";
}
function hideNavBar() {
    navBar.style.display = "none";
}

window.onresize = resize;
function resize() {
    if (window.matchMedia("screen and (max-width: 712px)").matches) {
        isPortrait = true;
    } else {
        isPortrait = false;
    }

    if (!isPortrait) {
        hideMenu();
        showNavBar();
    }
    if (isPortrait) {
        if (!isMenuOpened) hideNavBar();
    }
}
