const buttonOpen = document.querySelector('#btn-open')
const backgroundModal = document.querySelector('.modal')
const buttonInsert = document.querySelector('#btn-insert')
const modal = document.querySelector('#wrapper-modal')

async function getTasks() {
    let answer = await fetch("http://localhost:7777/v1/todolist")
    let answerJson = await answer.json()
    createList(answerJson)
}

getTasks()

function createList(data) {
    const lista = document.querySelector('#to-do-list')
    lista.innerHTML = ""
    data.forEach(task => {
        const li = document.createElement('li')
        lista.appendChild(li)
        li.outerHTML = 
        `<li class="task">
            <p class="textTask" id=${task.id}>${task.title + " - " + task.status}</p>
            <div class="btn-group dropstart">
                <button type="button" class="buttonActions" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="material-icons">
                        more_vert
                    </span>
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item" onclick="editTask('${task.title}', '${task.id}')">
                        Editar
                        <span class="material-icons">
                            edit
                        </span>
                    <li class="dropdown-item" onclick="changeTaskStatus('${task.status}','${task.id}')">
                        Concluir
                        <span class="material-icons" style="font-weight: bold;">
                            check
                        </span>
                    </li>
                    </li>
                    <li class="dropdown-item" onclick="deleteTask('${task.id}')" >Deletar
                        <span class="material-icons">
                            delete
                        </span>
                    </li>
                </ul>
            </div>
        </li>`
    })
}

buttonOpen.addEventListener('click', function(e){
    e.preventDefault
    document.querySelector('.modal').classList.add('ativo')
    modal.classList.add('ativo')
})

backgroundModal.addEventListener('click', function(e){
    e.target.classList.remove('ativo')
    modal.classList.add('ativo')
})

buttonInsert.addEventListener('click', function(){
    let input = document.querySelector("#inputTask")
    let title = input.value
    if(title.length > 0){
        createTask(input.value)
    }
})

async function createTask(task) {
    let answer = await fetch("http://localhost:7777/v1/todolist", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "title": `${task}`,
            "status": "A fazer"
        })
    })
    let answerJson = await answer.json()
    refresh()
    displayMessage("criada")
}

function refresh() {
    document.querySelector('.modal').classList.remove('ativo')
    getTasks()
}

async function deleteTask(id){
    let confirmDelete = confirm("Tem certeza que deseja deleter essa tarefa?")
    if(confirmDelete){
        displayMessage("excluída")
        let answer = await fetch("http://localhost:7777/v1/todolist", {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "id": `${id}`,
        })
    })
    refresh()
    } 
}

async function changeTaskStatus(status, id) {
    let answer = await fetch("http://localhost:7777/v1/todolist", {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "status": `${status == "Concluído" ? "Inconcluido" : "Concluído"}`,
            "id": `${id}`,
        })
    })
    refresh()
    displayMessage("concluída")
}

function editTask(title, id) {
    let taskEdit = document.getElementById(`${id}`)
    taskEdit.textContent = ""
    taskEdit.outerHTML = `<input type="text" class="textTask inputEdit"
    onfocus="this.selectionStart = this.selectionEnd = this.value.length"
    value="${title}" autofocus>`
    let taskEdited = document.querySelector('input.textTask')
    taskEdited.addEventListener("blur", editTaskReq)
    window.addEventListener("keydown", (event) => event.keyCode == 13 ? editTaskReq(): undefined)
    async function editTaskReq(){
        taskEdited.removeEventListener("blur", editTaskReq)
        taskEdited.removeEventListener("keydown", editTaskReq)
        let answer = await fetch("http://localhost:7777/v1/todolist", {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "title": `${taskEdited.value}`,
                "id": `${id}`,
            })
        })
        refresh()
        displayMessage("editada")
    } 
}

function displayMessage(msg){
    const boxDisplay = document.querySelector('.display-message')
    const message = document.querySelector('#message')
    const cancel = document.querySelector('#cancel')
    message.textContent = "Tarefa " + msg
    boxDisplay.classList.add('ativo')
    if(msg == "excluída") message.classList.add('deleted')
    setTimeout(function(){
        boxDisplay.classList.remove('ativo')
        message.classList.remove('deleted')
    }, 3000)
}