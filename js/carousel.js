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
        src: "../assets/history-scroll/Aristotle.jpg",
        header: "Первооткрыватель",
        text: "Аристотель был первым известным ученым, который использовал различные теории и факты наблюдений для использования последовательной, структурированной космологической теории комет. Он считал, что кометы были атмосферными явлениями, из-за того, что они могли появляться вне зодиака и менять яркость в течение нескольких дней. Кометная теория Аристотеля возникла из его наблюдений и космологической теории, согласно которой все в космосе организовано в определенной конфигурации.",
        overlay:
            "Римская копия (в мраморе) греческого бронзового бюста Аристотеля работы Лисиппа (ок. 330 г. до н. э.) с современной алебастровой мантией.",
        subtext: "Аристо́тель (384–322 до н.э.) - древнегреческий философ и учёный-энциклопедист",
    },
    {
        src: "../assets/history-scroll/Giotto-Star-of-Bethlehem.jpg",
        header: "Отпечаток",
        text: "В 1301 году итальянский художник Джотто был первым человеком, который точно и анатомически изобразил комету. В своей работе «Поклонение волхвов» Джотто изобразил комету Галлея вместо Вифлеемской звезды, и это изображение не имело себе равных по точности вплоть до XIX века и уступило место только изобретению фотографии.",
        overlay: "«Поклонение волхвов» флорентийского художника Джотто ди Бондоне (1267–1337).",
        subtext:
            "Вифлеемская звезда изображена в виде кометы над ребенком. Джотто был свидетелем появления кометы Галлея в 1301 году.",
    },

    {
        src: "../assets/history-scroll/Nuremberg_chronicles_f_254r_1_comet.jpg",
        header: "Измерения",
        text: "Грубые попытки измерения параллакса кометы Галлея были предприняты в 1456 году, но оказались ошибочными. ​​Региомонтан был первым, кто попытался вычислить суточный параллакс, наблюдая за Большой кометой 1472 года. Его предсказания были не очень точными, но они были сделаны в надежде оценить расстояние кометы от Земли.",
        overlay: "Комета «C/1471 Y1» 1472 года, изображенная в Нюрнбергской хронике (1493)",
        subtext:
            "Великая комета 1472 год (C/1471 Y1)  мимо Земли 22 января 1472 года, ближе, чем любая другая великая комета в современную эпоху.",
    },

    {
        src: "../assets/history-scroll/1577.png",
        header: "16-й век",
        text: "В XVI веке Тихо Браге и Михаэль Мейстлин продемонстрировали, что кометы должны существовать вне атмосферы Земли, измерив параллакс Большой кометы 1577 года. В пределах точности измерений это означало, что комета должна быть по крайней мере в четыре раза дальше, чем от Земли до Луны. Основываясь на наблюдениях в 1664 году, Джованни Борелли записал долготы и широты комет, которые он наблюдал, и предположил, что кометные орбиты могут быть параболическими. Несмотря на то, что он был опытным астрономом, в своей книге 1623 года «Пробирщик» Галилео Галилей отверг теории Браге о параллаксе комет и заявил, что они могут быть просто оптической иллюзией, несмотря на небольшое количество личных наблюдений. В 1625 году ученик Мейстлина Иоганн Кеплер подтвердил, что точка зрения Браге на кометный параллакс была правильной. Кроме того, в 1682 году математик Якоб Бернулли опубликовал трактат о кометах.",

        overlay: "Гравюра Иржи Дашицкого.",
        subtext:
            "Великая комета 1577 года (C/1577 V1) — непериодическая комета, которая прошла близко к Земле. Первое наблюдение было возможно в Перу 1 ноября 1577 года.",
    },
];

// Swipe detection

container.addEventListener("touchstart", startTouch, false);
container.addEventListener("touchmove", moveTouch, false);
var initialX = null;
function startTouch(e) {
    initialX = e.touches[0].clientX;
}
function moveTouch(e) {
    if (initialX === null) {
        return;
    }

    var currentX = e.touches[0].clientX;
    var diffX = initialX - currentX;

    if (Math.abs(diffX) > 5) {
        if (diffX > 0) {
            slideRight();
        } else {
            slideLeft();
        }
    }

    initialX = null;
    e.preventDefault();
}
