// To safe variable from global scope, we can use IIFE (Immediately Invoked Function Expression) to wrap our code in a function and call it immediately. This way, all the variables defined inside the function will not be accessible from the global scope.
(function(){

    const btn = document.querySelector('.btn')
    const coin = document.querySelector('.coin')
    const h2 = document.querySelector('.result')
    
    
    btn.addEventListener('click', function() {
        coin.classList.toggle('flip')
        const rs = Math.random() <= 0.5 ? "Heads": "Tails";
    
        if(rs == 'Heads') {
            coin.setAttribute('src', './resources/heads.svg')
        }
    
        if(rs == 'Tails') {
            coin.setAttribute('src', './resources/tails.svg')
        }
    
        setTimeout(() => {
            h2.textContent = rs;
        }, 600)
        
    })

})();