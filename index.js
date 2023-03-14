let mainForm = document.forms[0];
let formName = mainForm.user
let textarea = mainForm.text
let formButton = mainForm.button

/*
* функция добавдения лайков
 */
function createLike() {
    let btnHeart = document.querySelectorAll('.heart');//нахожу все сердечки

    btnHeart.forEach(btn => {//перебираю сердечки
        btn.addEventListener('click', function (event) {//присваиваю каждому функцию
            event.currentTarget.classList.toggle('hide')                  //меняю класс элемента, на которм было событие клик
        })
    })
}

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
* функция заполнения блока с коментариями
*/
function formButtons() {
    let ul = document.createElement('ul');
    document.body.append(ul);
    let formInput = document.querySelector('.user').value
    let formText = document.querySelector('.text').value
    let formDate = document.querySelector('.date').value


//установка даты
    function addLeadingZero(d) {//усли число меньше 10, подставляем "0"
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
                               <img  class="heart" src='images/heart.png' width='25' alt="heart" >
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

    createLike();
    deleteElem()
}
//вызов функции  formButtons() по кнопке
formButton.addEventListener("click", function (event) {
    formButtons()
})


//вызов функции  formButtons() по Enter
formName.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        formButtons()
        event.preventDefault()
        event.stopPropagation()
    }
})











