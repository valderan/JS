'use strict';

// кнопка старт
let btnStart = document.getElementById('start'),

// кнопка добавления дополнительного дохода 
btnPlusIncomeAdd =  document.getElementsByTagName('button')[0],

// кнопка добавления обязательных расходов 
btnPlusExpensesAdd =  document.getElementsByTagName('button')[1],

// checkbox депозит
checkDeposit = document.querySelector('#deposit-check'),

// возможный доход
addItionalIncomeItem = document.querySelectorAll('.additional_income-item'),  

// месячный доход
salaryAmount = document.querySelector('.salary-amount'),

// обязательные расходы
expences = document.querySelectorAll('.expenses'),
expensesItems = document.querySelectorAll('.expenses-items'),
expensesItemsString = document.querySelector('.expenses-items').getElementsByTagName('input'),

// возможные расходы
additional_expensesItem = document.querySelector('.additional_expenses-item'),

// цель
targetAmount = document.querySelector('.target-amount'),

// период расчета
periodSelect = document.querySelector('.period-select'),
titlePeriodAmount = document.querySelector('.title period-amount'),

// получаем все поля выводов
resultFields = document.querySelector('.result').getElementsByTagName('input'),
valueBudgetMonth = resultFields[0], // Доход за месяц
valueBudgetDay = resultFields[0], // Дневной бюджет
valueExpensesMonth = resultFields[0], // Расход за месяц
valueAdditionalIncome = resultFields[0], // Возможные доходы
valueAdditionalExpences = resultFields[0], // Возможные расходы
valueIncomePeriod = resultFields[0], // Накопления за период 
valueTargetMonth = resultFields[0]; // Срок достижения цели в месяцах


    
