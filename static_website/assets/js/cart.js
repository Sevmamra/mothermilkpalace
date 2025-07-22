document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const totalDisplay = document.getElementById("cart-total");
  const proceedBtn = document.getElementById("proceed-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalDisplay.textContent = "Total: ₹0";
      proceedBtn.style.display = "none";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";

      const subtotal = item.price * item.quantity;
      total += subtotal;

      itemDiv.innerHTML = `
        <strong>${item.name}</strong><br/>
        ₹${item.price} × 
        <button class="qty-btn minus" data-index="${index}">-</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn plus" data-index="${index}">+</button>
        = ₹${subtotal.toFixed(2)}
        <button class="remove-btn" data-index="${index}">Remove</button>
        <hr/>
      `;

      cartContainer.appendChild(itemDiv);
    });

    totalDisplay.textContent = `Total: ₹${total.toFixed(2)}`;
    proceedBtn.style.display = "block";

    // Attach event listeners after rendering
    document.querySelectorAll(".qty-btn.plus").forEach(btn =>
      btn.addEventListener("click", () => updateQty(btn.dataset.index, 1))
    );
    document.querySelectorAll(".qty-btn.minus").forEach(btn =>
      btn.addEventListener("click", () => updateQty(btn.dataset.index, -1))
    );
    document.querySelectorAll(".remove-btn").forEach(btn =>
      btn.addEventListener("click", () => removeItem(btn.dataset.index))
    );
  }

  function updateQty(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  proceedBtn.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

  renderCart();
});
