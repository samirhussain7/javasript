const btn = document.querySelector('button')
const input = document.querySelector("input[name='input']")
const input_container = document.querySelector('.input-container')
const output_container = document.querySelector('.output-container')
const img = document.querySelector('.qr-code')
const download_btn = document.querySelector('.download')

// const API = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`

btn.addEventListener('click', function() {
    if(input.value.trim() === '') {
        console.error("input is empty");
        return;
    }
    console.log(input.value);
    
})