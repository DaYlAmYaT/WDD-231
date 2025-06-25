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

async function add_items() {
    const products = await fetch_data()
    const list_container = document.querySelector("#list-container")
    products.forEach(product => {
        list_container.innerHTML += `<a class="product" href="product-details.html?id=${product.id}">${product.name}</a>`
    });
}

add_items();

