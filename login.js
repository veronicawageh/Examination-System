import { User } from "./classes.js";
//toggle password icon

let imgPass = $(".eyePass");
let imgpath = imgPass.attr("src");

let inputPass = $("input[type='password']");

imgPass.click(function () {
  if (inputPass.attr("type") === "password") {
    inputPass.attr("type", "text"); // Change input type to text
    imgPass.attr("src", "./images/eye.svg"); // Change icon to eye-slash
  } else {
    inputPass.attr("type", "password"); // Change input type back to password
    imgPass.attr("src", imgpath); // Change icon to eye
  }
});

///////////////////////// login implementation
let emailInput = $(".email")[0];
let passInput = $(".pass")[0];
let emailError = $("span")[0];
let passError = $("span")[1];
let errors = [emailError, passError];
let inputs = [emailInput, passInput];
let loginBtn = $("button");
let usersArr = [];
let user;
console.log(loginBtn, emailError, passError);
$("form").submit(function (e) {
  e.preventDefault();
});
$(window).on("load", function () {
  usersArr = JSON.parse(localStorage.getItem("UsersArray")) || [];
  console.log(usersArr);
});

loginBtn.click(function (e) {
  removeErrorMsg();
  if (findEmail().length == 0) {
    emailError.innerHTML = "*this user not exist";
  } else {
    if (findPassword(findEmail())) {
      let currentUser = findEmail()[0];
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      // window.location.replace("./startExam.html");
    }
  }
  CheckRequired();
});
function findPassword(user) {
  if ($(inputPass).val() == user[0].password) {
    console.log("waslt");
    return 1;
  } else {
    passError.innerHTML = "*wrong password";
  }
}
function findEmail() {
  return usersArr.filter(function (ele) {
    return ele.email == emailInput.value;
  });
}

function CheckRequired() {
  inputs.forEach(function (ele, i, arr) {
    if (ele.value == "") {
      errors[i].innerHTML = "*This Field is Required !";
    }
  });
}

function removeErrorMsg() {
  inputs.forEach(function (ele, i) {
    $(ele).on("input", function () {
      errors[i].innerHTML = ""; // Clear error text
    });
  });
}
