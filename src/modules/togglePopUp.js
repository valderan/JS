 
 
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

        // определение мобильного браузера
        function detectMobile() {
            if( (document.documentElement.clientWidth <= 768)  &&  (document.documentElement.clientHeight <= 680) ) {
              return true;
            } else {
              return false;
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

export default togglePopUp;
