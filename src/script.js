'use strict';

// дополнительный доход
let income = 0; 

// сумма необходимого накопления
let mission = 400000;

// доход за месяц
let money = prompt('Ваш месячный доход?', '50000');

// возврат значения ввиде массива вопрос / ответ
let getArrayRecord = function(questionOne, questionTwo, baseValueOne = '1', baseValueTwo = '200') {
    return [prompt(questionOne, baseValueOne), prompt(questionTwo, baseValueTwo)];
};

// выводим тип передаваемого значения
let showTypeOf = function(data) {
    console.log(data, typeof(data));
};
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

// расчитаем доходы за месяц 
let accumulatedMonth = getAccumulatedMonth(getExpensesMonth(additionalСost), money);
console.log('Доход за месяц:', accumulatedMonth);

// расчет кол-ва месяцев для достижения фин. цели 
let missionMonthCount = getTargetMonth(mission, accumulatedMonth);
console.log('Достижение цели', mission,'за', Math.floor(missionMonthCount), 'мес.');


// расчет всех расходов 
function getExpensesMonth(expenses) {

    let allExpense = 0;

    expenses.forEach((element) => {
        allExpense += Number(element[1]);
    });

    return allExpense;
};

// вычисление доходов за месяц
function getAccumulatedMonth(moneyPerMonth, expenses) {

    return  expenses - moneyPerMonth ;

};

// период для достижения финансовой цели
function  getTargetMonth(missionMonth, monthBudget) {
    return missionMonth / monthBudget;
};

// вычисления бюджета на день
function getStatusIncome(money) {

    let dayInMonth = 30;
    let budgetDay = money / dayInMonth;    

    switch (true) {
    
        case (budgetDay >= 800):
            return 'Высокий уровень дохода';
            break;
    
        case (budgetDay >= 300 && budgetDay < 800):
            return 'Средний уровень дохода';
            break;

        case (budgetDay > 0 && budgetDay < 300):
            return 'Низкий уровень дохода';
            break;

        case (budgetDay <= 0):
            return 'Что-то пошло не так';
            break;

    };
};
