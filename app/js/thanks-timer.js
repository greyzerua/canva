document.addEventListener("DOMContentLoaded", function() {
    const timerElement = document.querySelector('.timer60sec');

    if (timerElement) {
        let secondsLeft = 60;

        const countdownInterval = setInterval(function() {
            secondsLeft--;
            timerElement.textContent = secondsLeft;

            if (secondsLeft === 0) {
                clearInterval(countdownInterval);
                // window.location.href = "https://t.me/canvacourse_bot?start=668ea76fbbee1bf0ab02839c";
            }
        }, 1000);
    }
})