'use strict';

// тестовая строка 32 символа
let testString = '12345678901234567890123456789012';

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
    if (typeof(data) === 'function') {
        console.log('Параметр data - функция');
    }   
};

test(shortString);