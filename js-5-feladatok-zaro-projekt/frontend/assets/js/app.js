'use strict';

import { setMessage } from "./messages.js";

let users = [];
let tablebody = document.querySelector("#userTable tbody");
let newUserTBody = document.querySelector("#newUserTable tbody");

const initialize = async () => {
    const response = await fetch('http://localhost:3000/users')
    users = await response.json();

    fillTheTable();
    addDeleteClickListener();
    addEditClickListener()
}

function createTD(html, parent) {
    const td = document.createElement("td");
    td.innerHTML = html;
    parent.appendChild(td);
}

function createButtonGroup(parent) {
    let group = document.createElement("div");
    group.className = "btn-group";

    let editBtn = document.createElement("button");
    editBtn.className = "btn-edit btn";
    editBtn.textContent = "edit";

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete btn";
    deleteBtn.textContent = "delete";

    group.appendChild(editBtn);
    group.appendChild(deleteBtn);

    let td = document.createElement("td");
    td.appendChild(group);
    parent.appendChild(td)
}

function fillTheTable() {
    for (let user of users) {
        const tr = document.createElement("tr")
        for (let value of Object.values(user)) {
            createTD(value, tr)
        };
        createButtonGroup(tr);
        tablebody.appendChild(tr)
    }
}

const deleteClickHandler = (event) => {
    let selectedRow = event.target.closest("tr")
    let selectedId = selectedRow.firstChild.textContent
    selectedRow.remove()                                       // remove row from DOM, but not from server

    let fetchOptions = {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
    };
    fetch(`http://localhost:3000/users/${selectedId}`, fetchOptions)
        .catch(
            err => console.error(err))

    users.splice(users.findIndex(obj => obj.id === parseInt(selectedId)), 1)
}

const addDeleteClickListener = () => {
    let deleteButtons = document.querySelectorAll("button.btn-delete");
    deleteButtons.forEach(button => button.addEventListener('click', deleteClickHandler))
}

const alertNotAvailable = (event) => setMessage("You must complete the current edit first");


const reChangeFields = (row) => {

    for (let i = 1; i < row.children.length - 1; i++) {
        row.children[i].textContent = `${row.children[i].firstChild.value}`
    }
}

const reChangeButtons = (row) => {
    let otherRowButtons = document.querySelectorAll("button.btn-edit, button.btn-delete")

    let saveBtn = row.lastChild.firstChild.firstChild;
    saveBtn.textContent = "edit"
    saveBtn.className = "btn-edit btn"
    saveBtn.setAttribute("onclick", "")

    let cancelBtn = row.lastChild.firstChild.lastChild;
    cancelBtn.textContent = "delete"
    cancelBtn.className = "btn-delete btn"
    cancelBtn.setAttribute("onclick", "")

    otherRowButtons.forEach(button => button.replaceWith(button.cloneNode(true)));
    addEditClickListener();
    addDeleteClickListener()
}

const patterns = {
    name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    address: /^(\d+) (.*?) ([^ ]+?)$/
}

const validateValues = (row) => {
    return patterns["name"].test(row.children[1].firstChild.value) &&
    patterns["email"].test(row.children[2].firstChild.value) &&
    patterns["address"].test(row.children[3].firstChild.value)
}

const saveClickHandler = () => {
    let row = document.querySelector(".btn-save").closest("tr")
    if (validateValues(row)) {
        let inputNodes = row.children

        reChangeFields(row)
        reChangeButtons(row)

        let user = {
            id: inputNodes[0].textContent,
            name: inputNodes[1].textContent,
            email: inputNodes[2].textContent,
            address: inputNodes[3].textContent
        }

        let fetchOptions = {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }

        fetch(`http://localhost:3000/users/${user.id}`, fetchOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })

        users.splice(users.findIndex(obj => obj.id === parseInt(user.id)), 1, user)
        setMessage("Saved successfully.")
    }
    else {setMessage("Incorrect form!!!")}
}

const cancelClickHandler = () => {
    let row = document.querySelector(".btn-save").closest("tr")
    reChangeFields(row)
    reChangeButtons(row)
}

const changeButtons = (row) => {
    let saveBtn = row.lastChild.firstChild.firstChild;
    saveBtn.textContent = "save"
    saveBtn.className = "btn-save btn"
    saveBtn.setAttribute("onclick", "saveClickHandler()")
      saveBtn.setAttribute("type", "submit")

    let cancelBtn = row.lastChild.firstChild.lastChild;
    cancelBtn.textContent = "cancel"
    cancelBtn.className = "btn-cancel btn"
    cancelBtn.setAttribute("onclick", "cancelClickHandler()")

    let buttonsAll = document.querySelectorAll("button")
    buttonsAll.forEach(button => button.replaceWith(button.cloneNode(true)));
    let otherRowButtons = document.querySelectorAll("button.btn-edit, button.btn-delete")
    otherRowButtons.forEach(button => button.addEventListener('click', alertNotAvailable))
}

const editClickHandler = (event) => {
    let selectedRow = event.target.closest("tr")
    let selectedId = selectedRow.firstChild.textContent

    for (let i = 1; i < selectedRow.children.length - 1; i++) {
        selectedRow.children[i].innerHTML = `<input type="text" value="${selectedRow.children[i].textContent}">`
    }

    changeButtons(selectedRow)
}

const addEditClickListener = () => {
    let editButtons = document.querySelectorAll("button.btn-edit");
    editButtons.forEach(button => button.addEventListener('click', editClickHandler))
}

function addNewHandler(btn) {
    let addRow = btn.closest("tr");

    if (validateValues(addRow)) {
        let inputNodes = addRow.querySelectorAll("input.newUserInput")

        let user = {}
        user.id =  Math.max(...users.map(user => user.id)) + 1
        for (let i=0; i < inputNodes.length; i++) {
            user[inputNodes[i].name] = inputNodes[i].value 
        }

        const tr = document.createElement("tr") 
        for (let value of Object.values(user)) {
            createTD(value, tr)
        }
        createButtonGroup(tr);
        tablebody.prepend(tr)

        let fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }

        fetch(`http://localhost:3000/users`, fetchOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })

            users.unshift(user) // OR  users.splice(0, 0, user)
            setMessage("Added successfully.")
            
            setTimeout(() => inputNodes.forEach(el => el.value = ''), 5000)    
    }
    else {setMessage("Incorrect form!!!")}
}

initialize()

export {
    addNewHandler,
    cancelClickHandler,
    saveClickHandler
}

/* A Törlés gombra kattintva azonnal, megerősítés nélkül törlődjön ki az
adott user adata a szerverről, és kerüljön eltávolításra a DOM - ból is. */

/* A Szerkesztés gombra kattintva a user adatai az id kivételével módosíthatók lesznek
a táblázaton belül. Egyszerű text inputmezőket használj.
A Szerkesztés gombra kattintás után ez a gomb eltűnik, ugyanúgy, mint a Törlés gomb,
helyette egy Mentés és Visszavonás gomb jelenjen meg. */

/* A Mentés gombra kattintva validálni kell a beírt adatokat.
A validáláshoz reguláris kifejezéseket használj.
Amennyiben a beírt adatok nem validak, egy hibaüzenetet kell megjeleníteni,
amely 5 másodperc után eltűnik. */
/* Amennyiben az adatok validak, mind az adatbázisban, mind a DOM-ban kerüljenek mentésre.
Ebben az esetben is meg kell jeleníteni egy üzenetet, amely 5 másodpercig látszódik.
Egyszerre több üzenet is látszódhat. */
/* A hibáról és a sikeres módosításról szóló üzenetek dizájn alapján is legyenek
megkülönböztethetők. A mentés után ne lehessen tovább szerkeszteni az adatokat.
Amíg egy user adatai szerkesztés alatt állnak, ne lehessen más user adatait
szerkeszteni, sem törölni. Amennyiben valaki mégis rákattint valamelyik másik
Törlés vagy Szerkesztés gombra, jelenlen meg 5 másodpercre az alábbi hibaüzenet:
“Először be kell fejezned az aktuális szerkesztést”! */

/* A Visszavonás gombra kattintva a user eredeti (szerkesztés előtti) adatai íródjanak vissza.
Újra a Szerkesztés és Törlés gomb látszódjon. */

/* Legyen lehetőség új felhasználók létrehozására. Ehhez egy formot kell készíteni. */

/* Új felhasználók adatainak felvitelekor legyen validálás.
Itt ugyanazok a szabályok érvényesek, és ugyanúgy kell az üzeneteket is megjeleníteni,
mint a szerkesztéskor. */

/* Sikeres mentés esetén a felhasználó adatai jelenjenek meg a táblázat tetején.
Innen kezdve szerkeszthető, törölhető az új user is. */