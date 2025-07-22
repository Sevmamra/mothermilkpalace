document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const phoneInput = document.getElementById("phone");
  const otpBox = document.getElementById("otp-box");
  const otpInput = document.getElementById("otp");
  const verifyBtn = document.getElementById("verify-btn");
  const loginSuccess = document.getElementById("login-success");

  let confirmationResult;

  // Step 1: Setup Recaptcha
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
    size: "normal",
    callback: function (response) {
      console.log("Recaptcha verified");
    },
    "expired-callback": function () {
      alert("Recaptcha expired. Please try again.");
    }
  });

  recaptchaVerifier.render();

  // Step 2: Send OTP
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const phoneNumber = phoneInput.value.trim();

    if (!/^\+91\d{10}$/.test(phoneNumber)) {
      alert("Please enter a valid phone number with +91");
      return;
    }

    firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
      .then((result) => {
        confirmationResult = result;
        loginForm.style.display = "none";
        otpBox.style.display = "block";
        alert("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("OTP Error:", error);
        alert("Failed to send OTP. Try again.");
      });
  });

  // Step 3: Verify OTP
  verifyBtn.addEventListener("click", () => {
    const otpCode = otpInput.value.trim();
    if (!otpCode) {
      alert("Enter the OTP");
      return;
    }

    confirmationResult.confirm(otpCode)
      .then((result) => {
        const user = result.user;
        console.log("Login successful:", user.phoneNumber);

        // Save login state locally
        localStorage.setItem("userPhone", user.phoneNumber);

        otpBox.style.display = "none";
        loginSuccess.style.display = "block";

        // Redirect after short delay
        setTimeout(() => {
          window.location.href = "index.html"; // Or cart.html if redirect to checkout
        }, 2000);
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
        alert("Invalid OTP. Try again.");
      });
  });
});
