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
        li.outerHTML = `
        <li class="task">
            <p class="textTask" id=${task.id}>${task.title + " - " + task.status}</p>
            <div class="btn-group dropstart">
                <button type="button" class="actions" data-bs-toggle="dropdown" aria-expanded="false">⋮</button>
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
    });
}

const buttonOpen = document.querySelector('#btn-open')
buttonOpen.addEventListener('click', function(){
    document.querySelector('.modal').classList.add('ativo')
})

const buttonClose = document.querySelector('#btn-close-modal')
buttonClose.addEventListener('click', function(){
    document.querySelector('.modal').classList.remove('ativo')
})

const buttonInsert = document.querySelector('#btn-insert')
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
}

function refresh() {
    document.querySelector('.modal').classList.remove('ativo')
    getTasks()
}

async function deleteTask(id){
    let confirmDelete = confirm("Tem certeza que deseja deleter essa tarefa?")
    if(confirmDelete){
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
}

function editTask(title, id) {
    let taskEdit = document.getElementById(`${id}`)
    taskEdit.textContent = ""
    taskEdit.outerHTML = `<input type="text" class="textTask inputEdit"
    onfocus="this.selectionStart = this.selectionEnd = this.value.length"
    value="${title}" autofocus>`
    let taskEdited = document.querySelector('input.textTask')
    taskEdited.addEventListener("blur", editTaskReq)
    window.addEventListener("keydown", (event) => event.keyCode == 13 ? editTaskReq(): undefined )
    async function editTaskReq(){
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
    } 
}