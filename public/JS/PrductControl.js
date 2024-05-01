document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartUI(); // Update cart UI including the cart notification count on page load
    updateWishlistUI(); // Update wishlist UI including the wishlist notification count on page load
});

async function fetchProducts() {
    try {
        const response = await fetch(`/products`);
        const products = await response.json();
        const productsContainer = document.getElementById('product-row');
        productsContainer.innerHTML = generateProductCards(products);

        // Add event listeners to "Add to Cart" and "Add to Wishlist" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
        addToWishlistButtons.forEach(button => {
            button.addEventListener('click', addToWishlist);
        });

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Other functions remain unchanged



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

async function addToCart(event) {
    const button = event.target;
    const card = button.parentElement.parentElement;
    const productName = card.querySelector('.card-title').textContent;
    const productPrice = card.querySelector('.card-text').textContent.replace('$', '');
    const productImageUrl = card.querySelector('.card-img-top').src;

    await addToCartToLocalStorage(productName, productPrice, productImageUrl);

    // Create a new element for the "Item added" message
    const itemAddedMessage = document.createElement('div');
    itemAddedMessage.textContent = 'Item added';
    itemAddedMessage.classList.add('item-added-animation');

    // Append the "Item added" message to the button's parent container
    button.parentElement.appendChild(itemAddedMessage);

    // Hide the "Add to Cart" button temporarily
    button.classList.add('hidden');

    // Remove the "Item added" message and show the "Add to Cart" button again after the animation ends
    itemAddedMessage.addEventListener('animationend', () => {
        itemAddedMessage.remove();
        button.classList.remove('hidden');
    });

    // Update cart UI
    updateCartUI();
}
// wishlist function
async function addToWishlist(event) {
    const button = event.target;
    const card = button.parentElement.parentElement;
    const productName = card.querySelector('.card-title').textContent;
    const productPrice = card.querySelector('.card-text').textContent.replace('$', '');
    const productImageUrl = card.querySelector('.card-img-top').src;

    addToWishlistToLocalStorage(productName, productPrice, productImageUrl);

    // Create a new element for the "Item added" message
    const itemAddedMessage = document.createElement('div');
    itemAddedMessage.textContent = 'Item added to Wishlist';
    itemAddedMessage.classList.add('item-added-animation');

    // Append the "Item added" message to the button's parent container
    button.parentElement.appendChild(itemAddedMessage);

    // Hide the "Add to Wishlist" button temporarily
    button.classList.add('hidden');

    // Remove the "Item added" message and show the "Add to Wishlist" button again after the animation ends
    itemAddedMessage.addEventListener('animationend', () => {
        itemAddedMessage.remove();
        button.classList.remove('hidden');
    });

    // Update wishlist UI
    updateWishlistUI();
}


function addToWishlistToLocalStorage(productName, productPrice, productImageUrl) {
    // Retrieve wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Add the new product to the wishlist
    wishlist.push({ name: productName, price: productPrice, imageUrl: productImageUrl });

    // Update wishlist in localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Add event listeners to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});


// Function to update the cart UI
function updateCartUI() {
    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the cart notification element
    const cartNotification = document.getElementById('cart-notification');

    // Update the cart notification count
    if (cartNotification) {
        cartNotification.textContent = cart.length.toString() || '0'; // Display the number of products in the cart or '0' if empty
    }

    // Get the cart table body element
    const cartTableBody = document.querySelector('tbody');

    // Check if the tbody element exists
    if (cartTableBody) {
        // Clear the current content of the cart table body
        cartTableBody.innerHTML = '';

        // Populate the cart table body with updated cart data
        let subtotal = 0; // Initialize subtotal
        cart.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.imageUrl}" alt="${product.name}" style="max-width: 100px;"></td>
                <td>${product.name}</td>
                <td>$${parseFloat(product.price).toFixed(2)}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart('${product.name}')">Remove</button></td>
            `;
            cartTableBody.appendChild(row);

            // Add the price of each product to the subtotal
            subtotal += parseFloat(product.price);
        });

        // Update subtotal in the order summary
        const subtotalElement = document.getElementById('subtotal');
        if (subtotalElement) {
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        }

        // Calculate total (assuming no discounts for now)
        const total = subtotal;

        // Update total in the order summary
        const totalElement = document.getElementById('total');
        if (totalElement) {
            totalElement.textContent = `$${total.toFixed(2)}`;
        }
    }
}
// function to update wishlist UI
function updateWishlistUI() {
    // Retrieve wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Get the wishlist notification element
    const wishlistNotification = document.getElementById('wish-notification');

    // Update the wishlist notification count
    if (wishlistNotification) {
        wishlistNotification.textContent = wishlist.length.toString() || '0'; // Display the number of products in the wishlist or '0' if empty
    }

    // Get the wishlist table body element
    const wishlistTableBody = document.querySelector('tbody');

    // Check if the tbody element exists
    if (wishlistTableBody) {
        // Clear the current content of the wishlist table body
        wishlistTableBody.innerHTML = '';

        // Populate the wishlist table body with updated wishlist data
        wishlist.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.imageUrl}" alt="${product.name}" style="max-width: 100px;"></td>
                <td>${product.name}</td>
                <td>$${parseFloat(product.price).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromWishlist('${product.name}')">
                        Remove
                    </button>
                    <button class="btn btn-primary ml-2" onclick="addToCartFromWishlist('${product.name}')">
                        Add to Cart
                    </button>
                </td>
            `;
            wishlistTableBody.appendChild(row);
        });
    }
}



// Function to add a product to the cart in localStorage
function addToCartToLocalStorage(productName, productPrice, productImageUrl) {
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new product to the cart
    cart.push({ name: productName, price: productPrice, imageUrl: productImageUrl });

    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Modify the function to redirect to the /mycart route with cart data as a query parameter
function goToCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart data from localStorage
    const queryParams = new URLSearchParams({ cart: JSON.stringify(cart) }); // Create query parameter string
    window.location.href = '/products/mycart?' + queryParams.toString(); // Redirect to /mycart with query parameters
}
function goToWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []; // Retrieve wishlist data from localStorage
    const queryParams = new URLSearchParams({ wishlist: JSON.stringify(wishlist) }); // Create query parameter string
    window.location.href = '/products/mywishlist?' + queryParams.toString(); // Redirect to /mywishlist with query parameters
}

window.addEventListener('pageshow', function(event) {
    // If the persisted property is true, it means the page is being restored from the cache
    if (event.persisted) {
        // Reload the page to ensure it's up to date
        window.location.reload();
    }
});
