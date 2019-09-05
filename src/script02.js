'use strict';

let date = new Date();

// вывод в body
let out = function (string = '', br = true, position = 'beforeend') {
    if (br) {
        string += '<br>';
    }
    document.body.insertAdjacentHTML(position, string);
};

let htmlString = date.toLocaleString().split(',')[1] + ' ' 
                + date.toLocaleString().split(',')[0];
          
out(htmlString);

// проверка времени
let checkTime = function(tString) {
    
    let tArr = tString.split(' '),
        hms = tArr[0].split(':'),
        dms = tArr[1].split('.');
    
        hms.forEach((element, index) => {

            if (Number(element) < 10 ) {
                hms[index] = '0' + hms[index]
            }

        });

        dms.forEach((element, index) => {

            if (Number(element) < 10 ) {
                dms[index] = '0' + dms[index]
            }

        });
        
        let hmsString = hms[0] + ':' + hms[1] + ':' + hms[2],
            dmsString = dms[0] + '.' + dms[1] + '.' + dms[2]    
         
        return hmsString + ' ' + dmsString;
};

out(checkTime('9:5:3 1.6.2019'));