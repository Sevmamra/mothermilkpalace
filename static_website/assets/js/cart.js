document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p style='text-align:center;'>Your cart is empty.</p>";
    totalDisplay.innerHTML = "";
    return;
  }

  let totalPrice = 0;

  const list = document.createElement("div");
  list.className = "cart-list";

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.className = "cart-img";
    row.appendChild(img);

    const name = document.createElement("h3");
    name.textContent = item.name;
    row.appendChild(name);

    const qty = document.createElement("p");
    qty.textContent = `Qty: ${item.qty}`;
    row.appendChild(qty);

    const price = document.createElement("p");
    price.textContent = `₹${item.price} x ${item.qty} = ₹${item.price * item.qty}`;
    row.appendChild(price);

    totalPrice += item.price * item.qty;

    list.appendChild(row);
  });

  cartContainer.appendChild(list);
  totalDisplay.innerHTML = `<strong>Total: ₹${totalPrice.toFixed(2)}</strong>`;
});
