
async function request(){
    let answer = await fetch("http://localhost:7777/v1/todolist")
    let answerJson = await answer.json()
    getList(answerJson)
}

request()

function getList(data) {
    const lista = document.querySelector('#to-do-list')
    data.forEach(task => {
        const li = document.createElement('li')
        li.classList.add('task')
        li.textContent = task.title
        lista.appendChild(li)
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
        postTask(input.value)
    }
})

async function postTask(task){
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
      console.log(answerJson)
}