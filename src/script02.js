'use strict';

// зададим дни недели в 2х локалях
let rusDays = 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье',
    engDays = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday';

// запросим локаль, по умслчанию установка в ru
let lang = prompt('Локализация только:ru/en | Localization only:ru/en', 'ru').toLowerCase();

// проверим на соблюдения условия
switch (lang) {
    case 'en':
    case 'eng':    
    case 'english':  
        lang = 'en'; 
        break;
    default:
        lang = 'ru';
        break;
};

// выведем дни недели через if
if (lang == 'en') {
    console.log(engDays);
} else {
    console.log(rusDays);
};

// выведем через switch - case
switch(lang) {
    
    case 'en':
        console.log(engDays);
        break;
    
    default:
        console.log(rusDays);
        break;
};

//при помощи многомерных массивов   
// заполним массив 
let locale = 
    [   
        [
            'en',
            engDays
        ],
        [
            'ru',
            rusDays
        ]

    ]

// так как у нас четко заданы массивы и занчечения lang проверяются, 
// мы можем не боясь фильтровать и на прямую обращаться к элементу
// но реализация через хэщ была бы изящнее, но я так понял надо через многомерные массивы
let localeString = locale.filter(element => element[0] == lang)[0][1];

console.log(localeString);

 // работа с Именем -> должностью
let namePerson = 'Артем',
    printString = 'студент';
     
(namePerson == 'Артем') ? printString = 'директор' : printString;
(namePerson == 'Максим') ? printString = 'преподаватель' : printString;

console.log(printString);
