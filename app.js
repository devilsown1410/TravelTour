const curr_user = document.querySelector("#curr_user");
curr_user.textContent = JSON.parse(
  sessionStorage.getItem("curr_user")
)?.username;
if (!curr_user.textContent) {
  alert("Please login first");
  window.location.href = "/Login/login.html";
}
const isAdmin= JSON.parse(
  sessionStorage.getItem("curr_user")
)?.isAdmin;
if (isAdmin) {
  document.querySelector("#admin").style.display = "block";
}else{
  document.querySelector("#admin").style.display = "none";
}

document.querySelector("#logout").addEventListener("click", function (e) {
  sessionStorage.clear();
  alert("Logout successful");
  window.location.href = "/Login/login.html";
});

document.querySelector("#admin").addEventListener("click", function (e) {
  window.location.href = "/Admin/admin.html";
});


