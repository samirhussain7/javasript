export default function themeChanger() {
    const themeChangerBtn = document.querySelector('.theme')
    const moonIcon = themeChangerBtn.querySelector('i')
    
    themeChangerBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark')
        
        if(document.body.classList.contains('dark')) {
            themeChangerBtn.querySelector('span').innerText = "Light Mode"
            moonIcon.classList.remove('ri-moon-line')
            moonIcon.classList.add('ri-moon-fill')
        }else {
            themeChangerBtn.querySelector('span').innerText = "Dark Mode"
            moonIcon.classList.remove('ri-moon-fill')
            moonIcon.classList.add('ri-moon-line')
        }
    })

}