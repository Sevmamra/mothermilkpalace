document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  const successBox = document.getElementById("order-success");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    // Optional: Validate phone number format (basic)
    if (!/^\d{10}$/.test(phone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    // Order summary log (can be sent to backend in future)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Order placed by:", name);
    console.log("Phone:", phone);
    console.log("Address:", address);
    console.log("Ordered Items:", cart);

    // Clear cart
    localStorage.removeItem("cart");

    // Hide form, show success
    form.style.display = "none";
    successBox.style.display = "block";

    // Optional: Redirect after delay
    // setTimeout(() => {
    //   window.location.href = "index.html";
    // }, 4000);
  });
});
