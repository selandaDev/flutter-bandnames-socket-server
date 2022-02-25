
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado')

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
    
    client.on('mensaje', (payload)=> { // Escucha los mensajes
        console.log(payload);
        io.emit('mensaje', {admin: 'nuevo mensaje'}); // Emite a TODOS los clientes
    })
})