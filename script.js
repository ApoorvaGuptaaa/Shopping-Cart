// Fake API call to fetch products
function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Apple", price: 1 },
        { id: 2, name: "Banana", price: 5 },
        { id: 3, name: "Orange", price: 8 },
        { id: 4, name: "Mango", price: 1.5 },
      ]);
    }, 500);
  });
}

const cart = [];

function displayProducts(products) {
  const productsDiv = document.getElementById('products');
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(div);
  });
}

function addToCart(productId) {
  const product = productsList.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: ₹${(item.price * item.quantity).toFixed(2)}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartDiv.appendChild(div);
  });
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
    renderCart();
  }
}

// Initialize
let productsList = [];

fetchProducts().then(products => {
  productsList = products;
  displayProducts(productsList);
});
