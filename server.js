const porta = 3003
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/view')); 

//Rotas
require('./app/routes')(app);

app.listen(porta, () => {
    console.log(`Server listening on port ${porta}`)
})

module.exports = { app }