// Function to load products (now from localStorage)
function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    renderProducts(products);
}

// Initial load
loadProducts();
