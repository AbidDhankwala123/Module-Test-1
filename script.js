let btnRules = document.querySelector(".rules-btn");
let btnClose = document.querySelector(".close-btn");
let modalRules = document.querySelector(".modal");


let choiceButtons = document.querySelectorAll(".choice-btn");
let gameDiv = document.querySelector(".game");
let resultsDiv = document.querySelector(".results");
let resultDivs = document.querySelectorAll(".results__result");

let resultWinner = document.querySelector(".results__winner");
let resultText = document.querySelector(".results__text");
let againstPCText = document.querySelector(".against-pc");
let playAgainBtn = document.querySelector(".play-again");


let nextBtn = document.querySelector(".next-btn");

let pcScoreNumber = document.querySelector(".pc-score");
let myScoreNumber = document.querySelector(".my-score");

let pcScoreValue = localStorage.getItem("pc-score");
let myScoreValue = localStorage.getItem("my-score");



if (pcScoreValue == null) {
    localStorage.setItem("pc-score", 0);
} else {
    pcScoreNumber.innerText = pcScoreValue;
}
if (myScoreValue == null) {
    localStorage.setItem("my-score", 0);
} else {
    myScoreNumber.innerText = myScoreValue;
}

let pcScore = 0;
let myScore = 0;

pcScore = parseInt(localStorage.getItem('pc-score'));
myScore = parseInt(localStorage.getItem('my-score'));



let CHOICES = [
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "scissors",
        beats: "paper"
    },
    {
        name: "rock",
        beats: "scissors"
    },
];

// Game Logic
choiceButtons.forEach(button => {
    button.addEventListener("click",() => {
        let choiceName = button.dataset.choice;
        let choice = CHOICES.find(choice => choice.name === choiceName);
        choose(choice);
    })
}); 

function choose(choice){
    let pcchoice = pcChoose();
    displayResults([choice,pcchoice]);
    displayWinner([choice,pcchoice]);
}

function pcChoose(){
    let rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results){
    resultDivs.forEach((resultDiv,idx) => {
        resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
            <img src="MyImages/${results[idx].name}.png" alt="${results[idx].name}"/>
        </div>
        `;
    });

    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
    let userWins = isWinner(results);
    let pcWins = isWinner(results.reverse());

    if(userWins)
    {
        resultText.innerText = "YOU WIN";
        againstPCText.innerText = "AGAINST PC";
        playAgainBtn.textContent = "PLAY AGAIN";
        resultDivs[0].classList.toggle("winner");
        btnRules.classList.add("shift-rules-btn");
        nextBtn.classList.add("show-next-btn");
        myScore = myScore + 1;
        localStorage.setItem("my-score",myScoreNumber.innerText = myScore);
    }
    else if(pcWins){
        resultText.innerText = "YOU LOST";
        againstPCText.innerText = "AGAINST PC";
        playAgainBtn.textContent = "PLAY AGAIN";
        resultDivs[1].classList.toggle("winner");
        pcScore = pcScore + 1;
        localStorage.setItem("pc-score",pcScoreNumber.innerText = pcScore);
    }
    else{
        resultText.innerText = "TIE UP";
        playAgainBtn.textContent = "REPLAY";
    }

    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

playAgainBtn.addEventListener("click",() => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");

    resultDivs.forEach(resultDiv => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    againstPCText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");

    btnRules.classList.remove("shift-rules-btn");
    nextBtn.classList.remove("show-next-btn");
});

//toggle used to add or remove the class
function onRulesClick(){
    modalRules.classList.toggle("show-modal");//toggle will add the class, if class is not present
}

function onCloseClick(){
    modalRules.classList.toggle("show-modal");//toggle will remove the class, if class is present
}

btnRules.addEventListener("click",onRulesClick);
btnClose.addEventListener("click",onCloseClick);

nextBtn.addEventListener("click",() => {
    location.href = "hurray.html";
});

function go_to_main_page(){
    window.location.href = "index.html";
}

function close_rules(){
    let box = document.querySelector('.modal__container');
    box.style.display = "none";
}

function show_rules(){
    let box = document.querySelector('.modal__container');
    box.style.display = "block";
}

