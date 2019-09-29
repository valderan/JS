
'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import 'formdata-polyfill';
import 'es6-promise/auto';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import addDot from './modules/addDot';
import slider from './modules/slider';
import imgReplacement from './modules/imgReplacemen';
import checkInputValid from './modules/checkInputValid';
import calc from './modules/calc';
import Validator from './modules/validator';
import checkInputFormNames from './modules/checkInputFormNames';
import sendForm from './modules/sendForm';


// таймер
countTimer('01 october 2019 21:00:00');

// меню
toggleMenu();

// popup
togglePopUp();

// табы
tabs();

// добавление точек(кнопок) соотвествующий кол-ву слайдов
addDot();

// slider 
slider();

// замена фото команды на новое при наведении и возврат старого фото, при уводе мышки с фото
imgReplacement();

// работа с калькулятором
// проверка значений правильности ввода калькулятора, только цифры
checkInputValid();

// калькулятор
calc(100);

// валидация заявки в header
const validForm1 = new Validator({
        selector: '#form1',
        pattern: {},
        method: {
            'form1-phone': [
                ['notEmpty'],
                ['pattern', 'phone']
            ],
            'form1-email': [
                ['notEmpty'],
                ['pattern', 'email']
            ]
        }
});

// валидация формы в footer
const validForm2 = new Validator({
        selector: '#form2',
        pattern: {
            //name: /^[а-яА-ЯёЁ]*$/,
            //message: /^[а-яА-ЯёЁ .!,?]*$/
        },
        method: {
            'form2-phone': [
                ['notEmpty'],
                ['pattern', 'phone']
            ],
            'form2-email': [
                ['notEmpty'],
                ['pattern', 'email']
            ]
        }
});

// валидация формы в footer
const validForm3 = new Validator({
        selector: '#form3',
        pattern: {
            //name: /^[а-яА-ЯёЁ]*$/,
        },
        method: {
            'form3-phone': [
                ['notEmpty'],
                ['pattern', 'phone']
            ],
            'form3-email': [
                ['notEmpty'],
                ['pattern', 'email']
            ]
        }
});

validForm1.init();
validForm2.init();
validForm3.init();

// запрет ввода полей форм name и текста сообщения формы 2
checkInputFormNames();

// send-ajax-form
sendForm('form1');
sendForm('form2');
sendForm('form3');