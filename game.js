export {game};



let game ={
    lockMode: false,
    firstCard: null,
    secondCard: null,
    cards: null,
    fotos: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8'
    ],
    setCard: function(id){
        let card = this.cards.filter(card => card.id === id)[0];

        if(card.flipped || this.lockMode){
            return false
        };
        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true
            this.lockMode = true;
            return true
        }
    },
    checkMatch: function(){
        console.log(this.firstCard)
        console.log(this.secondCard)
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon;
    },
    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    unflipCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },
    createCardsFromFotos: function (){
        this.cards = [];
        this.fotos.forEach(foto=>{
            this.cards.push(this.createPairFromFoto(foto))
        })
        this.cards =  this.cards.flatMap(pair => pair);
        this.shuffleCards();

        return this.cards;
    },

    createPairFromFoto: function (foto){
        return [{
            id: this.createIdWithFoto(foto),
            icon: foto,
            flipped: false
        },{
            id: this.createIdWithFoto(foto),
            icon: foto,
            flipped: false
        }]
    },
    createIdWithFoto: (foto)=>{
        return foto + parseInt(Math.random() * 1000)
    },
    shuffleCards: function (){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
        
        while(currentIndex !== 0){
            randomIndex =  Math.floor(Math.random() * currentIndex);
            currentIndex--;
            
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];  
        }
    },
    
}
