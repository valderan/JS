
function checkInputValid() {

    let dataDiv = Array.from(document.querySelector('.calc-block').getElementsByTagName('input'));

    dataDiv.forEach((element) => {
        element.addEventListener('input', ()=> {
            element.value = element.value.replace(/[^\d.1]/g,'');
        });   
    });

};

export default checkInputValid;