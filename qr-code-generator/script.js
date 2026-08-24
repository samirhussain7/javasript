const btn = document.querySelector("button");
const input = document.querySelector("input[name='input']");
const input_container = document.querySelector(".input-container");
const output_container = document.querySelector(".output-container");
const img = document.querySelector(".qr-code");
const download_btn = document.querySelector(".download");


btn.addEventListener("click", function () {

  if(input.value) {
    const qr_img = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`;
    img.src = qr_img;
    output_container.style.display = "flex";
    input_container.style.display = "none";
    input.value = "";
  } else {
    document.querySelector('.input').style.border = "3px solid crimson"
  }

});