'use strict';

// элементы экрана
let calcElements = {};

// кнопка старт
calcElements['btnStart'] = document.getElementById('start');

// кнопка добавления дополнительного дохода 
calcElements['btnPlusIncomeAdd'] =  document.getElementsByTagName('button')[0];

// кнопка добавления обязательных расходов 
calcElements['btnPlusExpensesAdd'] =  document.getElementsByTagName('button')[1];

// checkbox депозит
calcElements['checkDeposit'] = document.querySelector('#deposit-check');

// возможный доход
calcElements['addItionalIncomeItem'] = document.querySelectorAll('.additional_income-item');  

// месячный доход
calcElements['salaryAmount'] = document.querySelector('.salary-amount');

// обязательные расходы
calcElements['expences'] = document.querySelectorAll('.expenses');
calcElements['expensesItems'] = document.querySelectorAll('.expenses-items');
calcElements['expensesItemsString'] = document.querySelector('.expenses-items').getElementsByTagName('input');

// возможные расходы
calcElements['additional_expensesItem'] = document.querySelector('.additional_expenses-item');

// цель
calcElements['targetAmount'] = document.querySelector('.target-amount');

// период расчета
calcElements['periodSelect'] = document.querySelector('.period-select');
calcElements['titlePeriodAmount'] = document.querySelector('.title period-amount');

// получаем все поля выводов
let resultFields = document.querySelector('.result').getElementsByTagName('input');

calcElements['valueBudgetMonth'] = resultFields[0]; // Доход за месяц
calcElements['valueBudgetDay'] = resultFields[0]; // Дневной бюджет
calcElements['valueExpensesMonth'] = resultFields[0]; // Расход за месяц
calcElements['valueAdditionalIncome'] = resultFields[0]; // Возможные доходы
calcElements['valueAdditionalExpences'] = resultFields[0]; // Возможные расходы
calcElements['valueIncomePeriod'] = resultFields[0]; // Накопления за период 
calcElements['valueTargetMonth'] = resultFields[0]; // Срок достижения цели в месяцах

console.log(calcElements);

    
