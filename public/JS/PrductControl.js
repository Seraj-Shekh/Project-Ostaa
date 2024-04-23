document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch(`/products`);
        const products = await response.json();
        const productsContainer = document.getElementById('product-row');
        productsContainer.innerHTML = generateProductCards(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
function generateProductCards(products) {
    const cardTemplate = document.getElementById('product-card-template');
    const container = document.createElement('div');

    products.forEach(product => {
        const cardClone = cardTemplate.content.cloneNode(true);
        const card = cardClone.querySelector('.card');
        card.querySelector('.card-img-top').src = product.image_url;
        card.querySelector('.card-img-top').alt = product.name;
        card.querySelector('.card-title').textContent = product.name;

        // Convert price to number before checking its type
        const price = parseFloat(product.price);
        const formattedPrice = isNaN(price) ? 'Price not available' : `$${price.toFixed(2)}`;
        card.querySelector('.card-text').textContent = formattedPrice;

        container.appendChild(cardClone);
    });

    return container.innerHTML;
}

