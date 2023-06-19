import Swiper from 'swiper';
import "./custom-mouse";
import MicroModal from 'micromodal'; 
import {tabs} from './tabs';
import animateScrollTo from './scroll';

var blob = document.getElementsByClassName("blob")[0];
var pageWork = document.getElementsByClassName("work-pagination")[0];
var body = document.getElementsByTagName("body")[0];

var loader = document.querySelector(".splash .fg");

loader.style.width = "100%";
loader.style.opacity = "1";
setTimeout(()=> window.navigate(),2000);

var circle = document.querySelector(".circle");
let morphInt =  1;

function morph() {
    circle.classList.remove('morph-1');
    circle.classList.remove('morph-2');
    circle.classList.remove('morph-3');
    circle.classList.add('morph-'+morphInt);
    morphInt++;
    if(morphInt>3)
        morphInt = 1;
}

(function loop() {
    var rand = Math.round(Math.random() * (2500 - 500)) + 500;
    setTimeout(function() {
            morph();
            loop();  
    }, rand);
}());

document.getElementById('logo').addEventListener('click',(e) => {
    if(currentModal){
        closeModal();
    }else{
        mySwiper.slideTo(0);
    }
});

var currentModal = null;

function debounce(func, wait, immediate) {
    var timeout;
    
    return function executedFunction() {
        var context = this;
        var args = arguments;
        
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        var callNow = immediate && !timeout;
        
        clearTimeout(timeout);
        
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
};

const closeModal = debounce(e => {
    if(currentModal){
        animateScrollTo(0,{
            elementToScroll: document.getElementById(currentModal),
            cancelOnUserAction: true,
            easing: function (t) { return (--t) * t * t + 1; },
            horizontalOffset: 0,
            maxDuration: 300,
            minDuration: 250,
            speed: 500,
            verticalOffset: 0,
        }).then(hasScrolledToPosition => {
            // MicroModal.close(currentModal.id);
          document.getElementById(currentModal).classList.remove("is-open");
          body.classList.remove('work-detail')
          mySwiper.keyboard.enable();
          currentModal = null;
        });
    }
},1000,true);

document.getElementById('logo').addEventListener('click', closeModal)
document.querySelectorAll('[data-micromodal-me-close]').forEach(item => {
    item.addEventListener('click', closeModal);
});

document.querySelectorAll('.work-slider').forEach(item => {
    let slider = item;
    let next = slider.querySelector('.next');
    let prev = slider.querySelector('.prev');
    next.addEventListener('click', (e) => {
        let activeSlide = slider.querySelector('.swiper-slide.active');
        let nextSlide
        if(activeSlide.nextElementSibling){
            activeSlide.classList.remove('active');
            nextSlide = activeSlide.nextElementSibling;
            nextSlide.classList.add('active');
        } else {
            activeSlide.classList.remove('active');
            nextSlide = slider.querySelector('.swiper-slide');
            nextSlide.classList.add('active');
        }
        let activeNum = (whichChild(nextSlide)-1)/2;
        slider.querySelector('.macbook-pagination .mouse-hover.active').classList.remove('active');
        slider.querySelector('.macbook-pagination li:nth-child('+activeNum+') a').classList.add('active')
    });
    prev.addEventListener('click', () => {
        let activeSlide = slider.querySelector('.swiper-slide.active');
        let nextSlide
        if(activeSlide.previousElementSibling.classList.contains('fg')){
            activeSlide.classList.remove('active');
            nextSlide = activeSlide.previousElementSibling
            nextSlide.classList.add('active');
            
        }else{
            var nodes = slider.querySelectorAll('.swiper-slide');
            var last = nodes[nodes.length- 1];
            last.classList.add('active');
            activeSlide.classList.remove('active');
            nextSlide = last;
        }
        let activeNum = (whichChild(nextSlide)-1)/2;
        slider.querySelector('.macbook-pagination .mouse-hover.active').classList.remove('active');
        slider.querySelector('.macbook-pagination li:nth-child('+activeNum+') a').classList.add('active')
    });

})

function whichChild(elem){
    var  i= 0;
    while((elem=elem.previousSibling)!=null) ++i;
    return i;
}

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('scroll', function(e) {
        modal.querySelectorAll('.moveable').forEach(item => {
            let container = item.closest('.block');
            var element = document.getElementById('logo'),
                style = window.getComputedStyle(element),
                top = parseInt(style.getPropertyValue('top'),10);
            item.style.top = (container.getBoundingClientRect().top *-1) + top + 'px';
        });
    });
})

const projectButtons = document.querySelectorAll(".open-project");

function viewProject(id) {
  if (currentModal) {
    document.getElementById(currentModal).classList.remove("is-open");
  }
  const modalEl = document.getElementById(id)
  modalEl.classList.add("is-open");
  modalEl.querySelector('.empty-block').style.height = window.innerHeight + "px";
  body.classList.add('work-detail')
  mySwiper.keyboard.disable();
  currentModal = id;
}

for (let button of projectButtons) {
  button.addEventListener("click", () => {
    viewProject(button.dataset.micromodalTrigger);
  });
}
// MicroModal.init({
//     onShow: modal => {
//         body.classList.add('work-detail')
//         mySwiper.keyboard.disable();
//         modal.querySelector('.empty-block').style.height = window.innerHeight + "px";
//         console.log(modal.querySelector('.empty-block').style.height);
//         currentModal = modal
//     }, // [1]
//     onClose: modal => {
//         body.classList.remove('work-detail')
//         mySwiper.keyboard.enable();
//         currentModal = null;
//     }, // [2]
//     disableScroll: true,
// });

var simulateTouch = false;

if ("ontouchstart" in document.documentElement)
{
    console.log("is touch");
    body.classList.add('touch');
    simulateTouch = true;
}

var EndofSlider = false;

var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: false,
    keyboard: {
        enabled: true,
    },
    mousewheel: true,
    simulateTouch: simulateTouch,
    pagination: {
        el: '.pagination',
        clickable: true,
        bulletClass: 'test',
        bulletActiveClass: 'active',
        renderBullet: function (index, className) {
            
            if(index < 1 || index > 8 )
            return '<li style="display:none" class="' + className + '"><a class="mouse-hover" data-cursor-hover-class="cursor-btn">' + index + '</a></li>';
            
            return '<li class="' + className + '"><a class="mouse-hover" data-cursor-hover-class="cursor-btn">' + (index) + '</a></li>';
            
        },
    },
    slideActiveClass: 'swiper-slide-active active',
    on: {
        slideChange: (e) => {
            if(!EndofSlider) {
                document.querySelectorAll( ".slide-nav.hidden" ).forEach( e =>
                    e.classList.remove( "hidden" ) );
                }
                EndofSlider = false;

                
                let newClass = mySwiper.slides[mySwiper.realIndex].dataset.blob;
                
                blob.className = 'blob ' + newClass;
                
                pageWork.className = 'work-pagination ' + newClass;
                
                if(mySwiper.realIndex > 0 && mySwiper.realIndex < 9){
                    document.getElementById("nav-work").classList.add('active');
                }else{
                    document.getElementById("nav-work").classList.remove('active');
                }
                
                if(mySwiper.realIndex == 9 || mySwiper.realIndex == 10){
                    document.getElementById("nav-about").classList.add('active');
                }else{
                    document.getElementById("nav-about").classList.remove('active');
                }
                
                if(mySwiper.realIndex == 11){
                    document.getElementById("nav-contact").classList.add('active');
                }else{
                    document.getElementById("nav-contact").classList.remove('active');
                }
                
                // console.groupCollapsed("Scrolled to slide " + mySwiper.realIndex);
                // console.log(e);
                // console.log(newClass);
                // console.log('*** mySwiper.realIndex', mySwiper.realIndex);
                // console.log(mySwiper.slides[mySwiper.realIndex]);
                // console.groupEnd();
            },
            reachBeginning: (e) => {
                console.log("beginning");
                EndofSlider = true;
                document.querySelector(".slide-nav.down").classList.remove("hidden")
                document.querySelector(".slide-nav.up").classList.add("hidden")
            },
            reachEnd: (e) => {
                console.log("end");
                EndofSlider = true;
                document.querySelector(".slide-nav.up").classList.remove("hidden")
                document.querySelector(".slide-nav.down").classList.add("hidden")
            }
        }
    });
    
    var aboutSwiper = new Swiper('.text-slider',{
        loop: true,
        slideActiveClass: 'active',
        simulateTouch: simulateTouch,
        on: {
            slideChange: (e) => {
                var aboutblob = document.querySelector(".images-about");
                aboutblob.querySelectorAll( ".active" ).forEach( e =>
                    e.classList.remove( "active" ) );
                    aboutblob.children.item(aboutSwiper.realIndex).classList.add("active");
                }
            }
        });
        
        tabs(document.querySelector('.tab-wrapper'));
        
        window.aboutSwiper = aboutSwiper;
        
        window.swiper = mySwiper;

function hasTouch() {
    return 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}
