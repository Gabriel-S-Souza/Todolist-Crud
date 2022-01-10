
async function request(){
    answer = await fetch("http://localhost:7777/v1/todolist")
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

