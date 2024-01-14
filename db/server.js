const express = require('express')
const mongoose = require('mongoose')
const user = require('./models/user')

const app = express()

app.use(express.json())

mongoose.connect('mongodb://localhost:27017')
mongoose.connection.on('connected', () => console.log('connected to db'))

//get all users
app.get('/', async (req, res) => {
    try {
        const usr = await user.find()
        res.status(200).json(usr)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//create new user
app.post('/create', async (req, res) => {
    try {
        const usr = new user({name: req.body.name, password: req.body.password, role: req.body.role})
        await usr.save()
        res.status(200).json({message: 'User created!'})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//update existing user
app.put('/update/:name', async (req, res) => {
    try {
        const users = await user.find({name: req.params.name})
        if (users.length === 0) throw new Error('User not found!')
        const existingUser = users[0]
        existingUser.name = req.body.name
        existingUser.password = req.body.password
        existingUser.role = req.body.role
        await existingUser.save()
        res.status(200).json({message: 'User updated!'})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//delete user
app.delete('/delete/:name', async (req, res) => {
    try {
        const response = await user.deleteOne({name: req.params.name})
        res.status(200).json({message: 'User deleted!'})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

app.listen(3001, () => {
    console.log('server listening on port 3001')
})
