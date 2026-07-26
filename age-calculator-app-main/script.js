const form = document.querySelector("form");
const dayInput = document.querySelector("#day");
const dayLabel = document.querySelector(".day label");

const monthInput = document.querySelector("#month");
const monthLabel = document.querySelector(".month label");

const yearInput = document.querySelector("#year");
const yearLabel = document.querySelector(".year label");
const output_box = document.querySelector(".output-box");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dayVal = Number(dayInput.value);
  const monthVal = Number(monthInput.value);
  const yearVal = Number(yearInput.value);

  const currentDate = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const year = date.getFullYear() - yearVal;
    const strMonth = String(date.getMonth() + 1).padStart(2, "0");
    const month = Number(strMonth) - monthVal;
    const strDay = String(date.getDate()).padStart(2, "0");
    const day = Number(strDay) - dayVal;

    return { day, month, year, currentYear };
  };

  const { day, month, year, currentYear } = currentDate();

  // Day checking
  if (dayVal == "" || dayVal > 31 || dayVal < 1) {
    dayInput.classList.add("err-border");
    dayInput.classList.add("vibrate");
    dayLabel.classList.add("text-red");
    return;
  } else {
    dayInput.classList.remove("err-border");
    dayInput.classList.remove("vibrate");
    dayLabel.classList.remove("text-red");
  }
  // Month checking
  if (monthVal == "" || monthVal < 1 || monthVal > 12) {
    monthInput.classList.add("err-border");
    monthInput.classList.add("vibrate");
    monthLabel.classList.add("text-red");
    return;
  } else {
    monthInput.classList.remove("err-border");
    monthInput.classList.remove("vibrate");
    monthLabel.classList.remove("text-red");
  }
  // Year checking
  if (yearVal == "" || yearVal < 1 || yearVal > currentYear) {
    yearInput.classList.add("err-border");
    yearInput.classList.add("vibrate");
    yearLabel.classList.add("text-red");
    return;
  } else {
    yearInput.classList.remove("err-border");
    yearInput.classList.remove("vibrate");
    yearLabel.classList.remove("text-red");
  }

  if (dayVal && monthVal && yearVal) {
    output_box.innerHTML = "";
    output_box.innerHTML = `<h4>Born in <span>${dayVal}</span>/ <span>${monthVal}</span>/ <span>${yearVal}</span></h4>
                                <h2><span>${year}</span> years</h2>
                                <h2><span>${Math.abs(month)}</span> months</h2>
                                <h2><span>${Math.abs(day)}</span> days</h2>`;
  } else {
    output_box.innerHTML = `<h4>Born in <span>--</span>/ <span>--</span>/ <span>--</span></h4>
                                <h2><span>--</span> years</h2>
                                <h2><span>--</span> months</h2>
                                <h2><span>--</span> days</h2>`;
  }

  form.reset();
});