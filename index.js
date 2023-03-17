let mainForm = document.forms[0];
let formName = mainForm.user
let textarea = mainForm.text
let formButton = mainForm.button


/*
* функция удаления элемента
 */
function deleteElem() {
    let btnDelete = document.querySelectorAll('.delete')
    btnDelete.forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.currentTarget.parentNode.parentNode.remove()
        })
    })
}

/*
* функция заполнения блока с комментариями
*/
function formButtons() {
    let ul = document.createElement('ul');

    let commentFiled = document.querySelector('.comment-field')
    commentFiled.append(ul)

// читаем содержимое инпутов
    let formInput = document.querySelector('.user').value
    let formText = document.querySelector('.text').value
    let formDate = document.querySelector('.date').value


//устанавливаем дату
    function addLeadingZero(d) {//если число меньше 10, подставляем "0"
        return (d < 10) ? '0' + d : d;
    }

    function getUserTime(t = new Date()) {//объявляем переменные даты и времени
        let D = addLeadingZero(t.getDate());
        let H = addLeadingZero(t.getHours());
        let m = addLeadingZero(t.getMinutes());

        return `${H}:${m}`

    }

    let D = new Date();
    if (formDate === "") {//если не установлена дата
        formDate = 'сегодня ' + getUserTime()
    }
//если выбрана из инпута
    if (formDate === D.getFullYear() + '-' + ('0' + (D.getMonth() + 1)).slice(-2) + '-' + ('0' + D.getDate()).slice(-2)) {
        formDate = 'сегодня ' + getUserTime()
    }
//выбрана вчерашняя дата
    if (formDate === D.getFullYear() + '-' + ('0' + (D.getMonth() + 1)).slice(-2) + '-' + ('0' + (D.getDate() - 1)).slice(-2)) {
        formDate = 'вчера ' + getUserTime()
    }

//генерируем элемент списка
    let data = `<div class="listComments"> ${formInput} <br>${formText}<br>${formDate}
                           <div class="listImg">
                           <button class="selector" aria-label="Отправить реакцию «нравится»" aria-pressed="false" data-id="2">
                               <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M15.8398 2.39496C13.013 -0.169205 10.2871 2.03882 9.27755 
                               3.46336C8.26797 2.03882 5.54163 -0.169205 2.71481 2.39496C-0.112011 
                               4.95912 1.87349 8.80536 3.2196 10.408C4.22918 11.6544 6.85456 14.361  
                               9.27755 15.2158C11.7005 14.361 14.3254 11.6544 15.335 10.408C16.6811 
                               8.80536 18.6666 4.95912 15.8398 2.39496Z" stroke="black" 
                               stroke-width="2" stroke-linejoin="round"/>
                           </svg>
                           </button>
                           <img class="delete" src='images/basket.png' alt="delete">
                            </div>
                        </div><br>`


//проверка на пустую строку
    formInput = formInput.replace(/^\s+|\s+$/g, '')
    if (!formInput || formInput === " ") {
        formName.style.border = '2px solid red'
        formName.placeholder = 'заполнить обязательно'

        return
    } else {
        ul.insertAdjacentHTML("beforeend", data)

    }

    deleteElem()

// выставляем Lick
    const doc = document
    const aria = {
        label: {
            true: "Отправить реакцию «нравится»",
            false: "Отменить реакцию «нравится»"
        }
    }

    doc.addEventListener("click", ({target}) => {
        const likeBtn = target.closest(".selector")
        if (!likeBtn) return;
        likeBtn.ariaPressed = likeBtn.ariaPressed === "true" ? "false" : "true";
    })

}

//вызов функции  formButtons() по кнопке
formButton.addEventListener("click", function (event) {
      formButtons()
})

//вызов функции  formButtons() по Enter
let key = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        formButtons();
    }
}

// formName.addEventListener("keyup", key =(e)=>{
//     if (e.key === 'Enter') {
//         e.preventDefault();
//         formButtons();
//     }
// })

function handleKeyPress(e){
    let key=e.keyCode || e.which;
    if (key === 13){ // Клавиша Enter
        e.preventDefault();
        formButtons();
        formName.value = ""
    }
}
















