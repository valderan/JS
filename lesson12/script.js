'use strict';

// определим кол-во дней до нового года
function getTimeRemaining(deadline , date = new Date()) {

    let dateStop = new Date(deadline).getTime(),
        dateNow = date.getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        day = Math.floor(timeRemaining / 60 / 60 / 24);

    return day;
}

// объект дата
let date = new Date();

// date.setHours(23);  // - задать час для теста  
// date.setFullYear(2019, 10, 10); // - задать дату для теста  

// определим кол-во дней до НГ 
let daysToNY = getTimeRemaining('31 december 2019', date);

// определим день недели
let week = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];

// определим период дня
let period = ' Доброе утро';
let getHours = date.getHours();
((getHours >= 12) && (getHours < 18)) ? period = 'Добрый день' : period ; 
((getHours >= 18) && (getHours <= 22)) ? period = 'Добрый вечер' : period ;
((getHours > 22) || (getHours < 6)) ? period = 'Доброй ночи' : period ;

// время
let time = date.toLocaleTimeString('en');

// вывод информации на страницу
let stringHTML = `${period}<br>
Сегодня: ${week[date.getDay()]} <br>
Текущее время:${time} <br>
До нового года осталось ${daysToNY} дней`;

let div = document.createElement('div');
div.innerHTML = stringHTML;
document.body.append(div);