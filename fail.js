let currentUserObject = JSON.parse(localStorage.getItem("currentUser"));
let userName = currentUserObject.firstName + " " + currentUserObject.lastName;
let result = Number(localStorage.getItem("ExamResult")) * 10;
let text = document.querySelector("P");
console.log(result);
text.innerHTML = `Unfortunately .. you Failed the Test ${userName} ,Your Score is ${result}%`;

document.querySelector("a").addEventListener("click", function () {
  window.location.replace("./login.html");
  window.localStorage.removeItem("currentUser");
  window.localStorage.removeItem("ExamResult");
});
