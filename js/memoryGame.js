card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("cardDeck");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// array for opened cards
var current = [];

//begin game on page load
startGame();

//Fisher-Yates Shuffle
//adapted from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var currentIndex = array.length, temp, i;

    while (currentIndex) {
        i = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temp = array[currentIndex];
        array[currentIndex] = array[i];
        array[i] = temp;
    }

    return array;
};

// function to start a new play 
function startGame(){
 
    // empty the array (just so we know we reset it)
    current = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
}

// used to 
var displayCard = function(){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function cardOpen() {
    current.push(this);
    var len = current.length;
    if(len === 2){
        if(current[0].value === current[1].value){
            matched();
        } else {
            unmatched();
        }
    }
};


// @description when cards match
function matched(){
    current[0].classList.add("match", "disabled");
    current[1].classList.add("match", "disabled");
    current[0].classList.remove("show", "open", "no-event");
    current[1].classList.remove("show", "open", "no-event");
    current = [];
}


// description when cards don't match
function unmatched(){
    current[0].classList.add("unmatched");
    current[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        current[0].classList.remove("show", "open", "no-event","unmatched");
        current[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        current = [];
    },1100);
}


// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

for( var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
};