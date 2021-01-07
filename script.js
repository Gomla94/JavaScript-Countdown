const inputsContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const datePicker = document.getElementById('date-picker');

const countdownContainer = document.getElementById('countdown-container');
let countdownTitle = document.getElementById('countdown-title');
const countdownSpans = document.querySelectorAll('span');

const resetBtn = document.getElementById('reset-countdown-btn');
let titleInput = document.getElementById('title');
let dateInput = document.getElementById('date-picker');

const completeContainer = document.getElementById('complete-container');
const completeInfo = document.getElementById('complete-info');
const newCountdownBtn = document.getElementById('newCountdown-btn');

let countdownActive;
let formCountdownTitle = '';
let formCountdownDate = '';
let storedCountdown;
let countdownValue = Date;

document.cookie = 'ahmed';
alert(document.cookie);
//here we will set the minimum value of the date input to be today's date.
const today = new Date().toISOString().split('T')[0];
datePicker.setAttribute('min', today);

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
//these values are in milleseconds.



function updateCountdown(event) {
    //this function will take the form title and date values and stored them in a local storage,
    //then start updating the countdown in the dom.
    event.preventDefault();
    formCountdownTitle = event.srcElement[0].value;
    formCountdownDate = event.srcElement[1].value;
    countdownValue = new Date(formCountdownDate).getTime();
    storedCountdown = {
        title: formCountdownTitle,
        date: countdownValue
    };
    localStorage.setItem('countdown', JSON.stringify(storedCountdown));
    updateDom();
}

function updateDom() {
    //this function will keep updating the dom while the countdown is still counting
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        if (distance < 0) {
            countdownContainer.hidden = true;
            inputsContainer.hidden = true;
            completeContainer.hidden = false;
            completeInfo.textContent = `${formCountdownTitle} ended on ${formCountdownDate}`
            clearInterval(countdownActive);
        } else {
            const days = Math.floor(distance / day);
            const hours = Math.floor((distance % day) / hour);
            const minutes = Math.floor((distance % hour) / minute);
            const seconds = Math.floor((distance % minute) / second);
            inputsContainer.hidden = true;
            countdownContainer.hidden = false;
            countdownTitle.innerText = formCountdownTitle;
            countdownSpans[0].textContent = days;
            countdownSpans[1].textContent = hours;
            countdownSpans[2].textContent = minutes;
            countdownSpans[3].textContent = seconds;
        }

    })

    // console.log(distance);
}

function resetCountdown() {
    //this function will reset the countdown
    clearInterval(countdownActive);
    countdownContainer.hidden = true;
    completeContainer.hidden = true;
    inputsContainer.hidden = false;
    localStorage.removeItem('countdown');
    countdownTitle.innerText = '';
    titleInput.value = '';
    dateInput.value = '';
    countdownValue = '';
    formCountdownTitle = '';
    formCountdownDate = '';
}


function restoreCountdown() {
    //this function will check if there was a stored countdown, then restore it
    if (localStorage.getItem('countdown')) {
        const countdown = JSON.parse(localStorage.getItem('countdown'));
        formCountdownTitle = countdown.title;
        countdownValue = countdown.date;
        updateDom();
    }
}
countdownForm.addEventListener('submit', updateCountdown);
resetBtn.addEventListener('click', resetCountdown);
newCountdownBtn.addEventListener('click', resetCountdown);
restoreCountdown();