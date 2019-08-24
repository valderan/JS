

// Создать переменную num со значением 266219
let num = "266219",
    result = 1;

// Вывести в консоль произведение (умножение) цифр этого числа
if (num.length > 1) {
    num.split('').forEach(element => {
        result *= element;
    });
    console.log('Результат:', result);
} else {
    result = num;
    console.log('Результат:', result);
}

// Полученный результат возвести в степень 3 используя только 1 оператор (Math.pow не подходит)
result **=3;
console.log('Степень 3:', result);

//  Вывести на экран первые 2 цифры полученного числа
if ( result.toString().length > 1 ) {
    console.log(result.toString().substr(0,2));
};