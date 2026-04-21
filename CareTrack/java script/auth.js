document.addEventListener("DOMContentLoaded", function () {
  let user = localStorage.getItem("caretrackUser");

  if (user) {
    let signin = document.getElementById("signinBtn");
    let signup = document.getElementById("signupBtn");
    let logout = document.getElementById("logoutBtn");

    if (signin) signin.style.display = "none";
    if (signup) signup.style.display = "none";
    if (logout) logout.style.display = "inline";
  }
});

function logout() {
  localStorage.removeItem("caretrackUser");

  alert("You have been logged out");

  window.location.href = "index.html";
}
