const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 }
];


// Load cart from sessionStorage
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];


// Display products
function displayProducts() {
  products.forEach(product => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button>Add to Cart</button>
    `;

    li.querySelector("button")
      .addEventListener("click", () => addToCart(product));

    productList.appendChild(li);
  });
}


// Add to cart
function addToCart(product) {

  // Push item to cart array
  cart.push(product);

  // Save updated cart
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Update UI
  renderCart();
}


// Render cart items
function renderCart() {

  cartList.innerHTML = "";

  cart.forEach(item => {

    const li = document.createElement("li");

    li.textContent =
      `${item.name} - $${item.price}`;

    cartList.appendChild(li);
  });
}


// Clear cart
clearCartBtn.addEventListener("click", () => {

  cart = [];

  sessionStorage.removeItem("cart");

  renderCart();
});


// Initial load
displayProducts();
renderCart();