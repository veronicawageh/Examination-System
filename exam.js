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
  initTimer(); //hya el btbd2 el w2t
  dispalyQuestion(currentIndex);
  // get  the flagget set
  updateButtonState();
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

    clearLocalStorage();
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

    clearLocalStorage();
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
let submitBtn = $(".divbuton button");

let numberOfQuwstion = document.querySelector(".numberofQuestion p");
let flag = document.querySelector(".QDiv i");
let divOfFlags = document.querySelector(".flags");
let parentOfFlags = $(".secondRow");
parentOfFlags.hide();

function dispalyQuestion(currentIndex) {
  flag.classList.remove("activeFlag"); // 3shan 3mello remove awel ma agi a display l7ad ma a3mel check eza kan flaged aslun walla la2
  questionDiv.innerHTML = currentQuestions[currentIndex].question;
  answer1.innerHTML = currentQuestions[currentIndex].A;

  answer2.innerHTML = currentQuestions[currentIndex].b;

  answer3.innerHTML = currentQuestions[currentIndex].c;

  answer4.innerHTML = currentQuestions[currentIndex].d;

  numberOfQuwstion.innerHTML = `${currentIndex + 1} out of 10`;

  let answer = localStorage.getItem(currentIndex);
  removeActive();
  MarkPreviouslySelectedAnswer(answer);

  if (checkIfQuestionIsFlagged()) {
    flag.classList.add("activeFlag");
  } else {
    flag.classList.remove("activeFlag");
  }
}
function removeActive() {
  answer1.classList.remove("active");
  answer2.classList.remove("active");
  answer3.classList.remove("active");
  answer4.classList.remove("active");
}
/////////////////////////////////////////////////////////
// forwardBtn.addEventListener("click", function () {
//   if (currentIndex < 9) {
//     currentIndex++;
//     dispalyQuestion(currentIndex);
//     console.log(currentIndex, "right");
//     localStorage.setItem("currentIndex", currentIndex);
//   }
// });
// //////////////////////////////////////////////////////////////////
// BackwordBtn.addEventListener("click", function () {
//   if (currentIndex == 1 || currentIndex == 0) {
//     this.classList.add("disable");
//   } else {
//     this.classList.remove("disable");
//   }
//   if (currentIndex > 0) {
//     currentIndex--;
//     dispalyQuestion(currentIndex);
//     console.log(currentIndex, "left");
//     localStorage.setItem("currentIndex", currentIndex);
//   }
// });

// Initialize the buttons' state based on the current index
function updateButtonState() {
  if (currentIndex <= 0) {
    BackwordBtn.classList.add("disable"); // Disable backward button
  } else {
    BackwordBtn.classList.remove("disable");
  }

  if (currentIndex >= 9) {
    forwardBtn.classList.add("disable"); // Disable forward button
  } else {
    forwardBtn.classList.remove("disable");
  }
}

// Forward button event listener
forwardBtn.addEventListener("click", function () {
  if (currentIndex < 9) {
    currentIndex++;
    dispalyQuestion(currentIndex);
    console.log(currentIndex, "right");
    localStorage.setItem("currentIndex", currentIndex);
  }
  updateButtonState(); // Update button states
});

// Backward button event listener
BackwordBtn.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
    dispalyQuestion(currentIndex);
    console.log(currentIndex, "left");
    localStorage.setItem("currentIndex", currentIndex);
  }
  updateButtonState(); // Update button states
});

//////////////////////////////flag and unflag ///////////////////////////////////
let arrayOfIndex = [];
flag.addEventListener("click", function () {
  console.log(currentIndex);
  // this.classList.toggle("activeFlag"); // de htsh8al el flag e tetfeh awel amra
  // dlwa2ty htcheck hal el togel dafet walla shalet .. 3shan lw daft yb2a hdefo w lw shaleto yb2a hshelo mel set
  if (this.classList.contains("activeFlag")) {
    this.classList.remove("activeFlag");
    $(".flags").empty(); // to empty the flaged question div to overrwite on iy
    set.delete(currentIndex);
    console.log(set);
    if (set.size === 0) {
      parentOfFlags.slideUp(1000);
    } else {
      Array.from(set).forEach((element) => {
        displayFlaggedQuestions(element);
      });
    }
  } else {
    this.classList.add("activeFlag");
    set.add(currentIndex);
    displayFlaggedQuestions(currentIndex);
  }

  // console.log(set);
  // now overwrite on the set in the local storage
  localStorage.setItem("setOfFllagedQuestion", JSON.stringify(Array.from(set)));
});

$(divOfFlags).on("click", ".mx-2", function (e) {
  let flagedQuestionIndex = Number(this.innerText) - 1;
  currentIndex = flagedQuestionIndex;
  console.log(flagedQuestionIndex);
  localStorage.setItem("currentIndex", currentIndex);
  dispalyQuestion(flagedQuestionIndex);
});
///////////////////////////////////////////////////////
answers.addEventListener("click", function (e) {
  console.log(answers.children);
  removeActive();
  e.target.classList.toggle("active");
  localStorage.setItem(currentIndex, e.target.getAttribute("name"));
  currentQuestions[currentIndex].choosen_answer = e.target.innerText;
  // console.log(currentQuestions[currentIndex].choosen_answer);
  // console.log(currentQuestions);
  localStorage.setItem("arrayOfQuestions", JSON.stringify(currentQuestions));
});
////////////Handel Submit btn //////////////////////////////////////////
submitBtn.click(function () {
  let result = correctExam();
  localStorage.setItem("ExamResult", result);

  clearLocalStorage();

  if (result >= 6) {
    window.location.replace("./success.html");
  } else {
    window.location.replace("./fail.html");
  }
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

function clearCureentAnswer() {
  for (let i = 0; i < 10; i++) {
    localStorage.removeItem(i);
  }
}

function correctExam() {
  let ExamResult = 0; // msh 3ayez da bara kda *************
  currentQuestions.forEach((element) => {
    if (element.choosen_answer == element.correct_answer) {
      ExamResult++;
    }
  });
  return ExamResult;
}

function MarkPreviouslySelectedAnswer(answer) {
  if (answer) {
    switch (answer) {
      case "A":
        answer1.classList.add("active");
        break;
      case "B":
        answer2.classList.add("active");
        break;
      case "C":
        answer3.classList.add("active");
        break;
      case "D":
        answer4.classList.add("active");
        break;
    }
  }
}
function checkIfQuestionIsFlagged() {
  let flaggedArr =
    JSON.parse(localStorage.getItem("setOfFllagedQuestion")) || [];
  console.log("Flagged Questions Array:", flaggedArr); // Debug
  console.log("Current Index:", currentIndex); // Debug
  return flaggedArr.includes(currentIndex);
}

function clearLocalStorage() {
  localStorage.removeItem("setOfFllagedQuestion");
  localStorage.removeItem("currentIndex");
  localStorage.removeItem("FinishTime");
  localStorage.removeItem("arrayOfQuestions");
  clearCureentAnswer();
}
