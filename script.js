// script.js
const fakeApi = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
  ];
  
  const productList = document.getElementById("product-list");
  const cart = document.getElementById("cart");
  const cartItems = [];
  
  // Fetch products from a fake API
  function fetchProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeApi);
      }, 1000);
    });
  }
  
  // Render products
  function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
  }
  
  // Add product to cart
  function addToCart(productId) {
    const product = fakeApi.find(p => p.id === productId);
    if (product) {
      cartItems.push(product);
      renderCart();
    }
  }
  
  // Remove product from cart
  function removeFromCart(productId) {
    const index = cartItems.findIndex(item => item.id === productId);
    if (index !== -1) {
      cartItems.splice(index, 1);
      renderCart();
    }
  }
  
  // Render cart
  function renderCart() {
    cart.innerHTML = "";
    cartItems.forEach(item => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <h4>${item.name}</h4>
        <p>Price: $${item.price}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cart.appendChild(div);
    });
  }
  
  // Checkout and calculate total bill
  function checkout() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("total-bill").textContent = `Total Bill: $${total}`;
  }
  
  // Attach event listener to checkout button
  document.getElementById("checkout-button").addEventListener("click", checkout);
  
  // Initialize app
  fetchProducts().then(renderProducts);
  