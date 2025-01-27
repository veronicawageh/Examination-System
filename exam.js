///////////TIME FEATURE///////////////////////////////
let timeDiv = document.querySelector(".time p");
let currentQuestions = JSON.parse(localStorage.getItem("arrayOfQuestions"));
console.log(currentQuestions);
let currentIndex = Number(window.localStorage.getItem("currentIndex")); // convert it cause it is going to be trated as a number later in displayQuestion()
let setOfFllagedQuestion;
let set; // de el set elli hatshel el flagged questions
// index of question

// this is what will happen in page load
window.addEventListener("load", function () {
  //   initTimer(); //hya el btbd2 el w2t
  dispalyQuestion(currentIndex);
  // get  the flagget set
  if (this.localStorage.getItem("setOfFllagedQuestion")) {
    setOfFllagedQuestion = JSON.parse(
      this.localStorage.getItem("setOfFllagedQuestion")
    );
    setOfFllagedQuestion.forEach((element) => {
      displayFlaggedQuestions(element);
    });
  } else {
    setOfFllagedQuestion = [];
  }

  set = new Set(setOfFllagedQuestion); // to convert the arr to set 3shan amna3 ay dublication fel array bta3t el flagged questions
  console.log(set);
});

const totalTime = 5 * 60; // (5 minutes)
let intervalId; // ref to the time upadting to enbale me of claring the time later
function updateTime() {
  let CurrentTime = new Date().getTime(); // Current time in milliseconds
  let finishTime = localStorage.getItem("FinishTime"); // Retrieve finish time from localStorage
  // the use of this check is when the user exists the exam .. and time is up whike he is outside of the page
  // trying to be smart and extebd his time .. (trying to fool me the idiot )
  if (!finishTime) {
    clearInterval(intervalId);
    localStorage.removeItem("FinishTime");
    timeDiv.innerHTML = "Time's up!";
    window.location.replace("./timeOut.html"); // here should aslo navigate to result page
    return; // 3shan mkmlsh ba2y el function
  }

  let remainingTime = Math.max(
    Math.floor((finishTime - CurrentTime) / 1000),
    0
  ); // Calculate remaining time in seconds

  if (remainingTime <= 0) {
    clearInterval(intervalId);
    localStorage.removeItem("FinishTime"); // Clear end time when timer is done
    timeDiv.innerHTML = "Time's up!";
    window.location.replace("./timeOut.html"); // navigate to result page
    // here should clear all the local storage
  } else {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timeDiv.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
}

function startTime() {
  let CurrentTime = new Date().getTime(); // Current time in milliseconds
  console.log(CurrentTime, " this is current time ");

  const FinishTime = CurrentTime + totalTime * 1000; // Calculate end time in milliseconds
  console.log(FinishTime, "ths is finish time");

  localStorage.setItem("FinishTime", FinishTime); // Store finish time in localStorage in case of page reload
  updateTime(); // Immediately update time
  intervalId = setInterval(updateTime, 1000); // no will call the setInterval wich will call implecictly the update time method(call back)
}

function initTimer() {
  let finshTime = localStorage.getItem("FinishTime");
  if (!finshTime) {
    // If there's no saved end time, start a new timer
    startTime();
  } else {
    //  resume from the saved end time
    updateTime();
    intervalId = setInterval(updateTime, 1000);
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////FEATCH DATA////////////////////////////////////////
let questionDiv = document.querySelector(".question");
let answers = document.querySelector(".answers");
let answer1 = document.querySelectorAll(".answers p")[0];
let answer2 = document.querySelectorAll(".answers p")[1];
let answer3 = document.querySelectorAll(".answers p")[2];
let answer4 = document.querySelectorAll(".answers p")[3];
let forwardBtn = document.querySelector(".for");
let BackwordBtn = document.querySelector(".back");

let numberOfQuwstion = document.querySelector(".numberofQuestion p");
let flag = document.querySelector(".QDiv i");
let divOfFlags = document.querySelector(".flags");
let parentOfFlags = $(".secondRow");
parentOfFlags.hide();
function dispalyQuestion(currentIndex) {
  questionDiv.innerHTML = currentQuestions[currentIndex].question;
  answer1.innerHTML = currentQuestions[currentIndex].A;

  answer2.innerHTML = currentQuestions[currentIndex].b;

  answer3.innerHTML = currentQuestions[currentIndex].c;

  answer4.innerHTML = currentQuestions[currentIndex].d;

  numberOfQuwstion.innerHTML = `${currentIndex + 1} out of 10`;
}
/////////////////////////////////////////////////////////
forwardBtn.addEventListener("click", function () {
  if (currentIndex < 9) {
    currentIndex++;
    dispalyQuestion(currentIndex);
    localStorage.setItem("currentIndex", currentIndex);
  }
});
//////////////////////////////////////////////////////////////////
BackwordBtn.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
    dispalyQuestion(currentIndex);
    localStorage.setItem("currentIndex", currentIndex);
  }
});
/////////////////////////////////////////////////////////////////
let arrayOfIndex = [];
flag.addEventListener("click", function () {
  // this.classList.add("activeFlag");
  // console.log(this);
  $(".flags").empty(); // to empty the flaged question div to overrwite on iy

  set.add(currentIndex);
  Array.from(set).forEach((element) => {
    displayFlaggedQuestions(element);
  });

  console.log(set);
  localStorage.setItem("setOfFllagedQuestion", JSON.stringify(Array.from(set)));
  // now overwrite on the set in the local storage
});

$(divOfFlags).on("click", ".mx-2", function (e) {
  let flagedQuestionIndex = Number(this.innerText) - 1;
  currentIndex = flagedQuestionIndex;
  dispalyQuestion(flagedQuestionIndex);
});
///////////////////////////////////////////////////////
let prev = null;
let currentChoice = null;
answers.addEventListener("click", function (e) {
  prev = currentChoice;
  currentChoice = e.target;
  if (prev) {
    prev.classList.remove("active");
  }
  e.target.classList.toggle("active");
});

function displayFlaggedQuestions(currentIndex) {
  parentOfFlags.slideDown(1000);
  let flagedQuestion = document.createElement("div");
  flagedQuestion.classList.add(
    "mx-2",
    "px-3",
    "py-1",
    "fs-5",
    "fw-medium",
    "rounded-1"
  );
  flagedQuestion.innerHTML = `${currentIndex + 1}`;

  divOfFlags.append(flagedQuestion);
}
