

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
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        }

        postData(body)
                .then((response) => {
                    if(response.status !== 200) {
                        throw new Error('Status network not 200');
                    }

                    elementsForm.forEach(elem => {
                        elem.classList.remove('success');
                        elem.value = '';
                    });

                    statusMessage.textContent = successMessage;
                })
                .catch ((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        
    });

};

export default sendForm;