var currentPage = 0;

async function getCollection(page = 1) {
    let media_type = "image";
    let keywords;
    if (page % 2 == 0) {
        keywords = "asteroid";
    } else {
        keywords = "comet";
    }
    let page_size = 5;

    let response = await fetch(
        `https://images-api.nasa.gov/search?keywords=${keywords}&media_type=${media_type}&page_size=${page_size}&page=${page}`
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
