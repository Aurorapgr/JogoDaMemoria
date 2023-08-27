const front = 'cardFront';
const back = 'cardBack';
const Card = 'card' ;

let fotos = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8'
]


startGame()
createCardsFromFotos(fotos)

function startGame(){
    let cards = createCardsFromFotos(fotos);
    console.log(cards)
    shuffleCards(cards);
    initializeCards(cards)
} 

function flipCard(){
    this.classList.add('flip')
}

function createCardsFromFotos(fotos){
    let cards = [];

    fotos.forEach(foto=>{
        cards.push(createPairFromFoto(foto))
    })
    return cards.flatMap(pair => pair)
}
function initializeCards(cards){
    let board = document.getElementById("gameBoard");

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

function shuffleCards(cards){
    let currentIndex = cards.length;
    let randomIndex = 0;
    
    while(currentIndex !== 0){
        randomIndex =  Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];  
    }
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



function createPairFromFoto(foto){
    return [{
        id: createIdWithFoto(foto),
        icon: foto,
        flipped: false
    },{
        id: createIdWithFoto(foto),
        icon: foto,
        flipped: false
    }]
}


function createIdWithFoto(foto){
    return foto + parseInt(Math.random() * 1000)
}


