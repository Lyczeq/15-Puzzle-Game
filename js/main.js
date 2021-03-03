let $btnMail;
let $puzzles;
let $timeCounter = 0;
let $movesCounter = 0;
let $restartBtn;
let $moves;
let $time;
let $pausePlayBtn;
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
    $pausePlayBtn = document.querySelector('.btn-pause-play')
};

const prepareDOMEvents = () => {
    $btnMail.addEventListener('click', copyMail);
};

const showMailInfo = () => {
    const mailInfo = document.querySelector('.mail-info');
    mailInfo.classList.add('active');

    setTimeout(function () {
        mailInfo.classList.remove('active');
    }, 4000);
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