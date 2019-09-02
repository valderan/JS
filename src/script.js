'use strict';

// объект финстрока содержащий наименование и сумму 
// 
class FinDataString {

    constructor (name_ = '', value_ = 0) {
        this.name = name_;
        this.value = value_;
    }

    // добавление комментария записи
    setName (name_) {
        this.name = String(name_);
    }

    // добавление значения 
    setValue (value_) {

        if (isNaN(value_) || value_ === '' || value_ === null) {
            return false;
        };

        this.value = Number(value_);
        return true;
    }

    // добавление целой строки
    setString(name_, value_) {
        this.setName(name_);
        return this.setValue(value_);
    }

    // очистка 
    clear () {
        this.name = '';
        this.value = 0;
    }
    
};

// множество записей FinDataString и логика работы 
class FinArrayBudget {
    
    constructor() {
        this.data = [];
        this.record = new FinDataString();
    }

    // добавление строки
    addString(name, value) {
        return this.record.setString(name, value);
    }

    // загрузка строки в массив
    load() {
        let strNew = new FinDataString();
        strNew.setString(this.record.name, this.record.value);
        this.data.push(strNew);
        this.record.clear();
    }
    
    // подсчет всех значений
    getAllValues() {
        let result = 0;
        this.data.forEach(element => {
            console.log(element);
            result += element.value;
        });

        return result;
    }

    // кол-ва записей в таблице 
    length() {
        return this.data.length;
    }

    // возврат ввиде объекта структура { “name” : “value” ...}
    getObj() {
        
        let obj = {};
        this.data.forEach(element => {
            obj[element.name] = element.value;
        });       

        return obj;
    }

}

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
        
        /* 
            объект предоставляющий функционал по работе с расходами
            используя паттерн проектирования "стратегия", можно использовать
            любой вид хранения и обработки данных, включая обращение к другим ресурсам 
        */
        this.budgetOBJ = new FinArrayBudget(); // объект расчета дополнительных расходов
        this.addIncomeOBJ = new FinArrayBudget(); // объект расчета дополнительных доходов
    }

    // работа с пользователем, ввод данных 
    asking () {

        // спросим месячный доход 
        this.setBudget();

        // спросим про доп. источник заработка
        if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
            this.setAdditionalIncome();
            this.income = this.addIncomeOBJ.getObj();
        }

        // спросим про депозит если есть 
        this.getInfoDeposit();

        // спросимм про дополнительные расходы
        this.setExpenses();

        // спросим расходы 
        this.setExpencesMonth();

        // расчет расходов
        this.getExpencesMonth();

        // расчет дневного и месячного бюджета
        this.getBudget();

    };


    // сумма заработанных за период денег
    calcSavedMoney() {
        return this.budgetMonth * this.period;
    }
 
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
    }

    // ввод дополнительного заработка
    setAdditionalIncome(count = 1, budgetOBJ = this.addIncomeOBJ) {

        let question1 = 'Какой у Вас дополнительный заработок?';
        let question2 = 'Сколько в месяц Вы на этом зарабатываете?';

        this.setBudgetObject(count, budgetOBJ, question1, question2);

    };


    // расчет сроков достижения финансовой цели 
    getTargetMonth () {

        return Math.ceil(this.mission / this.budgetMonth);

    };

    // расчет бюджета за месяц и день запись результата
    getBudget (dayInMonth = 30) {

        // бюджет за месяц
        this.budgetMonth = this.budget - this.getExpencesMonth();

        // бюджет за день
        this.budgetDay = this.budgetMonth / dayInMonth;
        
    };

    // расчет всех дополнительных расходов, возврат суммы всех расходов 
    // как по заданию - перебор через for in
    getExpencesMonth (budgetOBJ = this.budgetOBJ) {
        this.expenses = budgetOBJ.getObj();
        //this.expensesMonth = budgetOBJ.getAllValues();
        let result = 0;
        for (let key in this.expenses) {
            result +=  this.expenses[key];
        }
        
        this.expensesMonth = result;
        return result;
    };

    // ввод обязательных расходов(перечисление)
    setExpenses() {

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
                         'оружие, наркотики, шлюхи');
        
        this.addExpenses = addExpenses.split(',');

    }

    // работа с бюджетом(FinArrayBudget) любого типа - ввод данных 
    setBudgetObject(count, budgetOBJ, question1 = '', question2 = '') {
       
        for (let index = 0; index < count; index++) {
            
            let result1 = prompt(question1);
            while(!this.validValue(result1, 'fullString')) {
                result1 = prompt(question1);
            };

            let result2 = prompt(question2);
            while(!this.validValue(result2)) {
                result2 = prompt(question2, (index+1) * 100);
            };

            
            budgetOBJ.addString(result1, result2);
            budgetOBJ.load();
        }    
    };

    // создание дополнительных расходов 
    setExpencesMonth (count = 2, budgetOBJ = this.budgetOBJ) {
        
        let question1 = 'Какие обязательные ежемесячные расходы у вас есть?';
        let question2 = 'Во сколько это обойдется?';

        this.setBudgetObject(2, budgetOBJ, question1, question2);
        
    };

    // зададим месячный доход
    setBudget () {
        this.budget = prompt('Ваш месячный доход?', '50000');
        
        while(!this.validValue(this.budget)) {
            this.budget = prompt('Ваш месячный доход?', '50000');
        }

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


// объявим объект 
let firstPerson = new AppData(true);
firstPerson.asking();

// выведем необходимые значения
console.log('Расходы за месяц - ', firstPerson.expensesMonth);
if (firstPerson.getTargetMonth() > 0) {
    console.log('Необходимая сумма:', firstPerson.mission, 'будет достигнута за', firstPerson.getTargetMonth(), 'мес.');
} else {
    console.log('Финансовая цель достигнута не будет!');
}
console.log(firstPerson.getStatusIncome());

/*
// Вывод структуры объекта 
console.log('');
console.log('Наша программа включает в себя данные:');
for (let key in firstPerson) {
    console.log(key, ' - ', firstPerson[key]);
}
*/

// вывод всех  значений addExpenses каждое слово с большой буквы слова разделены запятой и пробелом
let workArr = firstPerson.addExpenses;
let resultArr = [];
let stringResult = '';
let separator = ', ';

workArr.forEach(element => {

    let testString = element;
    let stringArr = testString.split(' ');

    stringArr.forEach(element => {

        let wordResult = String(element.charAt(0)).toUpperCase() + element.substr(1);
        if (wordResult.length > 0) {
            resultArr.push(wordResult);
        };  

    });

});

resultArr.forEach((element, index) => {
    (index > 0) ? stringResult += separator + element : stringResult += element;
});

console.log(stringResult);