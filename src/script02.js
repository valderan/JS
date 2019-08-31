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
let weekDayIndex = date.getDay() - 1;

let stringHTML = '';
week.forEach((element, index) => {
    let html = '';
    
    if (index > 4) {
        html = '<i>' + element + '</i>';
    } else {
        html = element;
    }

    if (weekDayIndex === index) {
        html = '<b>' + html + '</b>';
    };

    console.log(date.getDay(), weekDayIndex, index, element);

    stringHTML += html + '<br>';
});



let div = document.createElement('div');
div.innerHTML = stringHTML;

document.body.append(div);


