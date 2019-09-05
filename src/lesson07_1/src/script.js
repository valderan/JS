'use strict';

// удалим рекламу
document.querySelector('.adv').classList.remove('adv');

// расставим как положено книги 
let books = document.querySelectorAll('.books'), 
    book = document.querySelectorAll('.book');

books[0].insertBefore(book[1], book[0]);
books[0].insertBefore(book[4], book[2]);
books[0].insertBefore(book[5], book[3]); 
book = document.querySelectorAll('.book');
books[0].insertBefore(book[5], book[3]);
book = document.querySelectorAll('.book');
books[0].insertBefore(book[5], book[4]);
book = document.querySelectorAll('.book');

//меняем картинку фона
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// исправим заголовок Книга 3. this и Прототипы Объектов
document.querySelectorAll('a')[2].textContent = 'Книга 3. this и Прототипы Объектов';

// Исправим порядок глав во второй и пятой книге
let ul = book[1].getElementsByTagName('ul'),
    li = book[1].getElementsByTagName('li');

ul[0].insertBefore(li[6], li[4]);
ul[0].insertBefore(li[8], li[5]);
ul[0].insertBefore(li[2], li[10]);

ul = book[4].getElementsByTagName('ul'),
li = book[4].getElementsByTagName('li');

ul[0].insertBefore(li[9], li[2]);
ul[0].insertBefore(li[3], li[6]);
ul[0].insertBefore(li[6], li[9]);

// добавим главу в 6 книге
ul = book[5].getElementsByTagName('ul'),
li = book[5].getElementsByTagName('li');
let clone = li[1].cloneNode().textContent;
clone.textContent = 'Глава 8: За пределами ES6';
ul[0].append(clone);