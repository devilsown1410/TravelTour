const user = document.querySelector("#username");
const user_error = document.querySelector("#user_error");
const email = document.querySelector("#email");
const email_error = document.querySelector("#email_error");
const password = document.querySelector("#password");
const password_error = document.querySelector("#password_error");
const phone = document.querySelector("#phone");
const phone_error = document.querySelector("#phone_error");
const dob = document.querySelector("#dob");
const dob_error = document.querySelector("#dob_error");
const gender = document.getElementsByName("gender");
const gender_error = document.querySelector("#gender_error");
const profile_picture = document.querySelector("#profile_picture");
const profile_picture_error = document.querySelector("#profile_picture_error");
const bio = document.querySelector("#bio");
const bio_error = document.querySelector("#bio_error");
const terms_conditions = document.querySelector("#terms_conditions");
const terms_conditions_error = document.querySelector(
  "#terms_conditions_error"
);
const container = document.querySelector(".container");

const validateUsername = () => {
  if (user.value.trim() === "") {
    user_error.textContent = "Username is required";
    user_error.style.display = "block";
    return false;
  } else {
    user_error.style.display = "none";
    user_error.textContent = "";
    return true;
  }
};
const validateEmail = () => {
  if (email.value.trim() === "") {
    email_error.innerHTML = "Email is required";
    email_error.style.display = "block";
    return false;
  }
  if (email.value.trim() !== "") {
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email_regex.test(email.value)) {
      email_error.innerHTML = "Email is not valid";
      email_error.style.display = "block";
      return false;
    } else {
      email_error.style.display = "none";
      email_error.innerHTML = "";
      return true;
    }
  } else {
    email_error.style.display = "none";
    email_error.innerHTML = "";
    return true;
  }
};

const validatePassword = () => {
  if (password.value.trim().length < 8) {
    password_error.innerHTML = "Password must be at least 8 characters";
    password_error.style.display = "block";
    return false;
  } else {
    password_error.style.display = "none";
    password_error.innerHTML = "";
    return true;
  }
};
const validateConfirmPassword = () => {
  if (confirm_password.value.trim().length < 8) {
    confirm_password_error.innerHTML = "Password must be at least 8 characters";
    confirm_password_error.style.display = "block";
    return false;
  }
  if (confirm_password.value.trim() !== password.value.trim()) {
    confirm_password_error.innerHTML = "Passwords do not match";
    confirm_password_error.style.display = "block";
    return false;
  } else {
    confirm_password_error.style.display = "none";
    confirm_password_error.innerHTML = "";
    return true;
  }
};
const validatePhone = () => {
  if (phone.value.trim() < 10) {
    phone_error.innerHTML = "Phone number must be at least 10 digits";
    phone_error.style.display = "block";
    return false;
  }
  if (phone.value.trim() !== "") {
    const phone_regex = /^\d{10}$/;
    if (!phone_regex.test(phone.value)) {
      phone_error.innerHTML = "Phone number is not valid";
      phone_error.style.display = "block";
      return false;
    } else {
      phone_error.style.display = "none";
      phone_error.innerHTML = "";
      return true;
    }
  } else {
    phone_error.style.display = "none";
    phone_error.innerHTML = "";
    return true;
  }
};
const validateDOB = () => {
  if (dob.value.trim() === "") {
    dob_error.innerHTML = "Date of birth is required";
    dob_error.style.display = "block";
    return false;
  }
  if (dob.value.trim() !== "") {
    if (new Date(dob.value) > new Date()) {
      dob_error.innerHTML = "Date of birth cannot be in the future";
      dob_error.style.display = "block";
      return false;
    } else {
      dob_error.style.display = "none";
      dob_error.innerHTML = "";
      return true;
    }
  }
};
const validateProfilePicture = () => {
  if (profile_picture.value.trim() === "") {
    profile_picture_error.innerHTML = "Profile picture is required";
    profile_picture_error.style.display = "block";
    return false;
  }
  if (profile_picture.value.trim() !== "") {
    const file_extension = profile_picture.value.split(".").pop().toLowerCase();
    const allowed_extensions = ["jpg", "jpeg", "png"];
    if (!allowed_extensions.includes(file_extension)) {
      profile_picture_error.innerHTML =
        "Profile picture must be a jpg, jpeg, or png file";
      profile_picture_error.style.display = "block";
      return false;
    } else {
      profile_picture_error.style.display = "none";
      profile_picture_error.innerHTML = "";
      return true;
    }
  }
};
const validateBio = () => {
  if (bio.value.trim() === "") {
    bio_error.innerHTML = "Bio is required";
    bio_error.style.display = "block";
    return false;
  }
  if (bio.value.trim().length > 200) {
    bio_error.innerHTML = "Bio must be less than 200 characters";
    bio_error.style.display = "block";
    return false;
  } else {
    bio_error.style.display = "none";
    bio_error.innerHTML = "";
    return true;
  }
};
const validateTermsConditions = () => {
  if (!terms_conditions.checked) {
    terms_conditions_error.innerHTML =
      "You must accept the terms and conditions";
    terms_conditions_error.style.display = "block";
    return false;
  } else {
    terms_conditions_error.style.display = "none";
    terms_conditions_error.innerHTML = "";
    return true;
  }
};

user.addEventListener("focusout", validateUsername);
email.addEventListener("focusout", validateEmail);
password.addEventListener("focusout", validatePassword);
confirm_password.addEventListener("focusout", validateConfirmPassword);
phone.addEventListener("focusout", validatePhone);
dob.addEventListener("change", validateDOB);
profile_picture.addEventListener("change", validateProfilePicture);
bio.addEventListener("focusout", validateBio);
terms_conditions.addEventListener("change", validateTermsConditions);

document.querySelectorAll("input[name=gender").forEach(function (g) {
  g.addEventListener("change", function () {
    const genderSelected = Array.from(
      document.querySelectorAll("input[name='gender']:checked")
    );
    if (genderSelected.length === 0) {
      gender_error.innerHTML = "Gender is required";
      gender_error.style.display = "block";
    } else {
      gender_error.style.display = "none";
      gender_error.innerHTML = "";
    }
  });
});
document.querySelectorAll("input[name='hobbies']").forEach(function (hobby) {
  hobby.addEventListener("change", function () {
    const hobbies = document.querySelectorAll("input[name='hobbies']:checked");
    if (hobbies.length === 0) {
      hobbies_error.innerHTML = "At least one hobby must be selected";
      hobbies_error.style.display = "block";
    } else {
      hobbies_error.style.display = "none";
      hobbies_error.innerHTML = "";
    }
  });
});

document.querySelector("#submit").addEventListener("click", function (e) {
  e.preventDefault();
  container.style.height = "100%";
  if (
    gender[0].checked === false &&
    gender[1].checked === false &&
    gender[2].checked === false
  ) {
    gender_error.innerHTML = "Gender is required*";
  }
  let hobbies = [];
  document
    .querySelectorAll("input[name='hobbies']:checked")
    .forEach(function (hobby) {
      hobbies.push(hobby);
    });
  if (
    validateUsername() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validatePhone() &&
    validateDOB() &&
    validateProfilePicture() &&
    validateBio() &&
    validateTermsConditions()
  ) {
    const selected_hobbies = [];
    hobbies.forEach(function (hobby) {
      selected_hobbies.push(hobby.value);
    });
    const form_data = {
      username: user.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      dob: dob.value,
      gender: gender[0].checked
        ? gender[0].value
        : gender[1].checked
        ? gender[1].value
        : gender[2].value,
      profile_picture: profile_picture.value,
      bio: bio.value,
      hobbies: selected_hobbies,
    };
    const User = localStorage.getItem("User") || "[]";
    const parsedUser = JSON.parse(User);
    const userExists = parsedUser.find(
      (user) => user.username === form_data.username
    );
    const emailExists = parsedUser.find(
      (user) => user.email === form_data.email
    );
    if (userExists) {
      user_error.innerHTML = "Username already exists";
      user_error.style.display = "block";
      const result = confirm(
        "User Already Exits! Do you want to login instead?"
      );
      if (result) {
        window.location.href = "../Login/login.html";
      } else {
        user.value = "";
        email.value = "";
        password.value = "";
        confirm_password.value = "";
        phone.value = "";
        dob.value = "";
        bio.value = "";
        profile_picture.value = "";
      }
      return;
    }
    if (emailExists) {
      email_error.innerHTML = "Email already exists";
      email_error.style.display = "block";
      return;
    } else {
      parsedUser.push(form_data);
      localStorage.setItem("User", JSON.stringify(parsedUser));
    }
    alert("Form submitted successfully");
    user.value = "";
    email.value = "";
    password.value = "";
    confirm_password.value = "";
    phone.value = "";
    dob.value = "";
    gender[0].checked = false;
    gender[1].checked = false;
    gender[2].checked = false;
    hobbies.forEach(function (hobby) {
      hobby.checked = false;
    });
    profile_picture.value = "";
    bio.value = "";
    terms_conditions.checked = false;
    window.location.href = "../Login/login.html";
  }
});
