const display = document.getElementById("display");
const buttons = document.querySelectorAll("#keys button[data-value]");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const chaosToggle = document.getElementById("chaosToggle");

let chaosMode = false;
let chaosInterval = null;

const originalNumbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

function shuffleArray(array) {
  let copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function getNumberButtons() {
  return [...document.querySelectorAll('#keys button[data-value]')].filter(
    button => !isNaN(button.dataset.value)
  );
}

function shuffleNumberButtons() {
  const numberButtons = getNumberButtons();
  const shuffled = shuffleArray(originalNumbers);

  numberButtons.forEach((button, index) => {
    button.dataset.value = shuffled[index];
    button.textContent = shuffled[index];
  });
}

function resetNumberButtons() {
  const numberButtons = getNumberButtons();

  numberButtons.forEach((button, index) => {
    button.dataset.value = originalNumbers[index];
    button.textContent = originalNumbers[index];
  });
}

chaosToggle.addEventListener("click", () => {
  chaosMode = !chaosMode;
  chaosToggle.classList.toggle("active");
 

  if (chaosMode) {
    dodgeCount = 0;
    shuffleNumberButtons();
    chaosInterval = setInterval(shuffleNumberButtons, 3000);
  } else {
    clearInterval(chaosInterval);
    resetNumberButtons();
    equalsBtn.style.transform = "translate(0, 0)";
    dodgeCount = 0;
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (!value) return;

    // chaos rule for 6
    if (chaosMode && value === "6") {
      for (let i = 0; i < 4; i++) {
        display.value += "67";
      }
      return;
    }

    display.value += value;
  });
});


clearBtn.addEventListener("click", () => {
  display.value = "";
});

const chaosAnswers = {
  "2+2": "2 + 2",
  "1+1": "window",
  "3*5": "banana",
  "9+10": "21",
  "3+1": "5",
  "5-2": "10",
  "5*5": "uhmm, idk?",
  "8/2": "4, but also 3.9999999999999996",
  "9+8": "Not smart enough for that m8",

};

let dodgeCount = 0;
const maxDodges = 7;

equalsBtn.addEventListener("click", () => {
  console.log("equals clicked");

  try {
    const equation = display.value.trim();

    if (chaosMode && chaosAnswers[equation]) {
      display.value = chaosAnswers[equation];
    } else {
      display.value = eval(equation);
    }
  } catch {
    display.value = "Error";
  }

  equalsBtn.style.transform = "translate(0, 0)";
  dodgeCount = maxDodges;
});

equalsBtn.addEventListener("mouseenter", () => {
  if (!chaosMode) return;
  if (dodgeCount >= maxDodges) {
    equalsBtn.style.transform = "translate(0, 0)";
    return;
  }

  dodgeCount++;

  const x = Math.floor(Math.random() * 160) - 80;
  const y = Math.floor(Math.random() * 160) - 80;

  equalsBtn.style.transform = `translate(${x}px, ${y}px)`;
});
