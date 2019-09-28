window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';

    function countTimer(deadline) {

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60),
                day = Math.floor(timeRemaining / 60 / 60 / 24);

            return {timeRemaining, hours, minutes, seconds, day};
        }

        function updateClock(idInterval) {
            let timer = getTimeRemaining(),
                hours = 0, minutes =0, seconds = 0;

                (timer.hours >= 0) ? hours = timer.hours : hours;
                (timer.minutes >= 0 ) ? minutes = timer.minutes : minutes; 
                (timer.seconds >= 0) ? seconds = timer.seconds : seconds;


            (hours > 9) ? timerHours.textContent = hours : timerHours.textContent = '0' + hours;
            (minutes > 9) ? timerMinutes.textContent = minutes : timerMinutes.textContent = '0' + minutes;
            (seconds > 9) ? timerSeconds.textContent = seconds: timerSeconds.textContent = '0' + seconds ;

            if (timer.timeRemaining <= 0) {
                timerHours.parentElement.style.color = 'red';
            }

        }

        function stopClock(idInterval) {
            
            let timer = getTimeRemaining();
            
            if (timer.timeRemaining <= 0 ) {
                clearInterval(idInterval);
            } else {
                setTimeout(stopClock, 1000, idInterval);
            }

        }

        let idInterval = setInterval(updateClock, 1000);
        setTimeout(stopClock, 1000, idInterval);

    }

    countTimer('01 october 2019 21:00:00');

    // menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');
           

        // cскрытие меню
        const outsideClickListener = () => {

            const hideMenu = (event) => {

                let target = event.target;
                let fistStart = target.closest('.menu'); 
                let focus = target.classList.contains('active-menu');
                
                if (!fistStart && !focus) {
                
                    handlerMenu();  // закроем меню 
                    removeClickListener(); // удалим слуштаеля

                } 
            };

            // удаление слушателя для меню 
            const removeClickListener = () => {
                document.removeEventListener('click', hideMenu);
            };

            // добавление слушателя            
            document.addEventListener('click', hideMenu);
            
        };

        const handlerMenu = () => {
            
            menu.classList.toggle('active-menu');

            if( menu.classList.contains('active-menu') ) {
                outsideClickListener();  
            } 

        };
        
         btnMenu.addEventListener('click', handlerMenu);
       
        
    };

    toggleMenu();

    // определение мобильного браузера
    function detectMobile() {
        if( (document.documentElement.clientWidth <= 768)  &&  (document.documentElement.clientHeight <= 680) ) {
          return true;
        } else {
          return false;
        }
     };

    // popup
    const togglePopUp = () => {
        
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        // откроем popup
        const popupOpen = () => {

            let count = 0;
            
            if (detectMobile()) {
                popup.style.display = 'block';    
            } else {
                popupContent.style.left = '1%';
                popup.style.display = 'block';    
                draw();
            };

            function draw() {
                count++;
                if (count < 48) {
                    popupContent.style.left = count + '%';
                    setTimeout(draw, 5);  
                }
            };

        
        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', popupOpen);
        });

        popup.addEventListener('click', (event) => {
            
            let target = event.target;
                
            // заакрытие окна на кнопку
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                // закрытие окна в notarget
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        
            

        });

    };

    togglePopUp();

    // tabs 
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');

            if (target.classList.contains('service-header-tab')) {
                
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    // добавление точек(кнопок) соотвествующий кол-ву слайдов
    const addDot = (count = 1) => {
        const dots = document.querySelector('.portfolio-dots'),
            slide = document.querySelectorAll('.portfolio-item');

        for (let index = 0; index < slide.length; index++) {
            
            let li = document.createElement('li');
            li.classList.add('dot');
            if (index === (count - 1)) {
                li.classList.add('dot-active');
            };

            dots.appendChild(li);
        }

    };

    addDot();

    // slider 
    const slider = () => {

        // оопределим элементы страницы
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        // объявим переменный для работы
        let currentSlide = 0,           //  текущий слайд
            timeToSlide = 1500,         //  время прокрутки слайдов 
            interval;                   //  id таймера запуска прокрутки слайдов


        //  убираем класс для отображения в заданном элементе страницы  
        //  @elem - (slide, btn) элемент страницы для удаления класса
        //  @index - порядковый номер элемента в массиве
        //  @strClass - наименование класса для удаления
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        //  добавляем класс для отображения в заданном элементе страницы  
        //  @elem - (slide, btn) элемент страницы для добавления класса
        //  @index - порядковый номер элемента в массиве
        //  @strClass - наименование класса для добавления
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        // запуск автопроигрования слайдов для setInterval
        const autoPlaySlide = () => {
            
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        // запуск autoPlaySlide (атопроигрования) с интервалом
        // @time - интервал в мс по умолчанию timeToSlide
        // id счетчика записывается в interval
        const startSlide = (time = timeToSlide) => {
            interval = setInterval(autoPlaySlide, time);
        };

        // остановка автопроигрования 
        const stopSlide = () => {
            clearInterval(interval);
        };

        // cслушатель для слайдера
        // нажатие кнопки влево 
        // нажатие кнопки вправо
        // нажатие на точки 
        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
               return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');


            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if(target.matches('#arrow-left')) {
                currentSlide--;
            } else if(target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            };

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length-1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        // остановка автопрокрутки слайдера при наведении мыши на кнопки: вправо, влево, точки
        slider.addEventListener('mouseover', (event) => {

            if(event.target.matches('.portfolio-btn, .dot')) {
                stopSlide();
            } 

        });

        // запуск автопрокрутки слайдера, если мышь не наведена на кнопки: вправо, влево, точки
        slider.addEventListener('mouseout', (event) => {

            if(event.target.matches('.portfolio-btn, .dot')) {
                startSlide();
            }

        });

        startSlide();
    };

    slider();


    // замена фото команды на новое при наведении и возврат старого фото, при уводе мышки с фото
    const imgReplacement = () => {

        const photo = Array.from(document.querySelectorAll('.command__photo')),
            command = document.getElementById('command');

        
        const reverseAttr = (target) => {
            let dataImg = target.getAttribute('data-img'),
                srcImg =  target.getAttribute('src');
                target.setAttribute('src', dataImg);
                target.setAttribute('data-img', srcImg);
        };
        
        command.addEventListener('mouseover', (event) => {
            let target = event.target;    
            if (target.matches('.command__photo')) {
                reverseAttr(target);
            }
        });

        command.addEventListener('mouseout', (event) => {
            let target = event.target;    
            if (target.matches('.command__photo')) {
                reverseAttr(target);
            }
        });


    };

    imgReplacement();


    // работа с калькулятором

    // проверка значений правильности ввода калькулятора, только цифры
    function checkInputValid() {

        let dataDiv = Array.from(document.querySelector('.calc-block').getElementsByTagName('input'));

        dataDiv.forEach((element) => {
            element.addEventListener('input', ()=> {
                element.value = element.value.replace(/[^\d.1]/g,'');
            });   
        });

    }

    checkInputValid();

    // калькулятор
    const calc = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totaValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }


            if (calcDay && calcDay.value < 5) {
                dayValue *= 2;
            } else if(calcDay && calcDay.value < 10){
                dayValue *= 1.5;
            }


            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            } 
            
            totaValue.textContent = Math.round(total);
        };

        calcBlock.addEventListener('change', (event) => {           
            let target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            };
        });
    }; 

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

    // запрет ввода
    for (let index = 1; index < 5; index++) {
        let nameForm = `form${index}-name`;
        
        if (index === 4) nameForm = `form2-message`;

        let element = document.getElementById(nameForm);
        element.addEventListener('input', ()=> {
            element.value = element.value.replace(/[^а-яА-ЯЁё ]/,'');
        });  
    }

    // send-ajax-form
    const sendForm = (formName) => {

        const errorMessage = 'Что-то пошло не так!',
            fillFormMessage = 'Поля формы заполены неверно!',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.getElementById(formName);
        const elementsForm = [...form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });

        const statusMessage = document.createElement('div');
        statusMessage.textContent = 'Тут будет сообщение!';
        statusMessage.style.cssText = 'font-size: 2rem; color: red';

        form.addEventListener('submit', (event) => { 
            
            event.preventDefault();
            form.appendChild(statusMessage);

            // проверка кол-ва ошибок
            const elementsForm = [...form.elements].filter(item => {
                return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
            });
            let status = 0;
            elementsForm.forEach(elem => {
                if (elem.classList.contains('error')) status++;
            });

            if (status > 0) {
                statusMessage.textContent = fillFormMessage;
                return;
            }
            // end проверка аол-ва ошибок
            
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};
    
            formData.forEach((val, key) => {
                body[key] = val;
            });
           
            const postData = (body) => {
    
                return new Promise((resolve, reject) => {
                    
                    const request = new XMLHttpRequest();
                    
                    request.open('POST', './server.php');
                    request.setRequestHeader('Content-Type', 'application/json');

                    request.addEventListener('readystatechange', () => {
                        
                        if (request.readyState !== 4) {
                            reject;
                        }
        
                        if (request.status === 200) {
                            resolve();
                        } else {
                            reject(request.status)
                        }
    
                    });

                    //request.setRequestHeader('Content-Type', 'multipart/form-data');            
                    request.send(JSON.stringify(body));    

                });
                
            };

            postData(body)
                .then(() => {
                // resolve
                    statusMessage.textContent = successMessage;
                    
                    elementsForm.forEach(elem => {
                        elem.classList.remove('success');
                        elem.value = '';
                    });

                })
                .catch((error) => {
                // reject
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
            
        });


    };

    sendForm('form1');
    sendForm('form2');
    sendForm('form3');

   

});


