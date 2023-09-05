import {game} from './game.js'


const front = 'cardFront';
const back = 'cardBack';
const Card = 'card' ;




startGame()

let a = document.getElementById('restart');
a.addEventListener('click', restart)



function startGame(){
    let cards = game.createCardsFromFotos();
    initializeCards(cards)
} 



function initializeCards(cards){
    let board = document.getElementById("gameBoard");
    board.innerHTML = ''
    cards.forEach((card)=>{ 
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(Card);
        cardElement.dataset.icon = card.icon;
        
        createCardContent(card, cardElement)
        
        
        cardElement.addEventListener('click', flipCard)
        
        board.appendChild(cardElement)
    })
}



function createCardContent(card, cardElement){
    
    createCardFace(front, card, cardElement);
    createCardFace(back, card, cardElement);
    
}   

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === front){
        let img = document.createElement('img');
        img.src = "./img/"+ card.icon + ".jpg";
        cardElementFace.appendChild(img)
    }else{
        cardElementFace.innerHTML = "&lt;/&gt;"
    }
    element.appendChild(cardElementFace);
}
function flipCard(){
    if(game.setCard(this.id)){
        this.classList.add('flip');
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards()
            }else{
                setTimeout(()=>{
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);

                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflipCards();
                }, 1000)
            };
        }
    }
}

function restart(){
    startGame();
    let a = document.querySelector('.backDrop');
    a.style.zIndex = -1;
}






