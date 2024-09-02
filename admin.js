// Mocked product list for demo purposes (stored in localStorage)
let products = JSON.parse(localStorage.getItem("products")) || [];

// Function to add a product
function addProduct(event) {
    event.preventDefault();

    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImage = document.getElementById("productImage").value;

    const newProduct = {
        id: Date.now(),
        name: productName,
        price: parseFloat(productPrice),
        img: productImage,
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    renderAdminProducts();
    document.getElementById("addProductForm").reset();
}

// Function to render products in admin view
function renderAdminProducts() {
    const adminProductList = document.getElementById("adminProductList");
    adminProductList.innerHTML = "";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        adminProductList.appendChild(productElement);
    });
}

// Function to delete a product
function deleteProduct(productId) {
    products = products.filter(product => product.id !== productId);
    localStorage.setItem("products", JSON.stringify(products));
    renderAdminProducts();
}

// Function to edit a product
function editProduct(productId) {
    const product = products.find(product => product.id === productId);

    document.getElementById("editProductId").value = product.id;
    document.getElementById("editProductName").value = product.name;
    document.getElementById("editProductPrice").value = product.price;
    document.getElementById("editProductImage").value = product.img;

    document.getElementById("product-form").style.display = "none";
    document.getElementById("edit-product-form").style.display = "block";
}

// Function to update a product
function updateProduct(event) {
    event.preventDefault();

    const productId = parseInt(document.getElementById("editProductId").value);
    const productName = document.getElementById("editProductName").value;
    const productPrice = document.getElementById("editProductPrice").value;
    const productImage = document.getElementById("editProductImage").value;

    const productIndex = products.findIndex(product => product.id === productId);
    products[productIndex] = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        img: productImage,
    };

    localStorage.setItem("products", JSON.stringify(products));
    renderAdminProducts();

    document.getElementById("editProductForm").reset();
    document.getElementById("edit-product-form").style.display = "none";
    document.getElementById("product-form").style.display = "block";
}

// Function to cancel editing
function cancelEdit() {
    document.getElementById("editProductForm").reset();
    document.getElementById("edit-product-form").style.display = "none";
    document.getElementById("product-form").style.display = "block";
}

// Load products on page load
renderAdminProducts();
