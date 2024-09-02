// Sample product data
const products = [
    { id: 1, name: "laptop 1", price: 29.99, image: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg" },
    { id: 2, name: "telefon 2", price: 39.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4fHsTPBe_XgHAFVpbDPM4YGYmaxOOTGyEfg&s" },
    { id: 3, name: "bluze", price: 49.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKItMltUGbcNq880aED2fF4jOYFueSOgea0A&s" }
];

// Cart array to store selected products
let cart = [];

// Function to load products
function loadProducts() {
    const productList = document.getElementById("product-list");

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(productElement);
    });
}

// Function to add products to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
}

// Function to update cart count in the navigation
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}

// Function to show the selected section
function showSection(sectionId) {
    document.getElementById('products').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';

    if (sectionId === 'cart') {
        loadCartItems();
    }
}

// Function to load cart items
function loadCartItems() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItems.appendChild(cartItem);
        total += product.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    loadCartItems();
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    showSection('checkout');
}

// Function to handle order submission
function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    alert(`Thank you for your order, ${name}! An email confirmation has been sent to ${email}.`);

    // Clear cart
    cart = [];
    updateCartCount();

    // Redirect to products page
    showSection('products');
}

// Load products when the page loads
window.onload = () => {
    loadProducts();
};

// Function to render products (reuse this function after filtering)
function renderProducts(filteredProducts) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

// Initial render of all products
renderProducts(products);

// Function to search and filter products
function searchProducts() {
    const query = document.getElementById("search").value.toLowerCase();

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );

    renderProducts(filteredProducts);
}
const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
);

