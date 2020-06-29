// let section = document.getElementsByClassName("memory-game");
// function newDivc(){
//     let newDiv = document.createElement('div');
//     newDiv.setAttribute("class","memory-cards");
//     section.appendChild(newDiv);
// };
// function frontImageCard(){
//     for (let i = 1; i < 10; i++) {
//         var img = document.createElement("img");
//         img.src = "starting_over/card_img/ff7_01" + i;
//         newDivc.appendChild(img);
//     };
// };

const cards = document.querySelectorAll(".memory-card");
let cardFlipped = false;
let waitCard = false;
let firstCard, secondCard;
let countMoves = document.getElementById("moves");
let moves = 18;
let matched = 0;


// Card Flip
function cardFlip(){
    if (waitCard) return;
    if(this === firstCard) return;

    this.classList.add("flip");

    if(!cardFlipped){
        // first card flipped
        cardFlipped = true;
        firstCard = this;
        return;
    };
    // second card flipped
    secondCard = this;
    checkMatch();
};
// Check Match = True or False
function checkMatch(){
    let check = firstCard.dataset.framework === secondCard.dataset.framework;
    check ? matchCard() : notMatch();
};
// Card Match = True
function matchCard(){
    firstCard.removeEventListener("click", cardFlip);
    secondCard.removeEventListener("click", cardFlip);
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    matched ++;
    let didMatch = document.getElementById('points');
    didMatch.textContent = `Match: ${matched}`;
    moves --;
    let displayMoves = document.getElementById('moves');
    displayMoves.textContent = `Move(s): ${moves}`;
    resetCards();
};
// Mismatch = False
function notMatch(){
    waitCard = true;
    setTimeout(() =>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        moves --;
        let displayMoves = document.getElementById('moves');
        displayMoves.textContent = `Move(s): ${moves}`;
        console.log(moves);

        resetCards();
    }, 1500);
};
// Resetting the Cards
function resetCards(){
    [cardFlipped, waitCard] = [false, false];
    [firstCard, secondCard] = [null, null]
};
// Randomizer
(function shuffleCards(){
    cards.forEach(card =>{
        let ranDom = Math.floor(Math.random() * 16); // dimensions
        card.style.order = ranDom;
    });
})(); // "()" this function will execute right after it's def. // IIFE 

// Final Results [NOT WORKING]
function popUp(){
    if (moves <= 0 || matched == 8){
        let popScore = document.getElementsByClassName("popup");
        popScore.classList.add("show");
        document.getElementById("finalScore").innerHTML = matched;
        document.getElementById("result").innerHTML = tallyPoints(matched);
    };
};
function tallyPoints(){
    if (matched.length == 8){
        console.log('Perfect!');
    } else if (matched.length <= 7 && matched.length >= 5){
        console.log('Good job!');
    } else if (matched.length <= 4 && matched.length > 3){
        console.log('Nice try!');
    } else {
        console.log('Better luck next time.');
    };
};
//

cards.forEach(card => card.addEventListener("click", cardFlip));