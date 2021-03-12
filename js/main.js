let $btnMail;
let $timeCounter = 0;
let $movesCounter = 0;
let $restartBtn;
let $movesResult;
let $timeResult;
let $pausePlayBtn;
let $divZero;
let $puzzles;
let $playAgainBtn;
let $gameResults;
let $congratulationsBar;
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

const prepareDOMElements = () => {
    $btnMail = document.querySelector('.btn-mail');
    $puzzles = [...document.getElementsByClassName('game-puzzle')];
    $restartBtn = document.querySelector('.btn-restart')
    $movesResult = document.querySelector('.move-result');
    $timeResult = document.querySelector('.seconds');
    $pausePlayBtn = document.querySelector('.btn-pause-play');
    $playAgainBtn = document.querySelector('.btn-play-again');
    $gameResults = document.querySelector('.game-results');
    $congratulationsBar = document.querySelector('.congratulations-bar');
    fillPuzzles();
    userWins();

}
const prepareDOMEvents = () => {
    $btnMail.addEventListener('click', copyMail);
    $restartBtn.addEventListener('click', restartAll);

    movePuzzle();
    $pausePlayBtn.addEventListener('click', function () {
        console.log("j");
    })
    $playAgainBtn.addEventListener('click', playAgain);

};

const restartAll = () => {
    addChildToReset();
    $divZero.classList.remove('zero-puzzle');

    fillPuzzles();
    $movesCounter = 0;
    $movesResult.innerHTML = $movesCounter;
    $timeCounter = 0;
    $timeResult.innerHTML = $timeCounter;
    $pausePlayBtn.classList.add('disactive');
    $pausePlayBtn.setAttribute('disabled', 'disabled');
}

const playAgain = () => {
    addChildToReset();
    $divZero.classList.remove('zero-puzzle');

    fillPuzzles();
    $restartBtn.classList.remove('disactive')
    $gameResults.classList.remove('disactive')
    $restartBtn.removeAttribute('disabled');

    $congratulationsBar.animate([{
            opacity: ".95",
            transform: "translate(-50%,-50%) scale(1)"
        },
        {
            opacity: "0",
            transform: "translate(-50%,-50%) scale(0)"
        }
    ], {
        duration: 500,
        iterations: 1,
        easing: "ease"
    });



    window.setTimeout(function () {
        $congratulationsBar.classList.remove('active');
    }, 480);


}

const movePuzzle = () => {
    for (puzzle of $puzzles) {
        puzzle.addEventListener('click', function () {
            let currentIndex = $puzzles.indexOf(this);
            let zeroIndex = $puzzles.indexOf($divZero);

            if (currentIndex !== zeroIndex) {
                const wrongIndexesPlusOne = [3, 7, 11]
                const wrongIndexesMinusOne = [4, 8, 12]

                if (((currentIndex - 1 === zeroIndex) && !wrongIndexesMinusOne.includes(currentIndex)) || // z poprzednim
                    ((currentIndex + 1 === zeroIndex) && !wrongIndexesPlusOne.includes(currentIndex)) || //z następnym
                    ((currentIndex + 4 === zeroIndex)) ||
                    ((currentIndex - 4 === zeroIndex))) {
                    $divZero.appendChild(this.firstChild)
                    $divZero = this;
                    $movesCounter++;
                    if ($movesCounter !== 0) {
                        $pausePlayBtn.classList.remove('disactive')
                        $pausePlayBtn.removeAttribute('disabled')
                    }
                    $movesResult.innerHTML = $movesCounter;
                }
            }
            isFinished();
        })
    }
}


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


function fillPuzzles() {
    const puzzlesBufor = document.getElementsByClassName('game-puzzle')
    const nums = new Set
    while (nums.size !== 16) {
        nums.add(Math.floor(Math.random() * 16));
    }
    const randomArray = [...nums];

    let index = 0;
    for (let puzzle of puzzlesBufor) {
        if (randomArray[index] === 0) {
            let deletedChild = puzzle.querySelector('div')
            $divZero = puzzle;
            $divZero.removeChild(deletedChild)
            $divZero.classList.add('zero-puzzle')
        } else {
            puzzle.querySelector('p').innerHTML = randomArray[index];
        }
        index++;
    }
}

function addChildToReset() {
    const puzzleBox = document.createElement('div');
    puzzleBox.classList.add('puzzle-box');
    const puzzleNumber = document.createElement('p');
    puzzleNumber.classList.add('puzzle-number');
    puzzleNumber.innerHTML = "1"
    puzzleBox.appendChild(puzzleNumber);
    $divZero.appendChild(puzzleBox);
}
document.addEventListener('DOMContentLoaded', main);

function isFinished() {
    let counter = 0;
    for (let i = 0; i < 15; i++) {
        if ($puzzles[i].querySelector('p') !== null && $puzzles[i].querySelector('p').innerText == i + 1) {
            counter++;
        }
    }

    if (counter === 15) {
        userWins();
    }
}

const userWins = () => {
    $restartBtn.classList.add('disactive');
    $restartBtn.setAttribute('disabled', 'disabled')
    $pausePlayBtn.classList.add('disactive')
    if (!$pausePlayBtn.hasAttribute('disabled')) {
        $pausePlayBtn.setAttribute('disabled ', 'disabled')
    }

    $gameResults.classList.add('disactive')
    $congratulationsBar.classList.add('active');

    const finalMoves = $congratulationsBar.querySelector('.final-moves');
    finalMoves.innerHTML = $movesCounter;
    const finalTime = $congratulationsBar.querySelector('.final-time');
    finalTime.innerHTML = $timeCounter;

    $movesCounter = 0;
    $movesResult.innerHTML = $movesCounter;
    $timeCounter = 0;
    $timeResult.innerHTML = $timeCounter;


}