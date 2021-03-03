const $btnMail = document.querySelector('.btn-mail');

$btnMail.addEventListener('click', function (event) {

    showMailInfo();
    copyMail();
});

const showMailInfo = ()=>{
    const mailInfo = document.querySelector('.mail-info');
    mailInfo.classList.add('active');

    setTimeout(function () {
        mailInfo.classList.remove('active');
    }, 4000);
};

const copyMail =() =>{
    const myMail = document.querySelector('.my-mail');
    let range = document.createRange();
    range.selectNode(myMail);
    window.getSelection().addRange(range);
    document.execCommand('copy');

    window.getSelection().removeAllRanges(); 
};