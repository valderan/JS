'use strict';

let week = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
];

let date = new Date();
let weekDayIndex = date.getDay();

( weekDayIndex === 0 ) ? weekDayIndex = 7 : weekDayIndex++; 

let stringHTML = '';
week.forEach((element, index) => {
    let html = '';
    
    if (index > 4) {
        html = '<i>' + element + '</i>';
    } else {
        html = element;
    }

    if (weekDayIndex === (index + 1)) {
        html = '<b>' + html + '</b>';
    };

    stringHTML += html + '<br>';
});

let div = document.createElement('div');
div.innerHTML = stringHTML;

document.body.append(div);


