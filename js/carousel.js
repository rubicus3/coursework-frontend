const repeat = false;
const noArrows = false;
const noBullets = false;

const container = document.querySelector(".slider-container");
const content = document.querySelector(".slider-content");
const infoBox = document.querySelector("#info-list");

var slide;
var slideTotal;
var slideCurrent;

function createSilde(src, overlay, subtext) {
    let s = `
    <div class="slider-single">
        <div class="slider-single-image">
            <div class="overlay-container">
                <img src="${src}" />
                <div class="overlay">
                    <span>
                        ${overlay}
                    </span>
                </div>
            </div>
        </div>
        <h1 class="slider-single-title">${subtext}</h1>
    </div>`;

    return new DOMParser().parseFromString(s, "text/html").body.firstChild;
}

function initSliders() {
    data.forEach((element) => {
        s = createSilde(element.src, element.overlay, element.subtext);
        content.appendChild(createSilde(element.src, element.overlay, element.subtext));
    });

    slide = document.querySelectorAll(".slider-single");
    slideTotal = slide.length - 1;
    slideCurrent = -1;
}

function initBullets() {
    if (noBullets) {
        return;
    }
    const bulletContainer = document.createElement("div");
    bulletContainer.classList.add("bullet-container");
    slide.forEach((elem, i) => {
        const bullet = document.createElement("div");
        bullet.classList.add("bullet");
        bullet.id = `bullet-index-${i}`;
        bullet.addEventListener("click", () => {
            goToIndexSlide(i);
        });
        bulletContainer.appendChild(bullet);
        elem.classList.add("proactivede");
    });
    container.appendChild(bulletContainer);
}

function initArrows() {
    if (noArrows) {
        return;
    }
    const leftArrow = document.createElement("a");
    const iLeft = document.createElement("i");
    iLeft.classList.add("fa");
    iLeft.classList.add("fa-arrow-left");
    iLeft.innerHTML += "←";
    leftArrow.classList.add("slider-left");
    leftArrow.appendChild(iLeft);
    leftArrow.addEventListener("click", () => {
        slideLeft();
    });
    const rightArrow = document.createElement("a");
    const iRight = document.createElement("i");
    iRight.classList.add("fa");
    iRight.classList.add("fa-arrow-right");
    rightArrow.classList.add("slider-right");
    rightArrow.appendChild(iRight);
    rightArrow.addEventListener("click", () => {
        slideRight();
    });
    iRight.innerHTML += "→";
    container.appendChild(leftArrow);
    container.appendChild(rightArrow);
}

function slideInitial() {
    initSliders();
    initBullets();
    initArrows();
    setTimeout(function () {
        slideRight();
    }, 500);
}

function updateBullet() {
    if (!noBullets) {
        document
            .querySelector(".bullet-container")
            .querySelectorAll(".bullet")
            .forEach((elem, i) => {
                elem.classList.remove("active");
                if (i === slideCurrent) {
                    elem.classList.add("active");
                }
            });
    }
    checkRepeat();
}

function checkRepeat() {
    if (!repeat) {
        if (slideCurrent === slide.length - 1) {
            slide[0].classList.add("not-visible");
            slide[slide.length - 1].classList.remove("not-visible");
            if (!noArrows) {
                document.querySelector(".slider-right").classList.add("not-visible");
                document.querySelector(".slider-left").classList.remove("not-visible");
            }
        } else if (slideCurrent === 0) {
            slide[slide.length - 1].classList.add("not-visible");
            slide[0].classList.remove("not-visible");
            if (!noArrows) {
                document.querySelector(".slider-left").classList.add("not-visible");
                document.querySelector(".slider-right").classList.remove("not-visible");
            }
        } else {
            slide[slide.length - 1].classList.remove("not-visible");
            slide[0].classList.remove("not-visible");
            if (!noArrows) {
                document.querySelector(".slider-left").classList.remove("not-visible");
                document.querySelector(".slider-right").classList.remove("not-visible");
            }
        }
    }
    updateInfo();
}

function slideRight() {
    if (slideCurrent < slideTotal) {
        slideCurrent++;
    } else {
        slideCurrent = 0;
    }

    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } else {
        var preactiveSlide = slide[slideTotal];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } else {
        var proactiveSlide = slide[0];
    }

    slide.forEach((elem) => {
        var thisSlide = elem;
        if (thisSlide.classList.contains("preactivede")) {
            thisSlide.classList.remove("preactivede");
            thisSlide.classList.remove("preactive");
            thisSlide.classList.remove("active");
            thisSlide.classList.remove("proactive");
            thisSlide.classList.add("proactivede");
        }
        if (thisSlide.classList.contains("preactive")) {
            thisSlide.classList.remove("preactive");
            thisSlide.classList.remove("active");
            thisSlide.classList.remove("proactive");
            thisSlide.classList.remove("proactivede");
            thisSlide.classList.add("preactivede");
        }
    });
    preactiveSlide.classList.remove("preactivede");
    preactiveSlide.classList.remove("active");
    preactiveSlide.classList.remove("proactive");
    preactiveSlide.classList.remove("proactivede");
    preactiveSlide.classList.add("preactive");

    activeSlide.classList.remove("preactivede");
    activeSlide.classList.remove("preactive");
    activeSlide.classList.remove("proactive");
    activeSlide.classList.remove("proactivede");
    activeSlide.classList.add("active");

    proactiveSlide.classList.remove("preactivede");
    proactiveSlide.classList.remove("preactive");
    proactiveSlide.classList.remove("active");
    proactiveSlide.classList.remove("proactivede");
    proactiveSlide.classList.add("proactive");

    updateBullet();
}

function slideLeft() {
    if (slideCurrent > 0) {
        slideCurrent--;
    } else {
        slideCurrent = slideTotal;
    }

    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } else {
        var proactiveSlide = slide[0];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } else {
        var preactiveSlide = slide[slideTotal];
    }
    slide.forEach((elem) => {
        var thisSlide = elem;
        if (thisSlide.classList.contains("proactive")) {
            thisSlide.classList.remove("preactivede");
            thisSlide.classList.remove("preactive");
            thisSlide.classList.remove("active");
            thisSlide.classList.remove("proactive");
            thisSlide.classList.add("proactivede");
        }
        if (thisSlide.classList.contains("proactivede")) {
            thisSlide.classList.remove("preactive");
            thisSlide.classList.remove("active");
            thisSlide.classList.remove("proactive");
            thisSlide.classList.remove("proactivede");
            thisSlide.classList.add("preactivede");
        }
    });

    preactiveSlide.classList.remove("preactivede");
    preactiveSlide.classList.remove("active");
    preactiveSlide.classList.remove("proactive");
    preactiveSlide.classList.remove("proactivede");
    preactiveSlide.classList.add("preactive");

    activeSlide.classList.remove("preactivede");
    activeSlide.classList.remove("preactive");
    activeSlide.classList.remove("proactive");
    activeSlide.classList.remove("proactivede");
    activeSlide.classList.add("active");

    proactiveSlide.classList.remove("preactivede");
    proactiveSlide.classList.remove("preactive");
    proactiveSlide.classList.remove("active");
    proactiveSlide.classList.remove("proactivede");
    proactiveSlide.classList.add("proactive");

    updateBullet();
}

function goToIndexSlide(index) {
    const sliding = slideCurrent > index ? () => slideRight() : () => slideLeft();
    while (slideCurrent !== index) {
        sliding();
    }
}

function updateInfo() {
    info = data[slideCurrent];

    if (info) {
        let h1 = infoBox.getElementsByTagName("h1")[0];
        let p = infoBox.getElementsByTagName("p")[0];

        h1.animate(fadeInAnimation, fadeAnimationOptions);
        p.animate(fadeInAnimation, fadeAnimationOptions);

        h1.innerHTML = info.header;
        p.innerHTML = info.text;

        h1.animate(fadeOutAnimation, fadeAnimationOptions);
        p.animate(fadeOutAnimation, fadeAnimationOptions);
    }
}
addEventListener("DOMContentLoaded", (event) => slideInitial());

const fadeInAnimation = [{ opacity: 1 }, { opacity: 0 }];
const fadeOutAnimation = [{ opacity: 0 }, { opacity: 1 }];
const fadeAnimationOptions = { duration: 500, iterations: 1 };

const data = [
    {
        src: "../assets/Aristotle.jpg",
        header: "Первооткрыватель",
        text: "Аристотель был первым известным ученым, который использовал различные теории и факты наблюдений для использования последовательной, структурированной космологической теории комет. Он считал, что кометы были атмосферными явлениями, из-за того, что они могли появляться вне зодиака и менять яркость в течение нескольких дней. Кометная теория Аристотеля возникла из его наблюдений и космологической теории, согласно которой все в космосе организовано в определенной конфигурации.",
        overlay:
            "Римская копия (в мраморе) греческого бронзового бюста Аристотеля работы Лисиппа (ок. 330 г. до н. э.) с современной алебастровой мантией.",
        subtext: "Аристо́тель (384–322 до н.э.) - древнегреческий философ и учёный-энциклопедист",
    },
    {
        src: "../assets/Giotto-Star-of-Bethlehem.jpg",
        header: "Отпечаток",
        text: "В 1301 году итальянский художник Джотто был первым человеком, который точно и анатомически изобразил комету. В своей работе «Поклонение волхвов» Джотто изобразил комету Галлея вместо Вифлеемской звезды, и это изображение не имело себе равных по точности вплоть до XIX века и уступило место только изобретению фотографии.",
        overlay: "«Поклонение волхвов» флорентийского художника Джотто ди Бондоне (1267–1337).",
        subtext:
            "Вифлеемская звезда изображена в виде кометы над ребенком. Джотто был свидетелем появления кометы Галлея в 1301 году.",
    },

    {
        src: "../assets/Asteroid.jpeg",
        header: "Первооткрыватель",
        text: "Аристотель (384–322 до н.э.) был первым известным ученым, который использовал различные теории и факты наблюдений для использования последовательной, структурированной космологической теории комет. Он считал, что кометы были атмосферными явлениями",
        overlay: "",
        subtext: "",
    },
];
