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

/*window.onload = function showNote() {
    notiModal.classList.add('active');
    overlay.classList.add('active');
}*/

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

// Add the background color to the nav bar after scrolling
window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY;
    // add a class to the body element to change the background color
    if (scrollPos > 300) {
      navBar.style.background = "#FF4646";
      navBar.style.padding = "15px 0px";
      if (this.window.matchMedia("(max-width: 1024px)").matches){
        navMenu.style.margin = "0px";
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
});

document.querySelectorAll(".nav-elem").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mainnav.classList.remove("active");
}));

const textReview = document.querySelectorAll(".text-review");
const textText = textReview.innerText;

function checkOverflow() {
    console.log("test");
    textReview.forEach(div => {
        if (div.scrollHeight > div.clientHeight) {
            div.style.overflow = "hidden";
            const showMore = div.nextSibling;
            showMore.style.color = "yellow";
        }
    });
}

/*window.addEventListener('resize', checkOverflow);*/

window.addEventListener('resize', function() {
    var textDivs = document.querySelectorAll('.text-review');
    var overflowDivs = document.querySelectorAll('.show-more-review');
    for(var i = 0; i < textDivs.length; i++) {
        if (textDivs[i].clientHeight < textDivs[i].scrollHeight) {
          overflowDivs[i].style.display = "block";
          textDivs[i].style.overflow = "hidden";
        } else {
          overflowDivs[i].style.display = "none";
          textDivs[i].style.overflow = "auto";
        }
    }
});

