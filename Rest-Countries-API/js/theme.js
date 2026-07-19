export default function themeChanger() {
  const themeChangerBtn = document.querySelector(".theme");
  const moonIcon = themeChangerBtn.querySelector("i");
  const textSpan = themeChangerBtn.querySelector("span");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    textSpan.innerText = "Light Mode";
    moonIcon.classList.remove("ri-moon-line");
    moonIcon.classList.add("ri-moon-fill");
  }

  themeChangerBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      textSpan.innerText = "Light Mode";
      moonIcon.classList.remove("ri-moon-line");
      moonIcon.classList.add("ri-moon-fill");

      localStorage.setItem("theme", "dark");
    } else {
      textSpan.innerText = "Dark Mode";
      moonIcon.classList.remove("ri-moon-fill");
      moonIcon.classList.add("ri-moon-line");

      localStorage.removeItem("theme");
    }
  });
}
