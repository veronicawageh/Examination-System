import { User } from "./classes.js"; // >> ew3a tensa el .js ya m7mad

// this is to show the eye in the password input logic
let imgPass = $(".eyePass").eq(0);
let imgConfirmPass = $(".eyeconfirmPass");
let imgpath = imgPass.attr("src");
let inputPass = $(".password input").eq(0);
let inputConfirmPass = $(".password input").eq(1);
let imgconfirmpath = imgConfirmPass.attr("src");

imgPass.click(function () {
  if (inputPass.attr("type") === "password") {
    inputPass.attr("type", "text"); // Change input type to text
    imgPass.attr("src", "./images/eye.svg"); // Change icon to eye-slash
  } else {
    inputPass.attr("type", "password"); // Change input type back to password
    imgPass.attr("src", imgpath); // Change icon to eye
  }
});

imgConfirmPass.click(function () {
  if (inputConfirmPass.attr("type") === "password") {
    inputConfirmPass.attr("type", "text"); // Change input type to text
    imgConfirmPass.attr("src", "./images/eye.svg"); // Change icon to eye-slash
  } else {
    inputConfirmPass.attr("type", "password"); // Change input type back to password
    imgConfirmPass.attr("src", imgConfirmPass); // Change icon to eye
  }
});
//*--------------------------------------------------------------------------------------------
// this is sign up logic

let firstNameInput = $(".names input[type='text'")[0];
let lastNameInput = $(".names input[type='text'")[1];
let emailInput = $(".email")[0];
let passwordInput = $("input[type='password'")[0];
let confirmPasswordInput = $("input[type='password'")[1];
let signUpBtn = $("#signUpSubmit");
let emailREGX = /^[a-z0-9._%+!$&=^|~#%'`?{}-]+@[a-z0-9-]+(\.[a-z]{2,16})+$/;

let namesREGX = /^[A-Za-z]{3,15}$/;
let strongPasswordREGX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/;
let inputs = [
  firstNameInput,
  lastNameInput,
  emailInput,
  passwordInput,
  confirmPasswordInput,
];
let usersArr = [];
let firstNameError = $("span")[0];
let lastNameError = $("span")[1];
let emailError = $("span")[2];
let passError = $("span")[3];
let confirmError = $("span")[4];
let erros = [
  firstNameError,
  lastNameError,
  emailError,
  passError,
  confirmError,
];

$("form").submit(function (e) {
  e.preventDefault();
});

$(window).on("load", function () {
  usersArr = JSON.parse(localStorage.getItem("UsersArray")) || [];
  console.log(usersArr);
});

signUpBtn.click(function (e) {
  removeErrorMsg(); // to add a listner to each inputs when i input in it to remove ANY error MSG
  validate(); // this going to check on every input that the user has entered
  CheckRequired(); // lazem tb2a hena 3shan t override 3la ay erro msg ablha in case en el user 8yar w 5ala el input fady
  if (isAllUserDataValid()) {
    // here should check if the user<email> is already on my localStorage
    // here add all data of new user to the local storage cause its all valid
    if (isEmailExists()) {
      // case email exists
      emailError.innerHTML = "*this Email already exists!";
    } else {
      // case email dosent exists and valid .. dol all the logic here

      console.log("fol el fol");
      let newUser = new User(
        firstNameInput.value,
        lastNameInput.value,
        emailInput.value,
        passwordInput.value
      );

      usersArr.push(newUser); // push user into array of users
      localStorage.setItem("UsersArray", JSON.stringify(usersArr));
      // navigate b2a lel logIn page
      window.location.replace("./login.html");
    }
  } else {
    console.log("kol el data msh valid w bona2an 3leh msh h3raf adef new user");
    // stay put >> 5allik mkank ya fale7
  }
});

function CheckRequired() {
  inputs.forEach(function (ele, i, arr) {
    if (ele.value == "") {
      erros[i].innerHTML = "*This Field is Required !";
    }
  });
}

function removeErrorMsg() {
  inputs.forEach(function (ele, i, arr) {
    $(ele).on("input", function () {
      erros[i].innerHTML = "";
    });
  });
}
function isAllUserDataValid() {
  const isAllErrorSpansEmpty = (currentErro) => currentErro.innerHTML == "";
  return erros.every(isAllErrorSpansEmpty);
}
function validate() {
  if (!namesREGX.test(firstNameInput.value)) {
    firstNameError.innerHTML = "*name must be 3 to 15 charcters!";
  }
  if (!namesREGX.test(lastNameInput.value)) {
    lastNameError.innerHTML = "*name must be 3 to 15 charcters!";
  }
  if (!emailREGX.test(emailInput.value)) {
    emailError.innerHTML = "*email must be in this form example@site.com!";
  }
  if (!strongPasswordREGX.test(passwordInput.value)) {
    passError.innerHTML =
      "*Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character!";
  }
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmError.innerHTML = "*Password not matched";
  }
}

function isEmailExists() {
  return usersArr.some(function (ele) {
    return ele.email == emailInput.value;
  });
}
