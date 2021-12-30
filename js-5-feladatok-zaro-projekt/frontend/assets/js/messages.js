'use strickt';

const modal =  document.querySelector(".modal")
const modalFrame = document.querySelector(".modal div")
const messageContent = document.querySelector(".modal div p")
const span = document.querySelector(".modal div span")

const setMessage  = (message) => {
    console.log(messageContent)
    messageContent.textContent = message
    modal.style.display = 'block'
    
    if (message === "Saved successfully." | message === "Added successfully.") {
        modalFrame.classList = 'modal-content success'
    } else if (message === "Incorrect form!!!" | message === "You must complete the current edit first") {
        modalFrame.classList = 'modal-content warning' 
    }

    setTimeout(() => modal.style.display = 'none', 5000)
    setTimeout(() => modalFrame.classList.remove('modal-content', 'warning', 'success') , 5000)
}

span.onclick = function() {
    modal.style.display = "none";
    modalFrame.classList.remove('modal-content', 'warning', 'success')
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalFrame.classList.remove('modal-content', 'warning', 'success')
    }
}

export {
    setMessage
}