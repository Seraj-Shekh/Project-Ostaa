// Sample product data for different categories
const toolsFurnitureProducts = [
    { name: 'product 1', price: 100, image: 'img/blue bag.jpg' },
    { name: 'Product 2', price: 150, image: 'img/blue bag.jpg'},
    { name: 'Product 3', price: 200, image: 'img/blue bag.jpg' },
    { name: 'Product 4', price: 250, image: 'img/blue bag.jpg' },
    { name: 'Product 4', price: 250, image: 'img/blue bag.jpg' },
    { name: 'Product 4', price: 250, image: 'img/blue bag.jpg' },
    { name: 'Product 4', price: 250, image: 'img/blue bag.jpg' },
    { name: 'Product 4', price: 250, image: 'img/blue bag.jpg' },
    // Add more products as needed
];

const studentsMaterialsProducts = [
    { name: 'Product 5', price: 300, image: 'img/blue bag.jpg' },
    { name: 'Product 6', price: 350, image: 'img/blue bag.jpg' },
    { name: 'Product 7', price: 400, image: 'img/blue bag.jpg' },
    { name: 'Product 8', price: 450, image: 'img/blue bag.jpg' },
    // Add more products as needed
];

const clothesAccessoriesProducts = [
    { name: 'Product 9', price: 200, image: 'img/blue bag.jpg' },
    { name: 'Product 10', price: 250, image: 'img/blue bag.jpg' },
    { name: 'Product 11', price: 300, image: 'img/blue bag.jpg' },
    { name: 'Product 12', price: 350, image: 'img/blue bag.jpg' },
    // Add more products as needed
];

const electronicsProducts = [
    { name: 'Product 13', price: 400, image: 'img/blue bag.jpg' },
    { name: 'Product 14', price: 450, image: 'img/blue bag.jpg' },
    { name: 'Product 15', price: 500, image: 'img/blue bag.jpg' },
    { name: 'Product 16', price: 550, image: 'img/blue bag.jpg' },
    // Add more products as needed
];

// Function to generate product card HTML
function generateProductCard(product) {
    return `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">$${product.price.toFixed(2)}</p>
                <!-- Add custom class to the button -->
                <button class="btn btn-primary ">Add to Cart</button>
                <button class="btn btn-outline-primary add-to-wishlist"><i class="fa-solid fa-heart"></i></button>
            </div>
        </div>
    `;
}


// Function to render initial products for a category
function renderInitialProducts(categoryProducts, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = categoryProducts.slice(0, 4).map(product => generateProductCard(product)).join('');
}

// Render initial products for different categories
renderInitialProducts(toolsFurnitureProducts, 'tools-furniture-products');
renderInitialProducts(studentsMaterialsProducts, 'students-materials-products');
renderInitialProducts(clothesAccessoriesProducts, 'clothes-accessories-products');
renderInitialProducts(electronicsProducts, 'electronics-products');

// Function to toggle visibility of additional products
function toggleProductsVisibility(containerId, showMoreButtonId, allProducts) {
    const container = document.getElementById(containerId);
    const showMoreButton = document.getElementById(showMoreButtonId);
    const initialProducts = allProducts.slice(0, 4); // Initial products to show

    // Function to render products based on visibility
    function renderProducts(visible) {
        container.innerHTML = (visible ? allProducts : initialProducts).map(product => generateProductCard(product)).join('');
        showMoreButton.textContent = visible ? 'Show Less' : 'Show More';
    }

    // Show more button event listener
    showMoreButton.addEventListener('click', function() {
        const isShowingMore = showMoreButton.textContent === 'Show Less';
        renderProducts(!isShowingMore); // Toggle visibility
    });

    // Render initial products
    renderProducts(false); // Initially, show only initial products
}

// Toggle visibility for different categories
toggleProductsVisibility('tools-furniture-products', 'show-more-tools-furniture', toolsFurnitureProducts);
toggleProductsVisibility('students-materials-products', 'show-more-students-materials', studentsMaterialsProducts);
toggleProductsVisibility('clothes-accessories-products', 'show-more-clothes-accessories', clothesAccessoriesProducts);
toggleProductsVisibility('electronics-products', 'show-more-electronics', electronicsProducts);
