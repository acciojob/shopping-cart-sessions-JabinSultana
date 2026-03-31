// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");


// ✅ Always read existing cart
function getCart() {

  const cartData =
    sessionStorage.getItem("cart");

  return cartData
    ? JSON.parse(cartData)
    : [];

}


// ✅ Save cart
function saveCart(cart) {

  sessionStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}


// Render products
function renderProducts() {

  productList.innerHTML = "";

  products.forEach(product => {

    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);

  });

}


// Render cart
function renderCart() {

  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach(item => {

    const li = document.createElement("li");

    li.textContent =
      `${item.name} - $${item.price}`;

    cartList.appendChild(li);

  });

}


// ✅ FIXED addToCart
function addToCart(productId) {

  const cart = getCart();

  const product =
    products.find(
      p => p.id === productId
    );

  cart.push(product);

  saveCart(cart);

  renderCart();

}


// Clear cart
function clearCart() {

  sessionStorage.removeItem("cart");

  renderCart();

}


// Product click handler
productList.addEventListener("click", (e) => {

  if (e.target.tagName === "BUTTON") {

    const id =
      parseInt(
        e.target.getAttribute("data-id")
      );

    addToCart(id);

  }

});


// Clear cart click
clearCartBtn.addEventListener(
  "click",
  clearCart
);


// Initial load
renderProducts();
renderCart();