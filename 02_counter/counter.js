// selecting elements
const leftH2 = document.querySelector(".text").children[0];
const rightH2 = document.querySelector(".text").children[2];
const leftBtn = document.querySelector(".btns").children[0];
const rightBtn = document.querySelector(".btns").children[1];
rightBtn.disabled = true;
rightBtn.style.cursor = "not-allowed";

let a = (leftH2.textContent = 10);
let b = (rightH2.textContent = 0);

function eventsHandling() {
  leftBtn.addEventListener("click", () => {
    --a; // a = a - 1
    if (a >= 0) {
      leftH2.textContent = a;
      b = 10 - a;
      rightH2.textContent = b;

      if (a == 0) {
        leftBtn.style.cursor = "not-allowed";
        leftBtn.disabled = true;
        rightBtn.disabled = false;
        rightBtn.style.cursor = "pointer";
      }
    }
  });

  rightBtn.addEventListener("click", () => {
    --b; // b = b - 1
    if (b >= 0) {
      rightH2.textContent = b;
      a = 10 - b;
      leftH2.textContent = a;

      if (b == 0) {
        rightBtn.style.cursor = "not-allowed";
        rightBtn.disabled = true;
        leftBtn.disabled = false;
        leftBtn.style.cursor = "pointer";
      }
    }
  });
}

eventsHandling();