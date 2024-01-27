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

    const param1Value = urlSearchParams.get('first_friend');
    const param2Value = urlSearchParams.get('last_friend');

    const $friends = document.querySelector('.friends');
    if (param1Value && param2Value) {
        $friends.textContent = "Дорогие " + param1Value + " и " + param2Value;
    } else if (param1Value && (param1Value === "Алена" || param1Value === "Маша")) {
        $friends.textContent = "Дорогая " + param1Value;
    } else if (param1Value && !param2Value) {
        $friends.textContent = "Дорогой " + param1Value;
    }

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    console.log('param1:', param1Value);
    console.log('param2:', param2Value);
});

let currentIndex = 0;

function openFullscreen(element, index) {
    currentIndex = index;
    const fullscreenElement = document.createElement("div");
    fullscreenElement.className = "fullscreen";

    const img = document.createElement("img");
    img.src = element.src;
    img.alt = element.alt;
    fullscreenElement.appendChild(img);

    const closeBtn = document.createElement("div");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = "&#10006;";
    closeBtn.onclick = closeFullscreen;
    fullscreenElement.appendChild(closeBtn);

    const prevBtn = document.createElement("div");
    prevBtn.className = "prev-btn";
    prevBtn.innerHTML = "&#9665;"; // Unicode-символ для стрелки влево
    prevBtn.onclick = function () {
        currentIndex -= 1;
        showSlide(currentIndex);
    };
    fullscreenElement.appendChild(prevBtn);

    const nextBtn = document.createElement("div");
    nextBtn.className = "next-btn";
    nextBtn.innerHTML = "&#9655;"; // Unicode-символ для стрелки вправо
    nextBtn.onclick = function () {
        currentIndex += 1;
        showSlide(currentIndex);
    };
    fullscreenElement.appendChild(nextBtn);

    document.body.appendChild(fullscreenElement);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        currentIndex -= 1;
        showSlide(currentIndex);
    } else if (event.key === 'ArrowRight') {
        currentIndex += 1;
        showSlide(currentIndex);
    } else if (event.key === 'Escape') {
        closeFullscreen();
    }
});

function closeFullscreen() {
    const fullscreenElement = document.querySelector(".fullscreen");
    if (fullscreenElement) {
        fullscreenElement.remove();
    }
}

function showSlide(index) {
    console.log(index);
    const images = document.querySelectorAll('.gallery_item');
    console.log("images length", images.length)
    if (index < 0) {
        currentIndex = images.length - 1;
    } else if (index >= images.length) {
        currentIndex = 0;
    }

    const fullscreenImage = document.querySelector('.fullscreen img');
    fullscreenImage.src = images[currentIndex].src;
}

