var currentPage = 0;

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
async function getCollection(page = 1) {
    let response = await fetch(
        `https://images-api.nasa.gov/search?keywords=asteroid,comet&media_type=image&page_size=5&page=${page}`
    );
    json = await response.json();

    return json.collection;
}

async function createCard(title, description, src) {
    let template = `
    <div class="card">
        <img src="${src}" class="card-img" />
        <div class="card-content">
            <h1>${title}</h1>
            <p>${description}</p>
        </div>
    </div>
    `;
    return new DOMParser().parseFromString(template, "text/html").body.firstChild;
}
function checkImage(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function () {
        status = request.status;
        if (request.status == 200) {
            //if(statusText == OK)
            return true;
        } else {
            return false;
        }
    };
}

async function loadPage() {
    currentPage += 1;

    console.log("hello");

    let collection = await getCollection(currentPage);
    console.log(await collection);

    collection.items.forEach(async (element) => {
        let response = await fetch(element.href);
        let json = await response.json();
        let source = json[0];

        let description = element.data[0].description;
        let title = element.data[0].title;
        // if (description.length > 100) {
        //     description = description.slice(0, 97) + "...";
        // }
        let card = await createCard(title, description, source);

        document.getElementById("section-gallery").appendChild(card);
    });
}

async function initializeGallery() {
    currentPage = 5;
    loadPage();
}

addEventListener("DOMContentLoaded", initializeGallery);

setTimeout(() => {
    window.onscroll = function (ev) {
        if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight) {
            loadPage();
        }
    };
}, 2000);
