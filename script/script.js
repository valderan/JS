window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';

    function countTimer(deadline) {

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60),
                day = Math.floor(timeRemaining / 60 / 60 / 24);

            return {timeRemaining, hours, minutes, seconds, day};
        }

        function updateClock(idInterval) {
            let timer = getTimeRemaining(),
                hours = 0, minutes =0, seconds = 0;

                (timer.hours >= 0) ? hours = timer.hours : hours;
                (timer.minutes >= 0 ) ? minutes = timer.minutes : minutes; 
                (timer.seconds >= 0) ? seconds = timer.seconds : seconds;


            (hours > 9) ? timerHours.textContent = hours : timerHours.textContent = '0' + hours;
            (minutes > 9) ? timerMinutes.textContent = minutes : timerMinutes.textContent = '0' + minutes;
            (seconds > 9) ? timerSeconds.textContent = seconds: timerSeconds.textContent = '0' + seconds ;

            if (timer.timeRemaining <= 0) {
                timerHours.parentElement.style.color = 'red';
            }

        }

        function stopClock(idInterval) {
            
            let timer = getTimeRemaining();
            
            if (timer.timeRemaining <= 0 ) {
                clearInterval(idInterval);
            } else {
                setTimeout(stopClock, 1000, idInterval);
            }

        }

        let idInterval = setInterval(updateClock, 1000);
        setTimeout(stopClock, 1000, idInterval);

    }

    countTimer('23 september 2019 10:28:00');

});