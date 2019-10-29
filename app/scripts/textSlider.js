let buttons = document.querySelectorAll('.slider-button');
let secondCircle = document.querySelector('.second-circle');
let textWrap = document.querySelector('.wrapper-placeholder');
let buttonsWrapper = document.querySelector('.buttons-wrapper');
let sliderWrapperText = document.querySelector('.slider-wrapper-text');
let buttonActiveSlider = document.getElementById('buttons-wrapper-active-button');
let aboutUsLeft = document.querySelector('.circle-back');
let thirdWrapper = document.querySelector('.third-wrapper');
let experience = document.getElementById('experience');

let buttonWidth = buttonsWrapper.offsetWidth / 4;
// let activeButtonSlider = document.querySelector('slide-back');


let activeButton = 0;

let items = [
    {
        fullText: [
            'SKU Detection. We Have more than 3000 FMCG images in neural network for fast recognition. Each month we scale more than twice',
            'OOS detection. Our algorithm can automatically detect OOS on the shelf',
            'Share of shelf detection. We can detect competitors’ SKU by using specific algorithm and\n analyze as other goods'
        ]
    },
    {
        fullText: [
            'We have templates of all price tags of Ukrainian retailers',
            'Automatically scan price and text',
            'Validation price tag with particular SKU'
        ]
    },

    {
        fullText: ['By using human resources we can detect any kind of  POS-materials (posters, promo materials, gifts, decor)']
    },
    {
        fullText: ['We have templates of all price tags of Ukrainian retailers',]
    },
];

function setInitialContent() {
    setInnerText(0);
    setActiveButton(0);

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (activeButton !== index) {
                let scrollTo = buttonWidth * index;
                buttonActiveSlider.style.transform = "translateX("+ scrollTo +"px)";
                setInnerText(index);
                setActiveButton(index);
            }
        });
    });

    window.addEventListener('scroll', () => {
        let pageYOffset = window.pageYOffset;
        if (pageYOffset > 350 && pageYOffset < 1400) {
            textWrap.classList.add('slide-bottom');
            buttonsWrapper.classList.add('slide-top');
            experience.classList.add('slide-top');
        }
        if(pageYOffset > 1600){
            aboutUsLeft.classList.add('left-appear');
            thirdWrapper.classList.add('right-appear');
        }
    });

    window.addEventListener('resize', () => {
        buttonWidth = buttonsWrapper.offsetWidth / 4;
        let scrollTo = buttonWidth * activeButton;
        buttonActiveSlider.style.transform = "translateX("+ scrollTo +"px)";
    });
}

function setActiveButton(clickedIndex) {
    buttons[activeButton].classList.remove('active');
    setTimeout(() => {
        buttons[clickedIndex].classList.add('active');
    }, 200);
    activeButton = clickedIndex;
}

function setInnerText(clickedIndex) {
    let liArray;
    if (clickedIndex === 0) {
        sliderWrapperText.innerHTML = '';
        items[clickedIndex].fullText.forEach((li) => {
            sliderWrapperText.innerHTML +=
                `<li style="animation: .3s fadein linear">${li}</li>`;
        });
    } else {
        sliderWrapperText.innerHTML = '';
        items[clickedIndex].fullText.forEach((li) => {
            sliderWrapperText.innerHTML +=
                `<li style="animation: .3s fadein linear">${li}</li>`;
        });
    }
}

window.onload = function () {
    setInitialContent();
};
