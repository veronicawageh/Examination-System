///////////TIME FEATURE
let timeDiv = document.querySelector(".time p");
console.log(timeDiv);

window.addEventListener("load", function () {
  //   initTimer(); //hya el btbd2 el w2t
  getQuestions(); //get questions
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
/////////////////////////////////
////////////FEATCH DATA
let questionDiv = document.querySelector(".question");
let answer1 = document.querySelectorAll(".answers p")[0];
let answer2 = document.querySelectorAll(".answers p")[1];
let answer3 = document.querySelectorAll(".answers p")[2];
let answer4 = document.querySelectorAll(".answers p")[3];
let forwardBtn = document.querySelector(".for");
let BackwordBtn = document.querySelector(".back");

let currentIndex = 0;
let numberOfQuwstion = document.querySelector(".numberofQuestion p");
let flag = document.querySelector(".QDiv i");
let divOfFlags = document.querySelector(".flags");
let parentOfFlags = $(".secondRow");
parentOfFlags.hide();
console.log(parentOfFlags);
let questinosArr;
let currentQuestions;

async function getQuestions() {
  let questionsResponse = await fetch("./question.json");
  console.log(questionsResponse);

  questinosArr = await questionsResponse.json();
  currentQuestions = [...questinosArr];
  console.log(currentQuestions);
  dispalyQuestion(currentIndex);
}

function dispalyQuestion(currentIndex) {
  questionDiv.innerHTML = currentQuestions[currentIndex].question;
  answer1.innerHTML = currentQuestions[currentIndex].A;
  answer2.innerHTML = currentQuestions[currentIndex].b;
  answer3.innerHTML = currentQuestions[currentIndex].c;
  answer4.innerHTML = currentQuestions[currentIndex].d;
  numberOfQuwstion.innerHTML = `${currentIndex + 1} out of 10`;
}

forwardBtn.addEventListener("click", function () {
  if (currentIndex < 9) {
    currentIndex++;
    dispalyQuestion(currentIndex);
  }
});

BackwordBtn.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
    dispalyQuestion(currentIndex);
  }
});

flag.addEventListener("click", function () {
  parentOfFlags.slideDown(1000);
  let flagedQuestion = document.createElement("div");
  flagedQuestion.classList.add("mx-2");
  flagedQuestion.classList.add("px-3");
  flagedQuestion.classList.add("py-1");
  flagedQuestion.classList.add("fs-5");
  flagedQuestion.classList.add("fw-medium");
  flagedQuestion.classList.add("rounded-1");
  flagedQuestion.innerHTML = `${currentIndex + 1}`;

  divOfFlags.append(flagedQuestion);
});
