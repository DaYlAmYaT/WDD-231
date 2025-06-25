// let products = {};

async function fetch_data() {
    try {
        const response = await fetch("dental.json");

        if (!response.ok) {
            throw new Error('Not ok');
        }

        const products = await response.json();
        return products;

    } catch (error) {
        console.error("Error:", error);
    }
}

function getParam(param) {
    const paramString = window.location.search;
    const params = new URLSearchParams(paramString);
    return params.get(param);
}

function renderDetail(product) {
    const h3 = document.querySelector('h3')
    h3.innerText = product.name
    const detail = document.querySelector('#product-detail')
    detail.innerHTML += `<img src="${product.imageURL}" alt="${product.name}">`
    detail.innerHTML += `<p>${product.description}</p>`
}

async function add_item() {
    const products = await fetch_data()

    const id = getParam("id");
    if (id) {
        const product = products.find((p) => p.id == id);
        if (product) {
            renderDetail(product)
        }
    }
}

add_item();

document.getElementById("sign-up").addEventListener("click", () => {
    document.querySelector(".modal-container").classList.add("hide");
    document.querySelector(".modal-container").setAttribute("aria-hidden", "true");
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelector(".modal-container").classList.add("hide");
        document.querySelector(".modal-container").setAttribute("aria-hidden", "true");
    }
})

document.querySelector(".modal-container").addEventListener("click", () => {
    document.querySelector(".modal-container").classList.add("hide");
    document.querySelector(".modal-container").setAttribute("aria-hidden", "true");
})

