document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-list");

  fetch("assets/data/products.json")
    .then(response => response.json())
    .then(data => {
      // 1. Loose Products
      container.appendChild(createSection("Loose Products"));
      data.loose_products.forEach(category => {
        container.appendChild(createCategory(category));
      });

      // 2. Packed Products
      container.appendChild(createSection("Packed Products"));
      data.packed_products.forEach(category => {
        container.appendChild(createCategory(category));
      });
    });

  function createSection(title) {
    const h2 = document.createElement("h2");
    h2.textContent = title;
    return h2;
  }

  function createCategory(category) {
    const div = document.createElement("div");
    div.className = "product-category";

    const title = document.createElement("h3");
    title.textContent = category.category;
    div.appendChild(title);

    const list = document.createElement("div");
    list.className = "product-grid";

    category.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="assets/images/products/${item.image}" alt="${item.name}" />
        <h4>${item.name}</h4>
        <p>Price: ₹${item.price} ${item.unit ? `(${item.unit})` : ""}</p>
        <input type="number" min="1" value="1" class="qty-input" />
        <button class="add-btn">Add to Cart</button>
      `;

      const button = card.querySelector(".add-btn");
      const qtyInput = card.querySelector(".qty-input");

      button.addEventListener("click", () => {
        const quantity = parseInt(qtyInput.value);
        if (quantity > 0) {
          addToCart(item, quantity);
          button.textContent = "Added ✅";
          setTimeout(() => (button.textContent = "Add to Cart"), 1500);
        }
      });

      list.appendChild(card);
    });

    div.appendChild(list);
    return div;
  }

  function addToCart(item, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(prod => prod.name === item.name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        name: item.name,
        price: item.price,
        quantity: quantity
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
