const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()

const port = process.env.PORT


//  Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets')

// Path
const publicPath = path.resolve( __dirname, 'public' )
app.use( express.static( publicPath ))

// Rutas
app.get('/', (req, res) => res.send('Hello World!'))

server.listen(port, (err) => {
    if(err) throw new Error(err);
    console.log('Servidor en funcionamiento')
})