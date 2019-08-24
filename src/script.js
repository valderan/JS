
// объявим переменнные
let money = 301,
    income = '150000',
    addExpenses = 'Квартира - 55000,Ресторан - 20000, Такси - 15000';
    deposit = false,
    mission = 45000000,
    period = 4;

// выведем типы данных в консоль
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

// выведем длину строки 
console.log(income.length);

// выведем значения в тексте переменных period и mission в консоль 
console.log(String.raw`Период ${period} месяцев и Цель заработать ${mission} долларов'`);

// переведем в нижний регистр и разобъем на массив
console.log( String( addExpenses.toLowerCase() ).split( ',' ) );

// вывод результата и остатка от деления
let budgetDay = money / 30;
// проверим целое число или нет
if (!Number.isSafeInteger(budgetDay)) {
    // если дробное, разобъем на массив и выведем отдельно целую и дробную часть
    console.log(
                'Результат:', String(budgetDay).split('.')[0], 
                'Остаток:', String(budgetDay).split('.')[1]
                );
} else {
    // иначе выведем просто число
    console.log('Результат:', budgetDay);
}