const changeModalButtons = document.querySelectorAll("[data-target]");
const serviceContent = document.querySelectorAll(".service-item");
const service1 = document.querySelector("#service-1");
const service2 = document.querySelector("#service-2");
const service3 = document.querySelector("#service-3");
var rightElemId;
var animationDone = true;

const reviewSpace = document.querySelector(".review-space");
const reviewBtnLeft = document.querySelector("#review-left-btn");
const reviewBtnRight = document.querySelector("#review-right-btn");
const reviewNr1 = document.querySelector("#review1");
const reviewNr2 = document.querySelector("#review2");
const reviewNr3 = document.querySelector("#review3");
const reviewNr4 = document.querySelector("#review4");
const reviewNr5 = document.querySelector("#review5");
const reviewNr6 = document.querySelector("#review6");
const reviewNr7 = document.querySelector("#review7");
const reviewNr8 = document.querySelector("#review8");

const notiModal = document.querySelector("#modal-information");
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

changeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
    if (animationDone) {
      animationDone = false;
    button.classList.add('clicked');
    serviceContent.forEach(content => {
        if (content.id == button.dataset.target) {
            rightElemId = document.getElementById(content.id);
        } else {
            hideModal(content, button);
        }
    })  
    }
    button.addEventListener('animationend', () => {
        button.classList.remove('clicked');
    })
    })
})

function hideModal(content, button) {
    
    if(content.id !== button.dataset.target){
        content.classList.add('disappear');
        content.addEventListener('animationend', () => {
            content.style.display = "none";
            disappeard = true;
            content.classList.remove('disappear');
            showModal(content, button);
        })
    }
    animationDone = true;
}

function showModal(content, button) {
    rightElemId.classList.remove('disappear');
    rightElemId.classList.remove('hide');
    rightElemId.classList.add('appear');
    rightElemId.addEventListener('animationend', () => {
        rightElemId.style.opacity = "1";
        rightElemId.style.display = "flex";
        rightElemId.classList.remove('appear');
    })
}

service2.classList.add('hide');
service3.classList.add('hide');

let currentElement = 0;
let reviewElements = document.querySelector("#review");

/*reviewBtnRight.addEventListener('click', () => {
    if (currentElement <= 8) {
        currentElement++;
        reviewElements.scrollIntoView({ 
            behavior: 'smooth'
          });
    }
})*/

reviewBtnRight.addEventListener('click', () => {
    reviewSpace.scrollLeft += 300;
})

reviewBtnLeft.addEventListener('click', () => {
    reviewSpace.scrollLeft -= 400;
})

window.onload = function showNote() {
    notiModal.classList.add('active');
    overlay.classList.add('active');
}

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
    })
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
      closeModal(modal);
    })
});

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
};