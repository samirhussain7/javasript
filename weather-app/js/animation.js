
function animation() {
    const h1 = document.querySelector('h1')
    const text = h1.textContent.trim();
    const sp = text.split('').map((char) => {
        if(char == ' ') {
            return " ";
        } else if (char == 'e') {
            return `<span>${char}</span> <br class="md:hidden">`
        } else if (char == 'g') {
            return `<span>${char}</span> <br class="md:hidden">`
        }
        return `<span>${char}</span>`
    }).join("")
    
    h1.innerHTML = sp;
    const span = document.querySelectorAll('h1 span')
    span.forEach((elem) => elem.style.display = 'inline-block')
    

    // nav
    gsap.from('nav', {
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
    })
    
    gsap.from('h1 span', {
        y: 120,
        opacity: 0, 
        delay: 0.5,
        duration: 0.5,
        stagger: 0.02
    })


}

export default animation;