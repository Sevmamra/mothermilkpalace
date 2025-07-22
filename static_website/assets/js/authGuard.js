document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("milk_user"));

  if (!user || !user.name || !user.phone) {
    // User not logged in or missing data
    alert("Please login to continue.");
    window.location.href = "login.html";
  }
});
