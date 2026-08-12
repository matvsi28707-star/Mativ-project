"use strict"

// Tabs
const tabsContent = document.querySelectorAll(".tabcontent")
const tabsHeader = document.querySelector(".tabheader__items")
const tabsHeaderItems = document.querySelectorAll(".tabheader__item")

function hideTabContent() {
    tabsContent.forEach(function(element){
        element.classList.remove("tabcontent__show");
    })
    tabsHeaderItems.forEach(function(element){
        element.classList.remove("tabheader__item_active");
    })
}

function showTabContent(i = 0){
    tabsContent[i].classList.add('tabcontent__show');
    tabsHeaderItems[i].classList.add("tabheader__item_active");
}
hideTabContent();
showTabContent();

tabsHeader.addEventListener("click", function(event){
    const target = event.target;
    if(target && target.classList.contains("tabheader__item")){
        tabsHeaderItems.forEach((item, i) => {
            if(item === target){
                hideTabContent();
                showTabContent(i);
            }
        })
    }
})



// Slider
let slideIndex = 1;
const offerSlide = document.querySelectorAll(".offer__slide"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next")

if(offerSlide.length < 10){
    total.textContent = `0${offerSlide.length}`
}
else{
    total.textContent = `${offerSlide.length}`
}
function showSlides(n){
    if(n > offerSlide.length){
        slideIndex = 1;
    }
    if(n < 1){
        slideIndex = offerSlide.length;
    }
    offerSlide.forEach(function(item) {
        item.style.display = "none";
    })
    offerSlide[slideIndex - 1].style.display = "block";
    
    if(slideIndex < 10){
        current.textContent = `0${slideIndex}`
    }
    else{
        current.textContent = `${slideIndex}`
    }
}

function plusSlides(n){
    showSlides(slideIndex += n);
}

prev.addEventListener("click", function(){
    plusSlides(-1);
})

next.addEventListener("click", function(){
    plusSlides(1);
})

function showOfferSlide(){
    offerSlide[0].classList.add('offer__slide__show');
}

showOfferSlide();



// Timer
const deadline = '2026-07-16'
function getTimeRemaining(endtime){
    const t = Date.parse(endtime) - Date.parse(new Date()),
        hours = Math.floor((t/(1000*60*60) % 24)),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        days = Math.floor(t / (1000*60*60*24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
}
function getZero(num){
    if(num < 10 && num >= 0){
        return "0" + num
    }
    else {return num}
}


function setClock(selector, endtime){
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);
        
        updateClock()

        function updateClock(){
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if(t.total <= 0){
                clearInterval(timeInterval);
            }

        }
}
setClock('.timer', deadline)

// console.log(Math.floor((489541758381372373419/1000)% 60))

// 1 января 1970


// Modal

const modalBtn = document.querySelectorAll('[data-modal]'),
modal = document.querySelector(".modal");


  modalBtn.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  function openModal(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId)
  }
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute("data-close") == "") {
        closeModal();
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")){
        closeModal();
    }
    console.log(event)
  })

  const modalTimerId = setTimeout(openModal, 10000)


  function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
        openModal();
        window.removeEventListener('scroll', showModalByScroll)
    }
  }

  window.addEventListener('scroll', showModalByScroll)

// Cards


// Cards
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('menu__item');
        
        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
            </div>
        `;

        this.parent.append(element);
    }
}

// Создаём карточки
new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    ".menu__field .container"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    ".menu__field .container"
).render();


new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    ".menu__field .container"
).render();

const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/still.webp',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так, попробуйте позже'
};

forms.forEach(item => {
    postData(item);
});




// function postData(form) {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const statusMessage = document.createElement('img');
//         statusMessage.src = message.loading;
//         statusMessage.style.cssText = `
//             display: block;
//             margin: 0 auto;
//         `;
//         form.insertAdjacentElement('afterend', statusMessage);

//         const request = new XMLHttpRequest();
//         request.open('POST', 'server.php');
//         request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

//         const formData = new FormData(form);

//         const object = {};
//         formData.forEach((value, key) => {
//             object[key] = value;
//         });

//         const json = JSON.stringify(object);

//         request.send(json);

//         request.addEventListener('load', () => {
//             if (request.status === 200) {
//                 console.log(request.response);
//                 showThanksModal(message.success);
//                 form.reset();
//                 statusMessage.remove();
//             } else {
//                 showThanksModal(message.failure);
//             }
//         });
//     });
// }





function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });

        fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(object)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Ошибка: ', + response.status):
            }
            return response.text()
        })
        .then(data => {
            console.log(data),
            showThanksModal(message.success);
            form.reset();
        })
        .catch(() => showThanksModal(message.failure))
        .finally(() => statusMessage.remove())
    });
}


function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal(); 
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}




