const themeChangerBtn = document.querySelector('.theme')
export default function themeChanger() {
    themeChangerBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark')
        
        if(document.body.classList.contains('dark')) {
            themeChangerBtn.textContent = "Light Mode"
        }else {
            themeChangerBtn.textContent = "Dark Mode"
        }
    })

}