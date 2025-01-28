let startBtn = document.querySelector("a");
console.log(startBtn);
let questinosArr;
let currentQuestions; // this is my random questions array to put it HERE in localStorage   >> to be used in the next page
let currentIndex = 0; // this is to know where iam standing in my array of questions >> to be used in the next page

window.addEventListener("load", function () {
  // 3ayez hena a3mel check 3al  local lw kan alsun feha arrayOfQuestion abl ma a3ml fetch
});
// async function getQuestions() {
//   let questionsRecponce = await fetch("./questions.json");
//   console.log(questionsRecponce);

//   questinosArr = await questionsRecponce.json();
//   currentQuestions = [...getTenRundomQuestions(questinosArr)];
//   console.log(currentQuestions);
// }

async function getQuestions() {
  try {
    // Fetch the questions
    let questionsResponse = await fetch("./questions.json");
    console.log(questionsResponse);

    // Check if the response is okay
    if (!questionsResponse.ok) {
      // throw new Error(
      //   "Failed to fetch questions. HTTP status: " + questionsResponse.status
      // );
      window.location.replace("./error.html");
    }

    // Parse JSON data
    let questionsArr = await questionsResponse.json();
    // Check if the array is empty
    if (questionsArr.length === 0) {
      window.location.replace("./error.html");
      status = "empty"; // No questions found
      console.log("Status:", status);
    } else {
      // If data is available, update status
      status = "success";
      console.log("Status:", status);

      currentQuestions = [...getTenRundomQuestions(questionsArr)];
      console.log(currentQuestions);
      localStorage.setItem(
        "arrayOfQuestions",
        JSON.stringify(currentQuestions)
      );
      window.localStorage.setItem("currentIndex", currentIndex);
    }
  } catch (error) {
    // Update status on error
    window.location.replace("./error.html");
    status = "error";
    console.error("Status:", status, "| Error Message:", error.message);
  }
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
  if (localStorage.getItem("arrayOfQuestions")) {
    console.log("mwgoda");
    currentQuestions = JSON.parse(localStorage.getItem("arrayOfQuestions"));
    console.log(currentQuestions);
    window.location.replace("./examPage.html");
  } else {
    console.log("msh mwgoda");
    getQuestions();
    window.location.replace("./examPage.html");
  }
});
