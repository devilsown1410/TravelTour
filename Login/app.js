const username = document.querySelector("#username");
const username_error = document.querySelector("#username_error");
const password = document.querySelector("#password");
const password_error = document.querySelector("#password_error");
document.querySelector("#submit").addEventListener("click", function (e) {
  e.preventDefault();
  if (username.value.trim() === "") {
    username_error.textContent = "Username is required";
    username_error.style.display = "block";
    username_error.style.float = "center";
  }
  if (password.value.trim().length < 8) {
    password_error.innerHTML = "Password must be at least 8 characters";
    password_error.style.display = "block";
  }
  const User = localStorage.getItem("User");
  const parsedUser = JSON.parse(User);
  console.log(parsedUser);
  const user = parsedUser.find((user) => user.username === username.value);
  console.log(JSON.stringify(user));
  if (user) {
    if (user.password === password.value) {
      sessionStorage.setItem("curr_user", JSON.stringify(user));
      alert("Login successful");
      window.location.href = "../index.html";
    } else {
      password_error.innerHTML = "Password is incorrect";
      password_error.style.display = "block";
    }
  }
});
