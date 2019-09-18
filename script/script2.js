'use strict';

function DomElement(params) {
    
    this.selctor = '';
    this.height = '300px';
    this.width = '300px';
    this.bg =  '#060';
    this.fontSize = '45px';
};

DomElement.prototype.create = function(param, text = '') {

    console.log('First elem: ', param.charAt(0));

    let typeElem = '';

    switch (param.charAt(0)) {
        
        case '.':
            typeElem = 'div';
            break;
    
        case '#':
            typeElem = 'p';
            break;

    }
    

    let element = document.createElement(typeElem);
    element.innerText = text;
    element.className = param.substr(1);
    element.style.width = this.width;
    element.style.height = this.height;
    element.style.backgroundColor = this.bg;
    element.style.fontSize = this.fontSize;
    document.body.insertAdjacentElement('beforeend', element);
};

let test = new DomElement();

test.create('#testClass', 'test string');
