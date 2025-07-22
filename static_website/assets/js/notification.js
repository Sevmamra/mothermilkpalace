// Dummy Notification System for Admin

function notifyAdmin(order) {
  // Future: You can send this to backend / Firebase / email / push notification
  console.log("🔔 Admin Notification: New order received!");
  console.log("🧾 Order Details:", order);

  // You can also simulate a sound alert here (for web apps only)
  // let audio = new Audio('assets/alert.mp3');
  // audio.play();
}
