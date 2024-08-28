
const getNextDate = () => {
    const monthsDictionary = [
      'січня',
      'лютого',
      'березня',
      'квітня',
      'травня',
      'червня',
      'липня',
      'серпня',
      'вересня',
      'жовтня',
      'листопада',
      'грудня'
    ];
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const monthIndex = tomorrowDate.getMonth();
  
    return `${tomorrowDate.getDate()} ${monthsDictionary[monthIndex]}`;
  };
  
  const setStartDate = () => {
    const el = document.querySelector('#start-date');
    if (el) {
      el.innerHTML = getNextDate();
    }
  }
  
  setStartDate();  

class CountdownTimer {
    constructor() {
        this.timerElements = {
            days: document.querySelector('.main__timer_wrap .timer__inner:nth-child(1) .timer'),
            hours: document.querySelector('.main__timer_wrap .timer__inner:nth-child(2) .timer'),
            minutes: document.querySelector('.main__timer_wrap .timer__inner:nth-child(3) .timer'),
            seconds: document.querySelector('.main__timer_wrap .timer__inner:nth-child(4) .timer')
        };
        
        const initialTime = {
            days: 0,
            hours: 23,
            minutes: 59,
            seconds: 59
        };

        this.endTime = this.getEndTime() || this.calculateEndTime(initialTime);
        this.timeLeft = this.calculateTimeLeft();
    }

    start() {
        this.updateDisplay();
        this.timer = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.timeLeft = this.calculateTimeLeft();
        if (this.timeLeft.total <= 0) {
            clearInterval(this.timer);
            this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        this.updateDisplay();
        this.saveEndTime();
    }

    calculateTimeLeft() {
        const difference = this.endTime - new Date().getTime();
        const timeLeft = {
            total: difference,
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
        return timeLeft;
    }

    updateDisplay() {
        for (const [unit, element] of Object.entries(this.timerElements)) {
            if (element) {
                element.textContent = this.padZero(this.timeLeft[unit]);
            }
        }
    }

    padZero(number) {
        return number.toString().padStart(2, '0');
    }

    saveEndTime() {
        localStorage.setItem('countdownTimerEnd', this.endTime.toString());
    }

    getEndTime() {
        const savedEndTime = localStorage.getItem('countdownTimerEnd');
        return savedEndTime ? parseInt(savedEndTime) : null;
    }

    calculateEndTime(time) {
        const now = new Date().getTime();
        const duration = (time.days * 24 * 60 * 60 + time.hours * 60 * 60 + time.minutes * 60 + time.seconds) * 1000;
        return now + duration;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const timer = new CountdownTimer();
    timer.start();
});