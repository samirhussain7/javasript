// IIFE
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