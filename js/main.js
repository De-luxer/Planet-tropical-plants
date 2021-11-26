AOS.init();

const form = document.getElementById('contacts_form');
const formName = document.getElementById('input_name');
const formEmail = document.getElementById('input_email');
const formText = document.getElementById('input_text');
const span = document.getElementById('span');
const popupForm = document.getElementById('popup_contacts_form');
const popupSpan = document.getElementById('popup_span');
const popupFormName = document.getElementById('popup_input_name');
const popupFormEmail = document.getElementById('popup_input_email');
const selector = document.querySelectorAll('input[type="tel"]');
const im = new Inputmask('+1 (999) 999-99-99')
im.mask(selector);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.menu_list_item').forEach((link) => {
                link.classList.toggle(
                    'menu_list_item--active',
                    link.getAttribute('href').replace('#', '') === entry.target.id
                );
            });
        }
    });
}, {
    threshold: 0.1,

});
document.querySelectorAll('.scroll').forEach(
    (section) => observer.observe(section)
);

window.onscroll = function showHeader() {
    let header = document.querySelector('.background_header');
    if(window.pageYOffset > 300) {
        header.classList.add('header--fixed');
    } else{
        header.classList.remove('header--fixed');
    }
}

$(document).ready(function(){
    $('.header_burger').click(function () { 
        $('.header_burger,.menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
    $('.catalog_text_btn').on('click', function(event){
        event.preventDefault();
        $('#popup1').fadeIn();
        disableScroll();
    });
    $('.popup_close').on('click', function(event){
        event.preventDefault();
        $('.popup').fadeOut();
        enableScroll();
    });
    $(document.body).on('keydown', function(event){
        if(event.which === 27) {
            event.preventDefault();
            $('.popup').fadeOut();
            enableScroll();
        }
    });
});

let disableScroll = function() {
    let padingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    $(document.body).addClass('disable-scroll');
    document.body.style.paddingRight = padingOffset;
};
function enableScroll() {
    $(document.body).removeClass('disable-scroll');
    document.body.style.paddingRight = '0px';
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});
popupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputsPopup();
});

function checkInputs() {
    const formNameValid = formName.value.trim();
    const formEmailValid = formEmail.value.trim();
    const formTextValid = formText.value.trim();

    if(formTextValid === ''){
        setError(formText, 'Enter your message');
        span.classList.add('error');
    }else{
        setSuccess(formText);
        span.classList.remove('error');
        $(function(){
            $('#popup3').fadeIn();
            disableScroll();
        });
    }
    if(formEmailValid === ''){
        setError(formEmail, 'Enter your Email');
        span.classList.add('error');
    }else{
        setSuccess(formEmail);
    }
    if(formNameValid === ''){
        setError(formName, 'Enter your name');
        span.classList.add('error');
    }else{
        setSuccess(formName);
    }
}
function checkInputsPopup() {
    const popupFormNameValid = popupFormName.value.trim();
    const popupFormEmailValid = popupFormEmail.value.trim();

    if(popupFormEmailValid === ''){
        setError(popupFormEmail, 'Enter your Email');
        popupSpan.classList.add('error');
    }else{
        setSuccess(popupFormEmail);
        popupSpan.classList.remove('error');
        $('#popup1').fadeOut();
        $('#popup2').fadeIn();
    }
    if(popupFormNameValid === ''){
        setError(popupFormName, 'Enter your name');
        popupSpan.classList.add('error');
    }else{
        setSuccess(popupFormName);
    };
}

function setError(input, message){
    const formInput = input;
    popupSpan.innerText = message;
    span.innerText = message;
    formInput.className = 'input error';
}
function setSuccess(input){
    const formInput = input;
    formInput.className = 'input';
}