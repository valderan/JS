

const imgReplacement = () => {

        const photo = Array.from(document.querySelectorAll('.command__photo')),
            command = document.getElementById('command');

        
        const reverseAttr = (target) => {
            let dataImg = target.getAttribute('data-img'),
                srcImg =  target.getAttribute('src');
                target.setAttribute('src', dataImg);
                target.setAttribute('data-img', srcImg);
        };
        
        command.addEventListener('mouseover', (event) => {
            let target = event.target;    
            if (target.matches('.command__photo')) {
                reverseAttr(target);
            }
        });

        command.addEventListener('mouseout', (event) => {
            let target = event.target;    
            if (target.matches('.command__photo')) {
                reverseAttr(target);
            }
        });


};

export default imgReplacement;