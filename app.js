let userScore = 0;
let compScore = 0;
let roundsPlayed = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScoreB = document.querySelector("#user-score");
const compScoreB = document.querySelector("#comp-score");
const round=document.querySelector(".a");

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (roundsPlayed < 10) {
        
        round.innerText = roundsPlayed+1;
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
    }
  });
});

const playGame = (userChoice) => {
  const compChoice = genComp();
  if (userChoice === compChoice) {
    msg.innerText = `Game Draw`;
    msg.style.backgroundColor = "gray";
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userChoice, compChoice);
  }

  roundsPlayed++;
  checkGameEnd();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScoreB.innerText = userScore;
    msg.innerText = `Your ${userChoice} beats the ${compChoice}. You win!`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScoreB.innerText = compScore;
    msg.innerText = `${compChoice} beats your ${userChoice}. You lose!`;
    msg.style.backgroundColor = "red";
  }
};

const checkGameEnd = () => {
  if (userScore === 10 || compScore === 10 || roundsPlayed === 10) {
    let resultMessage = "";
    if (userScore > compScore) {
      resultMessage = "Congratulations! You won the game!";
    } else if (compScore > userScore) {
      resultMessage = "Sorry! The computer won the game.";
    } else {
      resultMessage = "It's a draw!";
    }
    showPopup(resultMessage);
  }
};

const showPopup = (resultMessage) => {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
    <h2>${resultMessage}</h2>
    <button id="play-again">Play Again</button>
  `;
  document.body.appendChild(popup);

  document.getElementById("play-again").addEventListener("click", () => {
    resetGame();
    document.body.removeChild(popup);
  });
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  roundsPlayed = 0;
  userScoreB.innerText = userScore;
  compScoreB.innerText = compScore;
  msg.innerText = "Let's Play!";
  msg.style.backgroundColor = "";
  round.innerText=0;
};

const genComp = () => {
  const options = ["rock", "paper", "scissors"];
  const ranIdx = Math.floor(Math.random() * 3);
  return options[ranIdx];
};
