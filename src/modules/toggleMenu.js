

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

export default toggleMenu;
