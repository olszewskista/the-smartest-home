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
    socket.on('send-message', (user, message, room) => {
        if (room === '') socket.broadcast.emit('receive-message', {user, message})
        else socket.to(room).emit('receive-message', {user, message})
    })

    socket.on('join-room', (room, cb) => {
        socket.join(room)
        cb('You have joined ' + room)
    })
})