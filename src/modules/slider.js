

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


export default slider;