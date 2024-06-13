const searchIcon = document.querySelector(".search-icon");
const searchForm = document.querySelector(".search-form");
const loginIcon = document.querySelector(".login-icon");
const cartIcon = document.querySelector(".cart-icon");
const menuIcon = document.querySelector(".menu-icon");

const navbar = document.querySelector(".navbar");
const cartItemsContainer = document.querySelector(".cart-items-container");
const loginForm = document.querySelector(".login-form");

searchIcon.addEventListener("click", () => {
    searchForm.classList.add("active");
    cartItemsContainer.classList.remove("active");
    navbar.classList.remove("active");
    loginForm.classList.remove("active");
});
menuIcon.addEventListener("click", () => {
  navbar.classList.add("active");
  searchForm.classList.remove("active");
  cartItemsContainer.classList.remove("active");
  loginForm.classList.remove("active");
});
cartIcon.addEventListener("click", () => {
    cartItemsContainer.classList.add("active");
    searchForm.classList.remove("active");
    navbar.classList.remove("active");
    loginForm.classList.remove("active");
});
loginIcon.addEventListener("click", () => {
  loginForm.classList.add("active");
  searchForm.classList.remove("active");
  navbar.classList.remove("active");
  cartItemsContainer.classList.remove("active");
});

window.onscroll = ()=>{
  cartItemsContainer.classList.remove("active");
  searchForm.classList.remove("active");
  navbar.classList.remove("active");
  loginForm.classList.remove("active");
}

// You can add more JavaScript code here if needed


var swiper = new Swiper(".wrapper", {
    spaceBetween: 10,
    loop:true,
    CenterSlides:true,
    autoplay:{
        delay:9500,
        disableOnInteraction:false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        
      },
      768: {
        slidesPerView: 2,
       
      },
      1024: {
        slidesPerView: 3,
        
      },
    },
  });