document.addEventListener("DOMContentLoaded", () => {
  const userPhone = localStorage.getItem("userPhone");

  if (!userPhone) {
    // Not logged in
    alert("Please login to view your cart.");
    window.location.href = "login.html";
  } else {
    console.log("User logged in:", userPhone);
    // Allow access, optionally show user info
    // document.getElementById("welcome-user").textContent = `Welcome: ${userPhone}`;
  }
});
