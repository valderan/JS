'use strict';

// реализация основной логики работы с данными 
// Личный бюджет
class AppData {

    constructor (deposit_ = false, mission_ = 500000, period_ = 3) {
        this.income = {};               
        this.addIncome = [];            
        this.expenses = {};             
        this.addExpenses = [];          
        this.deposit = deposit_; 
        this.percentDeposite = 0;
        this.moneyDeposite = 0;      
        this.mission = mission_;        
        this.period = period_;   
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        
    };

    // работа с пользователем, ввод данных 

    // сумма заработанных за период денег
    calcSavedMoney() {
        return this.budgetMonth * this.period;
    };
 
    // работа(ввод данных) с данными по депозиту
    getInfoDeposit() {
        if (this.deposit) {

            // спросим процент по депозиту
            let question1 = 'Какой годовой процент по депозиту?';
            let result1 = prompt(question1, 10);
            while(!this.validValue(result1)) {
                result1 = prompt(question1, 10);
            };
            this.percentDeposite = result1;

            // спросим сумму депозита 
            let question2 = 'Какова сумма депозита?';
            let result2 = prompt(question2, 10000);
            while(!this.validValue(result2)) {
                result2 = prompt(question2, 10000);
            };
            this.moneyDeposite = result2;
        }
    };


    // расчет сроков достижения финансовой цели 
    getTargetMonth () {

        return Math.ceil(this.mission / this.budgetMonth);

    };

    // расчет бюджета за месяц и день запись результата
    getBudget (dayInMonth = 30) {

        // бюджет за месяц
        this.budgetMonth = +this.budget + this.getIncomeMonth() - this.getExpencesMonth();

        // бюджет за день
        this.budgetDay = +this.budgetMonth / dayInMonth;
        
    };

    // расчет всех дополнительных расходов, возврат суммы всех расходов 
    // как по заданию - перебор через for in
    getExpencesMonth () {

        let result = 0;
        for (let key in this.expenses) {
            result +=  +this.expenses[key];
        }
        this.expensesMonth = result;
        return result;

    };

    getIncomeMonth() {
        
        let result = 0;
        for (let key in this.income) {
            result +=  +this.income[key];
        }
        return result;
    }

    // зададим месячный доход
    setBudget (money) {

        if (!this.validValue(money)) {
            return false;
        }
        
        this.budget = salaryAmount.value;
        return true;

    };

    getStatusIncome () {

        let budgetDay = this.budgetDay;
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

    // проверка значений, входящий параметр содержать значения по описанному типу 
    // если данный тип не описан - будет всегда возращаться false
    // можно добавить любой тип для валидации
    validValue (value = '', type = 'number') {

        switch(type) {
            
            // значения должны содержать только цифры
            case 'number':
    
                 if (isNaN(value) || value === '' || value === null){ 
                    return false;
                 } else {
                     return true;
                 };
                
                 break;

            // значения могут содержать любые символы только не пустая строка     
            case 'fullString':

                if (value === '' || value === null){ 
                    return false;
                 } else {
                     return true;
                 };
                 
                break;     
        }

        return false;
    };

};


// кнопка старт
let btnStart = document.getElementById('start'),

btnCancel = document.getElementById('cancel'),

// кнопка добавления дополнительного дохода 
btnPlusIncomeAdd =  document.getElementsByTagName('button')[0],

// кнопка добавления обязательных расходов 
btnPlusExpensesAdd =  document.getElementsByTagName('button')[1],

// Дополнительный доход
incomeItem = document.querySelectorAll('.income-items'),

// checkbox депозит
checkDeposit = document.querySelector('#deposit-check'),

// возможный доход
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),  

// месячный доход
salaryAmount = document.querySelector('.salary-amount'),

// обязательные расходы
expences = document.querySelectorAll('.expenses'),
expensesItems = document.querySelectorAll('.expenses-items'),
expensesItemsString = document.querySelector('.expenses-items').getElementsByTagName('input'),

// возможные расходы
additionalExpensesItem = document.querySelector('.additional_expenses-item'),

// цель
targetAmount = document.querySelector('.target-amount'),

// период расчета
periodSelect = document.querySelector('.period-select'),
titlePeriodAmount = document.querySelector('.period').getElementsByClassName('title period-amount'),

// получаем все поля выводов
resultFields = document.querySelector('.result').getElementsByTagName('input'),
valueBudgetMonth = resultFields[0], // Доход за месяц
valueBudgetDay = resultFields[1], // Дневной бюджет
valueExpensesMonth = resultFields[2], // Расход за месяц
valueAdditionalIncome = resultFields[3], // Возможные доходы
valueAdditionalExpences = resultFields[4], // Возможные расходы
valueIncomePeriod = resultFields[5], // Накопления за период 
valueTargetMonth = resultFields[6]; // Срок достижения цели в месяцах


// объявим объект 
let calc = new AppData(true);


// функция вызываемая при нажатии на кнопку "расчитать"
calc.start = function() {

    // если месячный доход пустой - заканчиваем расчет    
    if (!calc.setBudget(salaryAmount.value)) {
        return;
    } 

    
    if (!calc.getExpences()) {
        alert('Заполните поля "Обязательные расходы" !');
        return;
    } 

    if (!calc.getIncome()) {
        alert('Заполните поля "Дополнительных доходов" !');
        return;
    }

    calc.getExpencesMonth();
    calc.getAddExpenses();
    calc.getAddIncome();
    calc.getBudget();
    calc.targetMonth();

    calc.inputDisable();
    calc.showResult();
};

// блокируем ввод всех элементов
calc.inputDisable = function() {
    let allData = Array.from(document.querySelector('.data').getElementsByTagName('input'));
    allData.forEach((element) => {
        if(element.type === 'text') {
            element.disabled = true;
        };
    });
    
    btnStart.style.display = 'none';
    btnCancel.style.display = 'block';
};

// добавление блока Обязательные расходы
calc.addExpensesBlock = function(count = 3) {
    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.getElementsByClassName('expenses-title')[0].value ='';
    cloneExpensesItem.getElementsByClassName('expenses-amount')[0].value ='';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if (expensesItems.length === count) {
        btnPlusExpensesAdd.style.display = 'none';
    }

};

//добавление блока дополнительного дохода
calc.addIncomeBlock = function(count = 3) {

    let cloneIncomeBlock = incomeItem[0].cloneNode(true);
    cloneIncomeBlock.getElementsByClassName('income-title')[0].value ='';
    cloneIncomeBlock.getElementsByClassName('income-amount')[0].value ='';
    incomeItem[0].parentNode.insertBefore(cloneIncomeBlock, btnPlusIncomeAdd);
    incomeItem = document.querySelectorAll('.income-items');

    if (incomeItem.length === count) {
        btnPlusIncomeAdd.style.display = 'none';
    }

};

// ввод обязательных расходов
calc.getExpences = function() {
    
    let result = true;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value; 
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if (calc.validValue(itemExpenses, 'fullString') && calc.validValue(cashExpenses)) {
            
            calc.expenses[itemExpenses] = cashExpenses;

        } else {
            
            result = false;
        };

    });

    return result;
};

//  ввод дополнительных доходов 
calc.getIncome = function () {
    
    let result = true;
    incomeItem.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value; 
        let cashIncome = item.querySelector('.income-amount').value;

        if (calc.validValue(itemIncome, 'fullString') && calc.validValue(cashIncome)) {
            calc.income[itemIncome] = cashIncome;
        } else {
            result = false;
        }

    });

    return result;
};

// отображение результата расчетов в полях справа
calc.showResult = function() {
    valueBudgetMonth.value = calc.budgetMonth;
    valueBudgetDay.value = Math.round(calc.budgetDay);
    valueExpensesMonth.value = calc.expensesMonth;
    valueAdditionalExpences.value = calc.addExpenses.join(', ');
    valueAdditionalIncome.value = calc.addIncome.join(',');
    valueTargetMonth.value = Math.ceil(calc.targetMonth());
    valueIncomePeriod.value = calc.calcPeriod();

    periodSelect.addEventListener('input', () => {
        // calc.setPeriod();
        // valueTargetMonth.value = Math.ceil(calc.targetMonth());
        calc.showResult();
    });
    
}

// добавление дополнительных расходов
calc.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if(item !== '') {
            calc.addExpenses.push(item);
        }
    });

};

// добавление возможного дохода 
calc.getAddIncome = function() {
    additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            calc.addIncome.push(itemValue);
        }
    });
};

// расчет фин цели
calc.targetMonth = function () {
     calc.mission = targetAmount.value;
     return calc.getTargetMonth();
}

// расчет за период
calc.calcPeriod = function() {
    calc.period = periodSelect.value;
    return calc.calcSavedMoney();
};

// изменение отображения значения периода мес
calc.setPeriod = function() {
    titlePeriodAmount[0].innerHTML = periodSelect.value;
};

// кнопка старт
btnStart.addEventListener('click', () => {
    calc.start();
});    

// добапвление строки расходов 
btnPlusExpensesAdd.addEventListener('click', () => {
    calc.addExpensesBlock();
});

// добавление строки дополнительных доходов
btnPlusIncomeAdd.addEventListener('click', () => {
    calc.addIncomeBlock();
});


periodSelect.addEventListener('click', () => {
    calc.setPeriod();
});


// проверка значений правильности ввода
function checkInputValid() {

    let dataDiv = Array.from(document.querySelector('.data').getElementsByTagName('input'));
    dataDiv.forEach((element) => {
    
        if (element.getAttribute('placeholder') === 'Наименование') {
            element.addEventListener('input', ()=> {
                element.value = element.value.replace(/[^а-яА-ЯёЁ .!,?]/,'');
            });
        }

        if (element.getAttribute('placeholder') === 'Сумма') {
            element.addEventListener('input', ()=> {
                element.value = element.value.replace(/[^\d.]/g,'');
            });
        }   
    });

}

checkInputValid();

document.querySelector('.data').addEventListener('DOMSubtreeModified', (event) => {
    checkInputValid();
});