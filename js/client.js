class Client {
    post(){}
    async get(path, header = {}){
        let response = await fetch(path, {
            "headers": header
            }
        )
        return await response.json()
    }

    put(){}
    delete(){}
}