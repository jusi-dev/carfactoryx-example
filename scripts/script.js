const changeModalButtons = document.querySelectorAll("[data-target]");
const serviceContent = document.querySelectorAll(".service-item");
const service1 = document.querySelector("#service-1");
const service2 = document.querySelector("#service-2");
const service3 = document.querySelector("#service-3");
const navBar = document.querySelector(".sticky");
var rightElemId;
var animationDone = true;

const reviewSpace = document.querySelector(".review-space");
const reviewBtnLeft = document.querySelector("#review-left-btn");
const reviewBtnRight = document.querySelector("#review-right-btn");
/*const reviewNr1 = document.querySelector("#review1");
const reviewNr2 = document.querySelector("#review2");
const reviewNr3 = document.querySelector("#review3");
const reviewNr4 = document.querySelector("#review4");
const reviewNr5 = document.querySelector("#review5");
const reviewNr6 = document.querySelector("#review6");
const reviewNr7 = document.querySelector("#review7");
const reviewNr8 = document.querySelector("#review8");*/

const notiModal = document.querySelector("#modal-information");
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const closeModalBtn = document.querySelectorAll('[data-close-btn]');
const overlay = document.getElementById('overlay');

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

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


reviewBtnRight.addEventListener('click', () => {
    reviewSpace.scrollLeft += 300;
})

reviewBtnLeft.addEventListener('click', () => {
    reviewSpace.scrollLeft -= 400;
})

/*                                    */
        /* Start Message */
/*                                    */

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

/*                                    */
        /* Navigation Scroll Handler */
/*                                    */

// Add the background color to the nav bar after scrolling
window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY;
    // add a class to the body element to change the background color
    if (scrollPos > 300) {
      navBar.style.background = "#FF4646";
      navBar.style.padding = "15px 0px";
      if (this.window.matchMedia("(max-width: 1024px)").matches){
        navMenu.style.marginTop = "-10px";
      }
    } else {
      navBar.style.background = "none";
      navBar.style.padding = "50px 0px";
      if (this.window.matchMedia("(max-width: 1024px)").matches){
        navMenu.style.margin = "50px 0px";
      }
    }
});

/*                                    */
        /* BURGER MENU */
/*                                    */

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navBar.classList.toggle("active");
    navBar.style.removeProperty("background");
});

document.querySelectorAll(".nav-elem").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    /*mainnav.classList.remove("active");*/
}));

const textReview = document.querySelectorAll(".text-review");
const textText = textReview.innerText;

/*function checkOverflow() {
    console.log("test");
    textReview.forEach(div => {
        if (div.scrollHeight > div.clientHeight) {
            div.style.overflow = "hidden";
            const showMore = div.nextSibling;
            showMore.style.color = "yellow";
        }
    });
}*/

/*window.addEventListener('resize', checkOverflow);*/

var overflowDivs = document.querySelectorAll('.show-more-review');
var shrinkBtn = document.querySelectorAll('.show-less-review');
var textDivs = document.querySelectorAll('.text-review');
var isActive = 0;
const review = document.querySelector('.review');

window.addEventListener('resize', overflowChecker);
window.addEventListener('load', overflowChecker);

function overflowChecker() {
    for(var i = 0; i < textDivs.length; i++) {
        if (textDivs[i].clientHeight < textDivs[i].scrollHeight) {
          overflowDivs[i].style.display = "block";
          textDivs[i].style.overflow = "hidden";
        } else {
          overflowDivs[i].style.display = "none";
          textDivs[i].style.overflow = "auto";
        }
    }
}

overflowDivs.forEach(button => {
    button.addEventListener('click', () => {
        const parent = button.parentNode;
        const textRev = parent.querySelector('.text-review');
        const showLess = parent.querySelector('.show-less-review');
        const reviewParent = parent.parentNode;
        button.style.display = "none";
        showLess.style.display = "block";
        isActive += 1;
        expandReview(textRev, reviewParent);
    })
})

shrinkBtn.forEach(button => {
    button.addEventListener('click', () => {
        const parent = button.parentNode;
        const textRev = parent.querySelector('.text-review');
        const showMore = parent.querySelector('.show-more-review');
        const reviewParent = parent.parentNode;
        button.style.display = "none";
        showMore.style.display = "block";
        isActive -= 1;
        shrinkReview(textRev, reviewParent);
    })
})

function expandReview(textRev, reviewParent) {
    textRev.style.height = "auto";
    textRev.style.overflow = "visible";
    reviewParent.style.height = "auto";
    reviewParent.style.marginBottom = "0";
    reviewSpace.style.height = "auto";
}
function shrinkReview(textRev, reviewParent) {
    textRev.style.removeProperty('height');
    textRev.style.overflow = "hidden";
    reviewParent.style.removeProperty('height');
    reviewParent.style.removeProperty('marginBottom');
    if (isActive == 0) {
        reviewSpace.style.removeProperty('height');
    }
}

const openImage = document.querySelectorAll('[data-image]');
const imageLeft = document.querySelectorAll('.imageLeft');
const imageRight = document.querySelectorAll('.imageRight');

openImage.forEach(button => {
    button.addEventListener('click', () => {
        const imageTarget = document.querySelector('#' + button.dataset.image);
        openModal(imageTarget);
    })
})

function openModal(imageTarget) {
    if (imageTarget == null) return;
    imageTarget.classList.add('active');
    overlay.classList.add('active');
}

closeModalBtn.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.imageBig');
      closeModal(modal);
    })
});

imageRight.forEach(button => {
    button.addEventListener('click', () => {
        const activeModal = button.closest('.imageBig');
        let imageSibling = activeModal.nextElementSibling;
        if (imageSibling === null){
            imageSibling = activeModal.parentNode.firstElementChild;
        }
        closeModal(activeModal);
        openModal(imageSibling);
    })
});

imageLeft.forEach(button => {
    button.addEventListener('click', () => {
        const activeModal = button.closest('.imageBig');
        let imageSibling = activeModal.previousElementSibling;
        if (imageSibling === null) {
            imageSibling = activeModal.parentNode.lastElementChild;
        }
        closeModal(activeModal);
        openModal(imageSibling);
    })
});
