

const checkInputFormNames = () => {
    for (let index = 1; index < 5; index++) {
        let nameForm = `form${index}-name`;
        
        if (index === 4) nameForm = `form2-message`;

        let element = document.getElementById(nameForm);
        element.addEventListener('input', ()=> {
            element.value = element.value.replace(/[^а-яА-ЯЁё ]/,'');
        });  
    };
};

export default checkInputFormNames;