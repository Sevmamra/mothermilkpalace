document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const summaryContainer = document.getElementById("cart-summary");
  const form = document.getElementById("checkout-form");
  const successBox = document.getElementById("order-success");

  if (cart.length === 0) {
    summaryContainer.innerHTML = "<p>Your cart is empty.</p>";
    form.style.display = "none";
    return;
  }

  let total = 0;
  const list = document.createElement("ul");
  cart.forEach(item => {
    const li = document.createElement("li");
    const subtotal = item.price * item.quantity;
    total += subtotal;
    li.textContent = `${item.name} - ₹${item.price} × ${item.quantity} = ₹${subtotal.toFixed(2)}`;
    list.appendChild(li);
  });

  const totalLine = document.createElement("p");
  totalLine.innerHTML = `<strong>Total: ₹${total.toFixed(2)}</strong>`;

  summaryContainer.appendChild(list);
  summaryContainer.appendChild(totalLine);

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
      alert("Please fill all the fields.");
      return;
    }

    // ✅ Save to Firebase or backend here (future)
    // Placeholder order object:
    const order = {
      name,
      phone,
      address,
      items: cart,
      total: total.toFixed(2),
      timestamp: new Date().toISOString()
    };

    console.log("Order placed:", order); // 🔁 Replace with API/firebase

    // 🧹 Clear cart
    localStorage.removeItem("cart");

    // 👍 Show success
    form.style.display = "none";
    summaryContainer.style.display = "none";
    successBox.style.display = "block";

    // 🔔 Future: Notify admin / delivery boy
  });
});
