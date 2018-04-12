
let j;
let difficult = 6;
let initialColor = "rgb(37, 127, 211)";
let colors;
const colorDisplay = document.querySelector("#colorDisplay");
const squares = document.querySelectorAll(".square");
const messageDisplay = document.querySelector("#message");
let reset = document.querySelector("#new-color");
const easy = document.querySelector("#easy");
const hard = document.querySelector("#hard");
const h1 = document.querySelector("h1");
const hiddenSquares = document.querySelectorAll("#hidden");

// inicia o jogo
function startGame() {  
    j = 0;
    generateColorsArray();  // gera array com rgb colors
    pickRandomColor(colors);  // escolhi cor para ser adivinhada
    message.textContent = "";
    h1.style.backgroundColor = initialColor;
}

startGame();

function generateColorsArray() {
    
    colors = [];

    for(let i = 0; i < difficult; i++) {
        let rgbColor = randomColor();
        if(colors.includes(rgbColor)) { //  checa se a cor ja esta no array
            i--;  // decrementa o i para que a quantidade de cores geradas seja 6
            continue;  // volta a execucao para o inicio do for
        }
        colors.push(randomColor());
    }
    boardSetup(colors);
}

function randomColor() {
    let red = Math.floor(Math.random() * 256); // gera numeros de 0 a 255
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;  
}

function boardSetup(board) {
    let i = 0;
    squares.forEach((s) => {
        s.style.backgroundColor = board[i++];
    }); 
}

function pickRandomColor(colors) {
    let color = Math.floor(Math.random() * difficult);
    pickedColor = colors[color];
    colorDisplay.textContent =  "RGB" + pickedColor.slice(3,);  // retira o "rgb" da cor
}

function checkGuess(color, square) {
    if(color === pickedColor) {
        message.style.color = "#33ce4f";
        messageDisplay.textContent = "Correct!";
        reset.textContent = "PLAY AGAIN?";
        changeColor();
    } else {
        square.classList.add("fade");
        message.style.color = "red";
        messageDisplay.textContent = "Try Again";
    }
}

// change the background color when it is guessed wrong
function changeColor() {
    h1.style.backgroundColor = pickedColor; // change the heading color
    squares.forEach((s) => {
        s.style.backgroundColor = pickedColor;  // change each color and remove its
        s.classList.remove("fade");
    });
}


/************************** Click Events **************************/ 
squares.forEach((s) => {
    // add click events
    s.addEventListener("click", function() {
        let clickedColor = this.style.backgroundColor;
        let square = this;  // passes the clicked square for checking
        checkGuess(clickedColor, square);
    });
});

reset.onclick = () => {
    reset.textContent = "NEW COLORS";
    startGame();
};

easy.onclick = () => {
    difficult = 3;
    hard.classList.toggle("difficult-style");
    easy.classList.toggle("difficult-style");
    reset.textContent = "NEW COLORS";
    startGame();
    hiddenSquares.forEach((h) =>{
        h.style.display = "none";
    });
};

hard.onclick = () => {
    difficult = 6;
    hard.classList.toggle("difficult-style");
    easy.classList.toggle("difficult-style");
    reset.textContent = "NEW COLORS";
    
    startGame();
    hiddenSquares.forEach((h) => {
        h.style.display = "block";
    });
};
// compare pickedColor with clickedColor
/************************** End Click Events **************************/ 

