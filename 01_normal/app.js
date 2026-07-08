const para = document.getElementsByClassName('para')

Array.from(para).forEach((elem) => {
    elem.addEventListener('click', () => {
        elem.classList.toggle('line-through')
    })
})

