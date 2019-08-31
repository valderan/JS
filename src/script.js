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
        this.budgetOBJ = new FinArrayBudget() // объект расчета дополнительных расходов
    }

    // работа с пользователем, ввод данных 
    asking () {

        // спросим месячный доход 
        this.setBudget();

        // спросим расходы 
        this.setExpencesMonth();

        // расчет расходов
        this.getExpencesMonth();

        // расчет дневного и месячного бюджета
        this.getBudget();


    }

    // расчет сроков долстижения финансовой цели 
    getTargetMonth () {

        return Math.ceil(this.mission / this.budgetMonth);

    };

    // расчет бюджета за месяц и день запись результата
    getBudget (dayInMonth = 30) {

        // бюджет за месяц
        this.budgetMonth = this.budget - this.getExpencesMonth();

        // бюджет за день
        this.budgetDay = this.budgetMonth / dayInMonth;
        
    }

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
    }

    // создание дополнительных расходов 
    setExpencesMonth (count = 2, budgetOBJ = this.budgetOBJ) {
        
        let question1 = 'Какие обязательные ежемесячные расходы у вас есть?';
        let question2 = 'Во сколько это обойдется?';

        for (let index = 0; index < count; index++) {
            
            let result1 = prompt(question1, 'Расходы список ' + (index+1) );
            let result2 = prompt(question2, (index+1) * 100);

            while(!this.validValue(result2)) {
                let result2 = prompt(question2, (index+1) * 100);
                console.log(result2);
            };

            
            budgetOBJ.addString(result1, result2);
            budgetOBJ.load();
        }
        
    }

    // зададим месячный доход
    setBudget () {
        this.budget = prompt('Ваш месячный доход?', '50000');
        
        while(!this.validValue(this.budget)) {
            this.budget = prompt('Ваш месячный доход?', '50000');
        }

    }

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
        }

        return false;
    }

};


// объявим объект 
let firstPerson = new AppData();
firstPerson.asking();

// выведем необходимые значения
console.log('Расходы за месяц - ', firstPerson.expensesMonth);
if (firstPerson.getTargetMonth() > 0) {
    console.log('Необходимая сумма:', firstPerson.mission, 'будет достигнута за', firstPerson.getTargetMonth(), 'мес.');
} else {
    console.log('Финансовая цель достигнута не будет!');
}
console.log(firstPerson.getStatusIncome());