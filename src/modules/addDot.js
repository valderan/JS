const addDot = (count = 1) => {
    const dots = document.querySelector('.portfolio-dots'),
        slide = document.querySelectorAll('.portfolio-item');

    for (let index = 0; index < slide.length; index++) {
        
        let li = document.createElement('li');
        li.classList.add('dot');
        if (index === (count - 1)) {
            li.classList.add('dot-active');
        };

        dots.appendChild(li);
    }

};

export default addDot;
