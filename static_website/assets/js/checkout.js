document.addEventListener("DOMContentLoaded", () => {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const cartSummary = document.getElementById("cart-summary");
  const checkoutForm = document.getElementById("checkout-form");
  const orderSuccess = document.getElementById("order-success");

  if (cartData.length === 0) {
    cartSummary.innerHTML = "<p>Your cart is empty.</p>";
    checkoutForm.style.display = "none";
    return;
  }

  let total = 0;

  // Show cart items
  cartData.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    const subtotal = item.price * item.quantity;
    total += subtotal;

    itemDiv.innerHTML = `
      <strong>${item.name}</strong> (${item.quantity})<br/>
      ₹${item.price} × ${item.quantity} = ₹${subtotal.toFixed(2)}
      <hr/>
    `;
    cartSummary.appendChild(itemDiv);
  });

  // Show total
  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;
  cartSummary.appendChild(totalDiv);

  // Form submit
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    // You can send order data to Firebase/DB here in future

    // Show success message
    orderSuccess.style.display = "block";
    checkoutForm.style.display = "none";
    cartSummary.innerHTML = "";

    // Clear cart from storage
    localStorage.removeItem("cart");
  });
});
