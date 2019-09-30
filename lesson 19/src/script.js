'use strict';

//const fetch = require('node-fetch');

class GetURL {

    constructor (url = '') {

        this.url = url;
        this.errorRequest = 'Не удалось получить данные от сервера!';
        this.errorHTML = 'Не удается преобразовать в HTML';
    };

    async request(url = this.url) {

        try {
            let response = await fetch(this.url);
            let data = await response.json();
            return data;
        } catch (err) {
            throw new Error(this.errorRequest);
        }
    }

    async getHTML() {

        try {

            let obj = await this.request();
           
            if (obj.url || obj.file) {

                let url; 

                if (obj.url) {
                    url = obj.url;
                } else {
                    url = obj.file;
                }
                
                if (url.match(/\.(jpg|gif|jpeg|png)$/i) !== null) {
            
                    return { type:'pic', url: url };

                } 
                
                if (url.match(/\.(mp4|webm)$/i) !== null) {
                    
                    return { type:'video', url: url };
                } 
            } 

        } catch (err) {
            throw new Error(this.errorHTML);
        }
    }

};

const btnAll = document.getElementById('buttons'),
    divPic = document.getElementById('pic'),
    showPic = document.getElementById('showIMG'),
    divVideo = document.getElementById('video'),
    showVideo = document.getElementById('showVideo');

const show = (showObj) => {
    if (showObj.type) {
        
        let url = showObj.url;
        if (showObj.type === 'pic') {
            divVideo.style.display = 'none';
            showPic.src = url;
            divPic.style.display = 'block';        
        }

        if (showObj.type === 'video') {
            divPic.style.display = 'none';
            showVideo.src = url;
            divVideo.style.display = 'block';
        }           
    }
};

btnAll.addEventListener('click', event => {
    let target = event.target;
    
    if(target.matches('.dog') || target.matches('.cat')) {
        
        let url = ' https://aws.random.cat/meow';
        
        if (target.matches('.dog')) {
            url = 'https://random.dog/woof.json';
        };
 
        const woof = new GetURL(url);
        woof.getHTML()
                .then(responce => {
                    show(responce);
                });
    }   

});
