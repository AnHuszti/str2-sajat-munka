"use strict";

const downloadSec = document.querySelector("#download")
let navBar = document.querySelector(".navbar")

window.onscroll = function() {navAction()};

const navAction = () => {
    if (window.pageYOffset >= downloadSec.offsetTop) {
        navBar.classList.add("bg-white");
    } else {
        navBar.classList.remove("bg-white");
     }
}