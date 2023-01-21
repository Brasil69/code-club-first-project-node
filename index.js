const { response } = require('Express')
const express = require('Express')

const app = express()
const users = []
const uuid = require('uuid')
const port = 3000
app.use(express.json())//para usar o padrão json

const checkUserId = (request, response, next) => {
    const { id } = request.params  // localhost:3000/users/3 

    const index = users.findIndex(user => user.id === id)  //findIndex => filtra e retorna em qual posição está o elemento
    //console.log(index)
    if (index < 0) {
        return response.status(404).json({ error: "User Not Found" })
    }

    request.userIndex = index
    request.userId = id
    next()
}
/*const myFirstMaddleware = (request, response, next) => {
    console.log("Fui chamado")
 
    next()
    console.log("Finalizamos")
}
app.use(myFirstMaddleware)*/

//app.get('/users/:id', (request, response) => {
app.get('/users', (request, response) => {
    //console.log("A rota foi chamada")
    // const name = request.query.name
    //const age = request.query.age
    //const { name, age } = request.query
    //const {id} = request.params // id => params
    //return response.send("Hello Lucho")
    //console.log(name, age, id)
    //console.log(request.query)
    //const { name, age } = request.body
    // console.log(request.body)

    //return response.send({name: name, age: age})
    // return response.json({name: name, age: age}) //json para retornar //tem que ser um {} ou []
    //return response.json({ name, age, id }) //quando tem o mesmo nome name: name por exemplo
    //return response.json({ id }) //retornar o id
    //return response.send({message: "ok"})
    //return response.json({message: "ok"})
    //return response.json({name,age})
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body
    //console.log(uuid.v4())     //criou um id universal, que não se repete
    const user = { id: uuid.v4(), name, age }

    users.push(user) //adiciona um user dentro do array users
    //return response.json(users)    //retorna todos os usuarios
    return response.status(201).json(user)    //retorna só user
})

app.put('/users/:id', checkUserId, (request, response) => {
    //const { id } = request.params  // localhost:3000/users/3 
    const { name, age } = request.body
    const index = request.userIndex
    console.log(index)
    const id = request.userId
    console.log(id)
    const updateUser = { id, name, age }
    //users.filter                    //filter => para filtrar
    /* const index = users.findIndex(user => user.id === id)  //findIndex => filtra e retorna em qual posição está o elemento
     //console.log(index)
     if (index < 0) {
         return response.status(404).json({ error: "User Not Found" })
     }*/
    users[index] = updateUser
    //return response.json(users)    //atualiza users
    return response.json(updateUser) //retorna só o usuario novo, atualizado
})

app.delete('/users/:id', checkUserId, (request, response) => {
    //const { id } = request.params
    /*const index = users.findIndex(user => user.id === id)  //findIndex => filtra e retorna em qual posição está o elemento
    if (index < 0) {
        return response.status(404).json({ error: "User Not Found" })
    }*/
    const index = request.userIndex
    users.splice(index, 1) //vai deletar somente a posição procurada //(0,1) deleta 1 posição a partir da posição 0

    return response.status(204).json()    //retorna só user //204 é status sem conteudo
})

app.listen(port, () => {
    console.log("🛰 Server started port ${port}")
})