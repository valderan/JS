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
 
    // расчет сроков достижения финансовой цели 
    getTargetMonth () {

        return Math.ceil(this.mission / this.budgetMonth);

    };

    // расчет бюджета за месяц и день запись результата
    getBudget (dayInMonth = 30) {

        // бюджет за месяц
        this.budgetMonth = +this.budget + this.getIncomeMonth() - this.getExpencesMonth() + (this.moneyDeposite * this.percentDeposite)/12;

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

// кнопка старт / отмена
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
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),
depositBank = document.querySelector('.deposit-bank'),

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
    if (!this.setBudget(salaryAmount.value)) {
        return;
    } 

    //проверка заполнения расходов и дополнительных доходов 
    if (!this.getExpences()) {
        alert('Заполните поля "Обязательные расходы" !');
        return;
    } 

    if (!this.getIncome()) {
        alert('Заполните поля "Дополнительных доходов" !');
        return;
    }

    this.getExpencesMonth();
    
    let incomeData = [];
    additionalIncomeItem.forEach((element) => {
        incomeData.push(element.value);
    });
    this.getAddItems(this.addExpenses, additionalExpensesItem.value.split(','));
    this.getAddItems(this.addIncome, incomeData);

    this.getInfoDeposit();
    this.getBudget();
    this.targetMonth();
    this.inputDisable();
    this.showResult();
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

// очищение формы
function reset (calc) {

    // разблокируем поля 
    let allData = Array.from(document.querySelector('.data').getElementsByTagName('input'));
    allData.forEach((element) => {
        if(element.type === 'text') {
            element.disabled = false;
        };
    });

    // очистим все эллементы ввода 
    let dataDiv = Array.from(document.querySelector('.data').getElementsByTagName('input'));
    dataDiv.forEach((element) => {
        element.value = '';
    });

    periodSelect.value = 1;
    calc.setPeriod();

    // очистим поля результата
    for (let index = 0; index < resultFields.length; index++) {
        resultFields[index].value = '';         
    };

    // Вернем обязательные расходы к одной строке с кнопкой
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach((element, index) => {
        if (index > 0) {
            element.remove();
        };
    });
    btnPlusExpensesAdd.style.display = 'block';

    // Вернем дополнительные доходы к одной строке
    incomeItem = document.querySelectorAll('.income-items');
    incomeItem.forEach((element, index) => {
        if (index > 0) {
            element.remove();
        };
    });
    btnPlusIncomeAdd.style.display = 'block';
    
    // вернем кнопки к исходным данным
    btnStart.style.display = 'block';
    btnCancel.style.display = 'none';

    // переопределим объект
    calc = new AppData(true);

    periodSelect.removeEventListener('input', show);


};


calc.addDataBlock = function(items, btnPusItemAdd, type = '', count = 3) {
    
    if (type.length === 0) {
      type = items[0].parentNode.className;
    }
    let cloneItem = items[0].cloneNode(true);
    cloneItem.getElementsByClassName(`${type}-title`)[0].value ='';
    cloneItem.getElementsByClassName(`${type}-amount`)[0].value ='';
    items[0].parentNode.insertBefore(cloneItem, btnPusItemAdd);
    items = document.querySelectorAll(`.${type}-items`);
    
    if (items.length === count) {
        btnPusItemAdd.style.display = 'none';
    }
 
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItem = document.querySelectorAll('.income-items');
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
    valueBudgetMonth.value = this.budgetMonth;
    valueBudgetDay.value = Math.round(this.budgetDay);
    valueExpensesMonth.value = this.expensesMonth;
    valueAdditionalExpences.value = this.addExpenses.join(', ');
    valueAdditionalIncome.value = this.addIncome.join(',');
    valueTargetMonth.value = Math.ceil(this.targetMonth());
    valueIncomePeriod.value = this.calcPeriod();

    periodSelect.addEventListener('input', show);
    
}

function show() {
    calc.showResult();
};


// объединение двух методов
// calc.getAddItems();
// calc.getAddItems();
// добавление дополнительных расходов
// добавление возможного дохода 

calc.getAddItems = function(obj, items){

    items.forEach((item) => {
        item = item.trim();
        if(item !== '') {
            obj.push(item);
        }
    });

}

// расчет фин цели
calc.targetMonth = function () {
     this.mission = targetAmount.value;
     return this.getTargetMonth();
}

// расчет за период
calc.calcPeriod = function() {
    this.period = periodSelect.value;
    return this.calcSavedMoney();
};

// изменение отображения значения периода мес
calc.setPeriod = function() {
    titlePeriodAmount[0].innerHTML = periodSelect.value;
};

  // работа(ввод данных) с данными по депозиту
calc.getInfoDeposit = function() {
    if (this.deposit) {

        // процент депозита
        this.percentDeposite = depositPercent.value;
        // спросим сумму депозита 
        this.moneyDeposite = depositAmount.value;
    }
};


// навесим события на кнопки
calc.eventsListeners = function() {
// кнопка старт
    btnStart.addEventListener('click', () => {
        calc.start();
    });    

// добапвление строки расходов 
    btnPlusExpensesAdd.addEventListener('click', () => {
        //calc.addExpensesBlock();
        calc.addDataBlock(expensesItems, btnPlusExpensesAdd);
    });

// добавление строки дополнительных доходов
    btnPlusIncomeAdd.addEventListener('click', () => {
        //calc.addIncomeBlock();
        calc.addDataBlock(incomeItem, btnPlusIncomeAdd);
    });


    periodSelect.addEventListener('click', () => {
        calc.setPeriod();
    });

// очистка формы
    btnCancel.addEventListener('click', () => {
        reset(calc);
    });

    // проверка депозита
    checkDeposit.addEventListener('click', () => {
        if(checkDeposit.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', () => {
                let selectIndex = depositBank.options[depositBank.selectedIndex].value;
                if (selectIndex === 'other') {
                    depositPercent.style.display = 'inline-block';
                    depositPercent.disabled = false;
                    depositPercent.value = '';
                } else {
                    depositPercent.style.display = 'none';
                    depositPercent.disabled = true;
                    depositPercent.value = selectIndex;
                }
            });
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
            this.deposit = false;
        }
    });
};

calc.eventsListeners();

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

        if (element.getAttribute('placeholder') === 'Процент') {
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