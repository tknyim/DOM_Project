// Cards in JS
// const cards =[
// ["card","1","./imgs/ff7_01.png"],
// ["card","2","./imgs/ff7_02.png"],
// ["card","3","./imgs/ff7_03.png"],
// ["card","4","./imgs/ff7_04.png"],
// ["card","5","./imgs/ff7_05.png"],
// ["card","6","./imgs/ff7_07.png"],
// ["card","7","./imgs/ff7_08.png"],
// ["card","8","./imgs/ff7_011.png"]
// ].map(cardArr=>{
//     return {
//         id:cardArr[0],
//         node:createCard(cardArr[0]),
//         sideShown:'front',
//         value:cardArr[1],
//         faceImage:cardArr[2]
//     }
// });

const cards = document.querySelectorAll(".cards");
let cardFlipped = false;
let waitCard = false; // lock the cards from choosing more than one
let firstCard, secondCard;
let countMoves = document.getElementById("moves");
let moves = 16;
let matched = 0;
// let popOut = document.getElementById(("tally"));
let myMusic = document.getElementById("my-back");
let myMatch = document.getElementById("match-sound");
let myMiss = document.getElementById("wrong-sound");
let myWin = document.getElementById("win-sound");
let myLoss = document.getElementById("lose-sound");
let myMistake = document.getElementById("no-chance");


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
// Check Match = Ternary
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
    myMatch.play()
    matchMove();
    popUp();
    // resetCards();
};
// Mismatch = False
function notMatch(){
    waitCard = true;
    setTimeout(() =>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        firstCard.classList.add("mismatch");
        secondCard.classList.add("mismatch");
        noMatch()
        popUp();
        // resetCards();
    }, 1000);
};
function noMatch(){
    moves --;
    let displayMoves = document.getElementById('moves');
    displayMoves.textContent = `Move(s): ${moves}`;
    console.log(moves);
    myMiss.play();
}

// Resetting the Cards
function resetCards(){
    [cardFlipped, waitCard] = [false, false];
    [firstCard, secondCard] = [null, null]
};
// Randomizer
(function shuffleCards(){
    cards.forEach(card =>{
        let ranDom = Math.floor(Math.random() * 16); // dimensions
        card.style.order = ranDom; // randomize the order of items
    });
})(); // "()" this function will execute as soon as it is defined. // IIFE (Immediately Invoked Function Expression)

// Score Counter
function matchMove(){
    matched ++;
    let didMatch = document.getElementById('points');
    didMatch.textContent = `Matched: ${matched}`;
    moves --;
    let displayMoves = document.getElementById('moves');
    displayMoves.textContent = `Move(s): ${moves}`;
};

// Tweaked add-on *** I'll figure it out later
// function zeroMatch(){
//     let stopMus = myMusic.pause()
//     let playMis = myMistake.play()
//     if (moves = 12 && matched <= 2){
//         alert("You're bad")
//         // return [stopMus, playMis, shuffleCards()]
//     } else {
//         resetCards()
//     };
// };

// Final Results
function popUp(){
    if (moves == -1){
        moves ++;
    } else if (moves == 0 || matched == 8){
        tallyPoints();
        shuffleCards();
    } else {
        resetCards();
    };
};   
function tallyPoints(){
    if (matched == 8){
        myMatch.pause()
        myMusic.pause()
        myWin.play()
        setTimeout(()=>{
            alert(`Your score is ${matched}, perfect!` + "\n" + "Click on Cloud to restart the game! 😁");
            // location.reload();
        }, 1000)
    } else if (matched <= 7 && matched >= 5){
        myMatch.pause()
        myMusic.pause()
        myLoss.play()
        setTimeout(()=>{
            alert(`Your score is ${matched}, good job!` + "\n" + 'Game will restart after pressing "OK" 🙂');
            waitCard = true;
            location.reload();
        }, 1000)
    } else if (matched <= 4 && matched > 3){
        myMatch.pause()
        myMusic.pause()
        myLoss.play()
        setTimeout(()=>{
            alert(`Your score is ${matched}, nice try!` + "\n" + 'You can do better! Game will restart after pressing "OK" 🙃');
            waitCard = true;
            location.reload();
        }, 1000)
    } else {
        myMatch.pause()
        myMusic.pause()
        myMistake.play()
        setTimeout(()=>{
            alert(`Your score is ${matched}, better luck next time. 🤡`);
            waitCard = true;
            location.reload();
        }, 1500)
    };
};

// Background music volume
myMusic.volume = 0.5;

// Restart
function restartMatch(){
    location.reload()
};
cards.forEach(card => card.addEventListener("click", cardFlip));