// Show Menu ---------------------------------------
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

// Remove Menu Mobile ---------------------------------------
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

// Change Header Color When Scrolling ---------------------------------------
function scrollHeader(){
    const header = document.getElementById('header'),
          navLogo = document.getElementById('nav-logo'),
          navToggle = document.getElementById('nav-toggle')
    //When the scroll is greater than 50 viewport height, change header backgroung
    if(this.scrollY >= 50){
        header.classList.add('scroll-header')
        navLogo.classList.add('scroll-nav')
        navToggle.classList.add('scroll-nav')
    }else{
        header.classList.remove('scroll-header')
        navLogo.classList.remove('scroll-nav')
        navToggle.classList.remove('scroll-nav')
    } 
}
window.addEventListener('scroll', scrollHeader)


const mediaQuery = window.matchMedia("(max-width: 767px)")
carouselLink(mediaQuery) // Call listener function at run time
mediaQuery.addListener(carouselLink) 

// Carousel Testimonial ---------------------------------------
function showTestimonial(i){
    const articleIndex = i.getAttribute('data-target'),
          articles = document.querySelectorAll('.testimonial__card'),
          link = document.querySelectorAll('.carousel__link')

    // Remove all testimonials that has carousel__show class 
    articles.forEach(n => n.classList.remove('carousel__show'))
    // Remove all carousel links that has carousel__active class 
    link.forEach(n => n.classList.remove('carousel__active'))

    if(mediaQuery.matches){
        // Add carousel__show class to testimonial__card that has index same with data target
        articles[articleIndex].classList.add('carousel__show')
        // Add carousel__active class to carousel__link that has index same with data target
        link[articleIndex].classList.add('carousel__active')
    }else{
        // Add carousel__show class to testimonial__card 
        for(let index = articleIndex; index <= articles.length; index++){
            if(index <= parseInt(articleIndex) + 1){
                articles[index].classList.add('carousel__show')
            }
        }
        // Add carousel__active class to carousel__link 
        const indexLink = articleIndex == 0 ? articleIndex : parseInt(articleIndex) - 1
        link[indexLink].classList.add('carousel__active')
    }
}

function carouselLink(x) {
    const carouselNav = document.querySelector('.carousel__nav'),
          carouselItem = document.querySelectorAll('.testimonial__card'),
          carouselLink = document.querySelectorAll('.carousel__link')

            if (x.matches) { // If media query matches
                if(carouselItem.length > 1 && carouselLink.length > 1){
                    carouselItem.forEach(e => e.classList.remove('carousel__show'))
                    carouselLink.forEach(e => e.remove())
                }

                carouselItem.forEach(function htmlCarouselLink(item, index, arr) {
                    if(index == 0){
                        carouselItem[index].classList.add('carousel__show')

                        carouselNav.innerHTML += `
                            <div onclick="showTestimonial(this)" class="carousel__link carousel__active" data-target="`+index+`"></div>
                        `
                    }
                    else {
                        carouselNav.innerHTML += `
                        <div onclick="showTestimonial(this)" class="carousel__link" data-target="`+index+`"></div>
                    `
                    }
                });
            } else {
                if(carouselItem.length > 1 && carouselLink.length > 1){
                    carouselItem.forEach(e => e.classList.remove('carousel__show'))
                    carouselLink.forEach(e => e.remove())
                }

                carouselItem.forEach(function htmlCarouselLink(item, index, arr) {
                    if(index <= 1){
                        carouselItem[index].classList.add('carousel__show')
                        if((index + 1) % 2 != 0){
                            carouselNav.innerHTML += `
                                <div onclick="showTestimonial(this)" class="carousel__link carousel__active" data-target="`+index+`"></div>
                            `
                        }
                    }

                    if((index + 1) % 2 != 0 && index > 1){
                        carouselNav.innerHTML += `
                            <div onclick="showTestimonial(this)" class="carousel__link" data-target="`+index+`"></div>
                        `
                    }
                });
            }
        
}
  

// Scroll UP ---------------------------------------
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up')

    //When the scroll is greater than 350, show scroll up button 
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);

// Scroll Section Active Link ---------------------------------------
const sections = document.querySelectorAll('section[id]'),
      headerHeight = document.getElementById('header').offsetHeight

function scrollActive(){
    sections.forEach( current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - headerHeight,
              sectionId = current.getAttribute('id')
        if(this.scrollY > sectionTop && this.scrollY <= sectionTop + sectionHeight ){
            if(sectionId != 'contact'){
                document.querySelector('[href="#'+sectionId+'"]').classList.add('active-link')
            }
        }else{
            document.querySelector('[href="#'+sectionId+'"]').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive);


const modal = document.querySelector('.modal'),
      body = document.body

function detailProject(index){
    const image = document.querySelectorAll('.project__img')[index].style.backgroundImage.slice(4, -1).replace(/"/g, ""),
         modalImage = document.querySelector('.modal__img'),
         title = document.querySelectorAll('.project__title')[index].innerText,
         modalTitle = document.querySelector('.modal__title')
         
    body.style.overflow = "hidden"
    modal.style.display = "block"
    modalImage.src = image
    modalTitle.innerText = title
}

function closeModal(){
    body.style.overflow = "auto"
    modal.style.display = "none"
}