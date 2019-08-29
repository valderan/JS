'use strict';

// дополнительный доход
let income = 0; 

// сумма необходимого накопления
let mission = 400000;

// доход за месяц
let money;

// ввод и проверка суммы ежемесячного дохода
let start = function() {
    money = prompt('Ваш месячный доход?', '50000');

    while (isNaN(money) || money === '' || money === null) {
        money = prompt('Ваш месячный доход?', '50000');
    }

}

// возврат значения ввиде массива вопрос / ответ
let getArrayRecord = function(questionOne, questionTwo, baseValueOne = '1', baseValueTwo = '200') {
    //введем данные 
    let resultOne = prompt(questionOne, baseValueOne),
        resultTwo = prompt(questionTwo, baseValueTwo);

    // проверим чтоб значение было число
    while(isNaN(resultTwo) || resultTwo === '' || resultTwo === null) {
        resultTwo = prompt(questionTwo, baseValueTwo);
    }

    return [resultOne, resultTwo];
};

// выводим тип передаваемого значения
let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

// расходы
let additionalСost = new Array(); 

/*
Добавление/удаление расходов
    costs(array) - массив расходов;
    count(int) - кол-во операций добавления;
    reload(boolean) - флаг очистки: 
            false - добавление в конец существующего массива 
            true - очистка массива перед добавлением
*/
let setExpenses = function(costs, count = 2, reload = false) {

    let question1 = 'Какие обязательные ежемесячные расходы у вас есть?';
    let question2 = 'Во сколько это обойдется?';
    let qountQuestion = count; // кол-во запросов по расходам 

    // reload === true очистка массива перед добавлением
    if (reload) {
        let countDelElem = costs.length;
        costs.splice(0, countDelElem);
    }

    // cпросим про расходы и добавим в массив 
    for (let index = 0; index < qountQuestion; index++) {
        costs.push( getArrayRecord(question1, question2) );    
    }

};

// расчет всех расходов 
function getExpensesMonth(expenses) {

    // зададим дополнительные расходы
    setExpenses(expenses);

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

// информация об уровне дохода
function getStatusIncome(budgetDay) {
  
    switch (true) {
    
        case (budgetDay >= 800):
            return 'Высокий уровень дохода';
            break;
    
        case (budgetDay >= 300 && budgetDay < 800):
            return 'Средний уровень дохода';
            break;

        case (budgetDay >= 0 && budgetDay < 300):
            return 'Низкий уровень дохода';
            break;

        case (budgetDay < 0):
            return 'Что-то пошло не так';
            break;

    };
};

/*
    Вычисление суммы зароботка в день
    money - месячный доход 
    dayInMonth - кол-во дней в месяце 
*/
function getBudgetDay(money, dayInMonth = 30) {
    return money / dayInMonth;
}


// зададим сумму ежемесячного дохода
start();

// расчитаем доходы за месяц 
let accumulatedMonth = getAccumulatedMonth(getExpensesMonth(additionalСost), money);
console.log('Доход за месяц:', accumulatedMonth);

// расчет кол-ва месяцев для достижения фин. цели 
let missionMonthCount = getTargetMonth(mission, accumulatedMonth);
if (missionMonthCount > 0) {
    console.log('Достижение цели', mission,'за', Math.floor(missionMonthCount), 'мес.');
} else {
    console.log('Цель не будет достигнута');
}

// вычислим бюджет на день и выведем сообщение при отрицательном бюджете
let budgetDay = getBudgetDay(accumulatedMonth);
if ( budgetDay < 0) {
    console.log(getStatusIncome(budgetDay));
};


