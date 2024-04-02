document.addEventListener('DOMContentLoaded', function () {
    const deadline = new Date(2024, 7, 6);
    let timerId = null;

    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }

    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
        $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
        $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }

    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    countdownTimer();
    timerId = setInterval(countdownTimer, 1000);

    const urlSearchParams = new URLSearchParams(window.location.search);

    const param1Value = urlSearchParams.get('first-guest');
    const param2Value = urlSearchParams.get('second-guest');

    const $guests = document.querySelector('.guests');
    if (param1Value === "Родители") {
        $guests.textContent = "Дорогие Родители!";
    } else if (param1Value === "Дима" || param1Value === "Степа") {
        $guests.textContent = "Дорогой " + param1Value + "!";
    } else if (param1Value && param2Value) {
        $guests.textContent = "Дорогие " + param1Value + " и " + param2Value + "!";
    } else if (param1Value === "Крестная мама") {
        $guests.textContent = "Дорогая " + param1Value + "!";
    }

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    console.log('param1:', param1Value);
    console.log('param2:', param2Value);

    Fancybox.bind("[data-fancybox]", {
        Toolbar: {
            display: {
                left: [''],
                middle: [],
                right: ['close'],
            },
        }
    });
});