const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {Server} = require('socket.io')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/auth', authRouter)

mongoose.connect('mongodb://localhost:27017')
mongoose.connection.on('connected', () => console.log('connected to db'))

const expressServer = app.listen(3000, () => {
    console.log('server listening on port 3000')
})

const io = new Server(expressServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

io.on('connection', socket => {
    socket.on('send-message', (user, message, room) => {
        if (room === 'all') socket.broadcast.emit('receive-message', {user, message})
        else socket.to(room).emit('receive-message', {user, message})
    })

    socket.on('join-room', (room, cb) => {
        socket.join(room)
        cb('You have joined ' + room)
    })

    socket.on('leave-room', (room, cb) => {
        socket.leave(room)
        cb('You have left ' + room)
    })
})