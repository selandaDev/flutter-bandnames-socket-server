
const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

// bands.addBand(new Band('banda 1'))
// bands.addBand(new Band('banda 2'))
// bands.addBand(new Band('banda 3'))
// bands.addBand(new Band('banda 4'))

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado')

    client.emit('active-bands', bands.getBands())

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
    
    client.on('mensaje', (payload)=> { // Escucha los mensajes
        console.log(payload);
        io.emit('mensaje', {admin: 'nuevo mensaje'}); // Emite a TODOS los clientes
    })

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands())
    })

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name)
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands())
    })

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands())
    })

    client.on('emitir-mensaje', (payload)=> { // Escucha los mensajes
        console.log(payload)
        // io.emit('nuevo-mensaje', payload); // Emite a TODOS los clientes
        client.broadcast.emit('nuevo-mensaje', payload); // Emite a todos los clientes MENOS a quien lo envio
    })
})