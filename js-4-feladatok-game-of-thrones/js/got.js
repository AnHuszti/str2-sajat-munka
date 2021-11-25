"use strict";

const cells = 48;
let characters = [];
const characterList = document.getElementById("characterGrid");
const pictureOfSelected = document.querySelector(".picture")
const nameOfSelected = document.querySelector(".character__name")
const shieldOfSelected = document.querySelector(".shield")
const bioOfSelected = document.querySelector(".bio")

const aliveCharacters = (data) => {
    return data
    .filter(el => el.dead != true)
    .sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0; 
    })
}

const getCharacters = async () => {
    const response = await fetch('../json/got.json');
    const data = await response.json();
    characters = aliveCharacters(data);

    fillTheGrid();
    addPortraitClickListener();
    addLabelClickListener();
    addButtonClickListener();
}

function setAttributes(el, attrs) {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};

function fillTheGrid() {
    for (let i = 0; i < cells; i++) {
        const charElement = document.createElement("DIV");
        const charPic = document.createElement("IMG");
        setAttributes(charPic, { "src": `./${characters[i].portrait}`, "alt": `${characters[i].name}` });
        charPic.className = "portrait";
        const picLabel = document.createElement("P");
        picLabel.textContent = `${characters[i].name}`;
        picLabel.className = "name__label"
        charElement.append(charPic, picLabel);
        characterList.appendChild(charElement);
    }
}

const displayFoundChar = (foundChar) => {
    setAttributes(pictureOfSelected, { "src": `./${foundChar.picture}`, "alt": foundChar.name });
    nameOfSelected.textContent = foundChar.name
    if (foundChar.house != undefined) {
        setAttributes(shieldOfSelected, { "src": `./assets/houses/${foundChar.house}.png`, "alt": foundChar.house });  
    } else if (foundChar.organization != undefined){
        setAttributes(shieldOfSelected, { "src": `./assets/houses/${foundChar.organization}.png`, "alt": foundChar.organization });  
    } else {
        setAttributes(shieldOfSelected, { "src": ``, "alt": ``});
    }    
    bioOfSelected.textContent = foundChar.bio
}

const handlePortraitClick = (event) => {
    let selected = event.target
    let foundChar = characters.find(x => x.name === selected.alt); 
    displayFoundChar(foundChar)
}

const addPortraitClickListener = () => { 
    const portraitImg = document.querySelectorAll(".portrait");
    portraitImg.forEach(img => img.addEventListener('click', handlePortraitClick));
}

const handleLabelClick = (event) => {
    let selected = event.target
    let foundChar = characters.find(x => x.name === selected.textContent); 
    displayFoundChar(foundChar)
}

const addLabelClickListener = () => { 
    const imgLabel = document.querySelectorAll(".name__label");
    imgLabel.forEach(label => label.addEventListener('click', handleLabelClick));
}

const handleButtonClick = (event) => {
    let searchString = document.querySelector('input').value;
    let foundChar = characters.find(x => x.name.toLowerCase() === searchString.toLowerCase());
    if (foundChar != undefined) {
        displayFoundChar(foundChar)
    } else {
        displayFoundChar({
            "name": "",
            "picture": "assets/pictures/notfound.png",
            "bio": ""
        })
    }
}

const addButtonClickListener = () => {
   document.querySelector('.search__btn').addEventListener('click', handleButtonClick);
};

getCharacters();