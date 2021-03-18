'use strict'
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
let $countSeconds;
let $pauseBar;
let $playBtn

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    fillPuzzles();
    isInRightPoisition();
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
    $pauseBar = document.querySelector('.pause-bar');
    $playBtn = $pauseBar.querySelector('.play-btn');
};

const prepareDOMEvents = () => {
    movePuzzle();
    $restartBtn.addEventListener('click', restartGame);
    $pausePlayBtn.addEventListener('click', pauseOrPlay)
    $playBtn.addEventListener('click', playAfterPause);
    $btnMail.addEventListener('click', copyMail);
    $playAgainBtn.addEventListener('click', playAgain);
};

const fillPuzzles = () => {
    const nums = new Set
    while (nums.size !== 16) {
        nums.add(Math.floor(Math.random() * 16));
    }
    const randomArray = [...nums];

    let index = 0;
    for (let puzzle of $puzzles) {
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
};

const isInRightPoisition = () => {
    for (let i = 0; i < $puzzles.length; i++) {

        const bufor = $puzzles[i].querySelector('.puzzle-box');

        if (bufor !== null) {
            const puzzNumber = bufor.querySelector('.puzzle-number');

            puzzNumber.innerHTML === `${i+1}` ? bufor.classList.add('right-position') : bufor.classList.remove('right-position');
        }
    }
};

const movePuzzle = () => {
    $puzzles.forEach(puzzle => {
        puzzle.addEventListener('click', function () {

            let currentIndex = $puzzles.indexOf(this);
            let zeroIndex = $puzzles.indexOf($divZero);

            if (currentIndex !== zeroIndex) {
                const wrongIndexesPlusOne = [3, 7, 11]
                const wrongIndexesMinusOne = [4, 8, 12]

                if (((currentIndex - 1 === zeroIndex) && !wrongIndexesMinusOne.includes(currentIndex)) || // comparison with next
                    ((currentIndex + 1 === zeroIndex) && !wrongIndexesPlusOne.includes(currentIndex)) || // comparison with previous
                    ((currentIndex + 4 === zeroIndex)) ||
                    ((currentIndex - 4 === zeroIndex))) {
                    $divZero.appendChild(this.firstChild)
                    $divZero.classList.remove('zero-puzzle');
                    $divZero = this;
                    $movesCounter++;
                    this.classList.add('zero-puzzle');

                    isInRightPoisition();

                    if ($movesCounter !== 0) {
                        $pausePlayBtn.classList.remove('disactive')
                        $pausePlayBtn.removeAttribute('disabled')
                    }
                    if ($timeCounter === 0) {

                        $timeCounter++;
                        $timeResult.innerHTML = $timeCounter;

                        $countSeconds = setInterval(timer, 1000, Infinity);

                    }
                    $movesResult.innerHTML = $movesCounter;
                }
            }
            isFinished();
        })
    });
};

const isFinished = () => {
    let counter = 0;
    for (let i = 0; i < 15; i++) {
        if ($puzzles[i].querySelector('p') !== null && $puzzles[i].querySelector('p').innerText == i + 1) {
            counter++;
        }
    }

    if (counter === 15) {
        userWins();
    }
};

const userWins = () => {
    $restartBtn.classList.add('disactive');
    $restartBtn.setAttribute('disabled', 'disabled');

    $pausePlayBtn.classList.add('disactive')
    $pausePlayBtn.disabled = true;

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
    stopTimer();
};

const pauseOrPlay = () => {

    if ($pausePlayBtn.innerHTML === 'Pause') {
        stopTimer();
        $pausePlayBtn.innerHTML = "Play";
        $pauseBar.style.display = "block";

    } else {
        playAfterPause();
    }
};

const playAfterPause = () => {
    $countSeconds = setInterval(timer, 1000, Infinity);
    $pausePlayBtn.innerHTML = "Pause";
    $pauseBar.style.display = "none";
};

const timer = () => {
    $timeCounter++;
    $timeResult.innerHTML = $timeCounter;
};

const stopTimer = () => {
    clearInterval($countSeconds);
};

const restartGame = () => {
    addChildToRestart();
    $divZero.classList.remove('zero-puzzle');

    fillPuzzles();

    $movesCounter = 0;
    $movesResult.innerHTML = $movesCounter;
    $timeCounter = 0;
    $timeResult.innerHTML = $timeCounter;

    $pauseBar.style.display = "none";
    $pausePlayBtn.innerHTML = "Pause";
    $pausePlayBtn.classList.add('disactive');
    $pausePlayBtn.setAttribute('disabled', 'disabled');
    stopTimer();

    isInRightPoisition();
    $puzzles.forEach(puzzle => animatePuzzle(puzzle));
};

const addChildToRestart = () => {
    const puzzleBox = document.createElement('div');
    puzzleBox.classList.add('puzzle-box');
    const puzzleNumber = document.createElement('p');
    puzzleNumber.classList.add('puzzle-number');
    puzzleNumber.innerHTML = "";
    puzzleBox.appendChild(puzzleNumber);
    $divZero.appendChild(puzzleBox);
};

const animatePuzzle = puzzle => {
    if (puzzle.querySelector('.puzzle-box')) {
        puzzle.querySelector('.puzzle-box').animate([{
                transform: "scale(.7)"
            },
            {
                transform: "scale(1)"
            }
        ], {
            duration: 300,
            iterations: 1,
            easing: "ease"
        });
    }
};

const playAgain = () => {
    addChildToRestart();
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
    isInRightPoisition();
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