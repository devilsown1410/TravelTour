const username = document.querySelector("#username");
const username_error = document.querySelector("#username_error");
const password = document.querySelector("#password");
const password_error = document.querySelector("#password_error");

const checkPassword = () => {
  console.log("inside checkPassword");
  if (password.value.trim().length < 8) {
    password_error.innerHTML = "Password must be at least 8 characters";
    password_error.style.display = "block";
    return false;
  } else {
    password_error.style.display = "none";
    password_error.textContent = "";
    return true;
  }
};
const checkUsername = () => {
  if (username.value.trim() === "") {
    username_error.textContent = "Username is required";
    username_error.style.display = "block";
    return false;
  } else {
    username_error.style.display = "none";
    username_error.textContent = "";
    return true;
  }
};
username.addEventListener("focusout", checkUsername);
password.addEventListener("focusout", checkPassword);
document.querySelector("#submit").addEventListener("click", function (e) {
  e.preventDefault();
  if (!checkUsername() || !checkPassword()) {
    return;
  }
  const User = localStorage.getItem("User");
  const parsedUser = JSON.parse(User);
  const user = parsedUser?.find((user) => user.username === username.value);
  if (!user) {
    alert("Invalid Credentials");
    username.value = "";
    password.value = "";
    username_error.style.display = "none";
    password_error.style.display = "none";
    username_error.textContent = "";
    password_error.textContent = "";
    return;
  } else {
    if (user.password === password.value) {
      sessionStorage.setItem("curr_user", JSON.stringify(user));
      alert("Login successful");
      window.location.href = "../index.html";
    } else {
      alert("Invalid Credentials");
      username.value = "";
      password.value = "";
    }
  }
});
