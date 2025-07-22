document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("username").value.trim();
    const phone = document.getElementById("userphone").value.trim();

    if (!name || !phone || phone.length !== 10) {
      alert("Please enter valid name and 10-digit phone number.");
      return;
    }

    // ✅ Only allow approved users
    const approvedUsers = [
      "9876543210", "9328977409", "7000000001", "8000000002" // 🔁 Update this list as needed
    ];

    if (!approvedUsers.includes(phone)) {
      alert("Sorry! You are not authorized to order from this shop.");
      return;
    }

    // 🔐 Save user info in localStorage
    localStorage.setItem("milk_user", JSON.stringify({ name, phone }));

    // 🔁 Redirect to home (index)
    window.location.href = "index.html";
  });
});
