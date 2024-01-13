const express = require('express')
const {Server} = require('socket.io')

const app = express()

const expressServer = app.listen(3000, () => {
    console.log('server listening on port 3000')
})

const io = new Server(expressServer, {
    cors: {
        origin: '*'
    }
})

io.on('connection', socket => {
    socket.on('send-message', data => {
        console.log(data)
        socket.broadcast.emit('receive-message', data)
    })
})