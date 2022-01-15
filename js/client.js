class ClientFetch {
    static defaultHeader = {"Content-Type": "application/json"}
    // header = {} --> essa notação serve para definir o header como parâmetro opicional
    async get(path, header = this.defaultHeader){
        let response = await fetch(path, {
            "headers": header
            }
        )
        return await response.json()
    }
    async post(path, body,  header = this.defaultHeader){
        let response = await fetch(path, {
            "method": "POST",
            "headers": header,
            "body": JSON.stringify(body)
        })
        return await response.json()
    }
    async put(path, body, header = this.defaultHeader){
        let response = await fetch(path, {
            "method": "PUT",
            "headers": header,
            "body": JSON.stringify(body)
        })
        return await response.json()
    }
    async delete(path, body, header = this.defaultHeader){
        let response = await fetch(path, {
            "method": "DELETE",
            "headers": header,
            "body": JSON.stringify(body)
        })
        return response
    }
}

class ClientLocalStorage {
    async get(path, header = undefined){
        let response = localStorage.getItem(path)
        return JSON.parse(response ?? "[]")
    }
    async post(path, body,  header = undefined){
        let currentDate = await this.get(path)
        body.id = currentDate.length === 0 ? 1 : [...currentDate].pop().id + 1
        currentDate.push(body)
        localStorage.setItem(path, JSON.stringify(currentDate))
        return body
    }
    async put(path, body, header = undefined){
        let currentDate = await this.get(path)
        let index
        let item = currentDate.filter(function(element, i) {
           if(element.id == body.id){
               index = i
               return true
           }
        })[0]
        item = {...item,...body}
        currentDate[index] = item
        localStorage.setItem(path, JSON.stringify(currentDate))
        return body
    }
    async delete(path, body, header = undefined){
        let currentDate = await this.get(path)
        currentDate = currentDate.filter((element) => element.id != body.id  )
        localStorage.setItem(path, JSON.stringify(currentDate))
        return body
    }
}