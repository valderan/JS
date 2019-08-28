'use strict';

// ввод параметров
let inputString = prompt('Введите значение');
let testString = 0;

// проверим если введены только цифры присвоим Number иначе String
(!inputString.replace (/\d/g, '').length) ? testString = Number(inputString) : 
                                            testString = inputString;

// функция обрезания строки более 30 символов
let shortString = function(string) {
    let workStr = String(string).trim();
    if (workStr.length > 30) {
        return workStr.substr(0,30) + '...';
    } else {
        return workStr;
    }
};

// проверим передаваемый параметр 
let test = function(data) {

    if (typeof(data) === 'string') {
        return shortString(data);
    } else {
        return 'Введен неверный тип';
    }

};

// вызов функции и вывод результата в консоль
console.log(test(testString));
