let startBtn = document.querySelector("a");
console.log(startBtn);
let questinosArr;
let currentQuestions; // this is my random questions array to put it HERE in localStorage   >> to be used in the next page
let currentIndex = 0; // this is to know where iam standing in my array of questions >> to be used in the next page

window.addEventListener("load", function () {
  getQuestions();
});
async function getQuestions() {
  let questionsRecponce = await fetch("./questions.json");
  console.log(questionsRecponce);

  questinosArr = await questionsRecponce.json();
  currentQuestions = [...getTenRundomQuestions(questinosArr)];
  console.log(currentQuestions);
}
function getTenRundomQuestions(arr) {
  let randomArray = new Set();
  do {
    let randomNumber = Math.floor(Math.random() * 19);
    randomArray.add(arr[randomNumber]);
  } while (randomArray.size < 10);
  return randomArray;
}
startBtn.addEventListener("click", function () {
  localStorage.setItem("arrayOfQuestions", JSON.stringify(currentQuestions));
  window.localStorage.setItem("currentIndex", currentIndex);
  window.location.replace("./examPage.html");
});
