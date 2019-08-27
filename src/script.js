'use strict';

// дополнительный доход
let income = 0; 

// сумма необходимого накопления
let mission = 400000;

// доход за месяц
let money = prompt('Ваш месячный доход?', '50000');

// дополнительный расход    
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
                         'оружие, наркотики, шлюхи');
console.log(addExpenses.split(','));

// объявим депозит и спросим про его наличие
let deposit = prompt('Есть ли у вас депозит в банке?', 'нет я бомж') == 'да' ? true : false;
console.log('deposit - ',deposit); 

// Вывести в консоль типы данных money, income, deposit
console.log('Тип money - ', typeof money);
console.log('Тип addExpenses - ', typeof addExpenses);
console.log('Тип income - ', typeof income);

// возврат значения ввиде массива вопрос / ответ
function getArrayRecord(questionOne, questionTwo, baseValueOne = '1', baseValueTwo = '200') {
    return [prompt(questionOne, baseValueOne), prompt(questionTwo, baseValueTwo)];
}

// доп расходы 
// объявление переменных
let question1 = 'Какие обязательные ежемесячные расходы у вас есть?';
let question2 = 'Во сколько это обойдется?';
let qountQuestion = 2; // кол-во запросов по расходам 
let additionalСost = new Array(); // расходы

// cпросим про расходы и добавим в массив 
for (let index = 0; index < qountQuestion; index++) {
    additionalСost.push( getArrayRecord(question1, question2) );    
}

// вычислим доходы за месяц
let allExpense = 0;

additionalСost.forEach((element) => {
    allExpense += Number(element[1]);
});

let budgetMonth = money - allExpense;
console.log('Доход за месяц:', budgetMonth);

// расчет кол-ва месяцев для достижения фин. цели 
let missionMonthCount = mission / budgetMonth;
console.log('Достижение цели', mission,'за', Math.ceil( missionMonthCount), 'мес.');

// вычисления бюджета на день
let dayInMonth = 30;
let budgetDay = money / dayInMonth;
console.log('Дневной бюджет:', Math.floor(budgetDay));

// определим уровень дохода за день
switch (true) {
    
    case (budgetDay > 800):
        console.log('Высокий уровень дохода');
        break;
    
    case (budgetDay > 300 && budgetDay < 800):
        console.log('Средний уровень дохода');
        break;

    case (budgetDay > 0 && budgetDay < 300):
        console.log('Низкий уровень дохода');
        break;

    case (budgetDay < 0):
        console.log('Что-то пошло не так');
        break;

};
