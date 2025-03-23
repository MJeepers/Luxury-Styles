// Cart data stored in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart count in the header
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to add a product to the cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`); // Optional: Show a confirmation message
}

// Function to display cart items on the cart page
function displayCartItems() {
    // Select the cart items container
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    // Debugging: Log the cart items container
    console.log('Cart items container:', cartItems); // Debugging line

    // Clear existing items
    cartItems.innerHTML = ''; // This should remove all child elements

    // Debugging: Log the cart items after clearing
    console.log('Cart items after clearing:', cartItems.innerHTML); // Debugging line

    // Add each item to the cart display
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    // Update the total price
    cartTotal.textContent = total.toFixed(2);
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    console.log('Product ID to remove:', productId); // Debugging line
    console.log('Type of productId:', typeof productId); // Debugging line
    console.log('Cart before removal:', cart); // Debugging line

    // Convert productId to a number (if IDs are stored as numbers)
    productId = Number(productId);

    // Find the item in the cart
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        // Decrement the quantity
        cart[itemIndex].quantity -= 1;

        // If the quantity reaches 0, remove the item from the cart
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
    }

    console.log('Cart after removal:', cart); // Debugging line

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh the cart display
    displayCartItems();

    // Update the cart count in the header
    updateCartCount();
}

// Initialize cart display on the cart page
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}

// Add event listener to "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.product-card button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: Number(button.dataset.id), // Ensure ID is a number
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image,
            };
            addToCart(product);
        });
    });
});

// Checkout button functionality
document.getElementById('checkout-button').addEventListener('click', () => {
    alert('Proceeding to checkout...');
    // Redirect to a payment gateway or checkout page
});

// Clear Cart Button Functionality
document.getElementById('clear-cart-button').addEventListener('click', () => {
    // Debugging: Log localStorage before clearing
    console.log('LocalStorage before clearing:', localStorage); // Debugging line

    // Clear localStorage
    localStorage.clear();

    // Debugging: Log localStorage after clearing
    console.log('LocalStorage after clearing:', localStorage); // Debugging line

    // Clear the cart array
    cart = [];

    // Refresh the cart display
    displayCartItems();

    // Update the cart count in the header
    updateCartCount();

    alert('Cart cleared!'); // Optional: Show a confirmation message
});