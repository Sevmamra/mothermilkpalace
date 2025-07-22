document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/products.json")
    .then(res => res.json())
    .then(data => {
      renderProducts(data);
    })
    .catch(err => {
      console.error("Error loading products:", err);
      document.getElementById("products-list").innerHTML = "<p>Error loading products.</p>";
    });
});

function renderProducts(categories) {
  const container = document.getElementById("products-list");
  categories.forEach(category => {
    const section = document.createElement("section");
    section.className = "category";

    const title = document.createElement("h2");
    title.textContent = category.category;
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "product-grid";

    category.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      card.appendChild(img);

      const name = document.createElement("h3");
      name.textContent = item.name;
      card.appendChild(name);

      const price = document.createElement("p");
      price.textContent = `₹${item.price} ${item.unit ? `(${item.unit})` : ""}`;
      card.appendChild(price);

      const btn = document.createElement("button");
      btn.textContent = "Add to Cart";
      btn.onclick = () => addToCart(item);
      card.appendChild(btn);

      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(i => i.name === item.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added to cart: ${item.name}`);
}
