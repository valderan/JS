'use strict';

// ввод параметров
let arr = 
[
    '111111',
    '2333',
    '3333',
    '444',
    '5555',
    '621222',
    '711111'
];

// вовод в консоль значений начинающихся с 2 или 4
arr.forEach((element) => {
    if ( (element.length > 0) && (element.charAt(0) === '2' || element.charAt(0) === '4') ) {
            console.log(element);
    };  

});

// функция определяющая простое число(true) или составное(false)
let checkPrimeNumber = function (number) {
    
    let checkStatus = true;
    if (number === 1) {
        return false;
    }
    for (let index = 2; index < number; index ++) {
            
        let check = number % index;
        if (check === 0) {
            checkStatus = false;
            break;
        };
        
    };
    
    return checkStatus;
};

// вывод всех простых чисел от 1 до 100
// 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
for (let index = 1; index < 100; index++) {

    if (checkPrimeNumber(index)) {
        console.log('Простое число',index, ' делители этого числа: 1 и', index);
    };
    
};