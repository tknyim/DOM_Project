//Create a card function
// Add a single card to the page
// Add eventListener to the card *add eventlistener to a div/element* and have it do something
// Use the function to make several cards

// need functions for:

// card faced down
// card faced up
// reset
// card clicked
// create card
// my cards

const gameHolder = document.getElementById("game");
selected = null;
// points = 0;



// Card Dictionary [1]
let cards = [["card1","ff1","ff1.png"], ["card2","ff2","ff2.png"], ["card3","ff3","ff3.png"], ["card4","ff4","ff4.png"], ["card5","ff5","ff5.png"], ["card6","ff6","ff6.png"], ["card7","ff7","ff7.png"], ["card8","ff8","ff8.png"], ["card9","ff9","ff9.png"], ["card10","ff10","ff10.png"], ["card11","ff11","ff11.png"], ["card12","ff12","ff12.png"], ["card13","ff13","ff13.png"], ["card14","ff15","ff15.png"], ["card15","fft","fft.png"]].map(cardArray =>{
    return {
        id : cardArray[0], //
        node: createC(cardArray[0]), // ---- [2]
        sideShown: "front", //
        value: cardArray[1], //
        faceImage: cardArray[2] // --------- "cards" is the dictionary for the game, '[0],[1],[2]' are reading the array pertaining in each param. 
    };
});
cards.forEach(card=gameHolder.append(card.node));
//
// Creating the Cards [2]
const createC = (id) =>{
    let findDiv = document.getElementById("deck");
    let newCard = document.createElement("div");
    newCard.setAttribute("id", id);
    newCard.className = "card";
    newCard.addEventListener(("click", selectC)); // ---- [3]
    findDiv.append(newCard); // ----------- created a new element,"div id=card", under an existing element, "div id=deck"
};
//
// Selecting Cards [3]
const selectC = (evt)=>{
    let cardNode = evt.target;
    let card = cards.find(card=>card.id == cardNode.id); // ------ [1]"cards" / [2]".id"
    faceUp(card);
    if ( !selected){
        selected = card;
    } else if (selected.value == card.value){
        console.log("Match!")
        window.setTimeout(()=>{                                     //
            card.node.parentNode.removeChild(card.node);            //
            selected.node.parentNode.removeChild(selected.node);    //
            reset();                                                // 
        }, 3000);                                                   //
    } else {                                                        //
        console.log("Not a Match.");                                //
        window.setTimeout(reset, 3000);                             // ---- a timer for the message to console "match/not a match", 3000ms
    };
};
//