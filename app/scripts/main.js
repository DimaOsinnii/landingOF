// functional for implementing burger menu
const hamburger = document.querySelector(".hamburger");
const headerContainer = document.querySelector(".container");
const dropdownMenu = document.getElementById("myDropdown");
const menuButtons = document.querySelectorAll('.nav-item');


const sectionOneHeight = document.querySelector('.first').offsetHeight;


let toggle = false;

function show(dropMenu) {
    if (!toggle) {
        dropMenu.style.top = "10vh";
        toggle = !toggle;
    } else {
        dropMenu.style.top = "-1000px";
        toggle = !toggle;
    }
}

hamburger.addEventListener("click", function () {
    this.classList.toggle("is-active");
    show(dropdownMenu);
});

// window.addEventListener('scroll', () => {
//     let pageYOffset = window.pageYOffset;
//     if(pageYOffset < sectionOneHeight){
//         headerContainer.classList.remove('dark-menu');
//     }else if(pageYOffset > sectionOneHeight * .8){
//         headerContainer.classList.add('dark-menu');
//     }
// });

menuButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        window.scrollTo({
            top: sectionOneHeight * (index + 1),
            behavior: 'smooth'
        });
    });
});