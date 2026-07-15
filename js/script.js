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

