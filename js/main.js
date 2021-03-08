let $btnMail;
let $timeCounter = 0;
let $movesCounter = 0;
let $restartBtn;
let $movesResult;
let $time;
let $pausePlayBtn;
let $divZero;
let $puzzles;
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

const prepareDOMElements = () => {
    $btnMail = document.querySelector('.btn-mail');
    $puzzles = [...document.getElementsByClassName('game-puzzle')];
    $restartBtn = document.querySelector('.btn-restart')
    $movesResult = document.querySelector('.move-result');
    $time = document.querySelector('.time-result');
    $pausePlayBtn = document.querySelector('.btn-pause-play');
    fillPuzzles();

}
const prepareDOMEvents = () => {
    $btnMail.addEventListener('click', copyMail);
    $restartBtn.addEventListener('click', function () {
        addChildToReset();
        $divZero.classList.remove('zero-puzzle');
        fillPuzzles();
        $movesCounter = 0;
        $movesResult.innerHTML = $movesCounter;
        $pausePlayBtn.classList.add('disactive')
        $pausePlayBtn.setAttribute('disabled', 'disabled')
    });

    movePuzzle();
    // startClock();
    $pausePlayBtn.addEventListener('click', function () {
        console.log("j");
    })

};

// const startClock = () => {
//     for (puzzle of $puzzles) {
//         puzzle.addEventListener('click', startTimer())
// }
// }
// function startTimer() {
//     console.log("hi");
//     puzzle.removeEventListener('click', startTimer())
// }

// const pauseBtnActive = () => {
//     if (this.innerText != 0) {
//         $pausePlayBtn.classList.remove('disactive')
//     }

// }


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
        console.log("You win"); //add congratulations message and sass option
        //display none pause btn
        //restart game = play again
        //divy z gratkami, liczbą ruchów, czasem, a tamte wyzerowac 
    }
}