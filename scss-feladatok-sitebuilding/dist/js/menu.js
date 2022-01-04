"use strict";

let navBar = document.querySelector(".nav")

window.onscroll = function() {navAction()};

const navAction = () => {
    if (window.pageYOffset >= 10) {
        navBar.classList.add("nav__bg");
    } else {
        navBar.classList.remove("nav__bg");
     }
}