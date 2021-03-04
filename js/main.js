let $btnMail;
let $puzzles;
let $timeCounter = 0;
let $movesCounter = 0;
let $restartBtn;
let $moves;
let $time;
let $pausePlayBtn;
let zeroDiv = 0;
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

const prepareDOMElements = () => {
    $btnMail = document.querySelector('.btn-mail');
    $puzzles = document.getElementsByClassName('game-puzzle');
    $restartBtn = document.querySelector('.btn-restart')
    $moves = document.querySelector('.move-result');
    $time = document.querySelector('.time-result');
    $pausePlayBtn = document.querySelector('.btn-pause-play');
}
const prepareDOMEvents = () => {
    $btnMail.addEventListener('click', copyMail);
    $restartBtn.addEventListener('click', fillPuzzles)
};

const showMailInfo = () => {
    const mailInfo = document.querySelector('.mail-info');
    mailInfo.classList.add('active');

    window.setTimeout(function () {
        mailInfo.classList.remove('active');
    }, 3999);
};

const copyMail = () => {
    showMailInfo();

    const myMail = document.querySelector('.my-mail');
    const range = document.createRange();

    range.selectNode(myMail);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
};

document.addEventListener('DOMContentLoaded', main);

function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() + step1;
    let result = Math.floor(step2) + min;
    return result;
}

function fillPuzzles() {
    $puzzles = document.getElementsByClassName('game-puzzle');

    const nums = new Set
    while (nums.size !== 16) {
        nums.add(Math.floor(Math.random() * 16));
    }
    const randomArray = [...nums];

    let index = 0;
    for (let puzzle of $puzzles) {
        puzzle.children[0].innerHTML = randomArray[index];
        let puzzleNumber = puzzle.children[0];

        if (puzzleNumber.innerHTML === "0") {
            let zeroPuzzle = puzzle;
            zeroPuzzle.classList.add('zero-puzzle');
            puzzleNumber.textContent = ""
        }
        index++;
    }

}
fillPuzzles();