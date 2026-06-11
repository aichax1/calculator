const display = document.getElementById("display");
const buttons = document.querySelectorAll("#keys button");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value) {
      display.value += value;
    }
  });
});

clearBtn.addEventListener("click", () => {
  display.value = "";
});

equalsBtn.addEventListener("click", () => {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
});


