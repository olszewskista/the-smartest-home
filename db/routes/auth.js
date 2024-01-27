const {Router} = require('express')
const User = require('../models/user')
const { createToken, checkAuthMiddleware } = require('../utils/auth')

const router = Router()

router.get('/', checkAuthMiddleware, async (req, res) => {
    try {
        console.log(res.locals.token)
        const user = await User.findById(res.locals.token.id)
        console.log(user)
        res.status(200).json({name: user.name, role: user.role})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body.name, req.body.password)
        const token = createToken(user._id)
        res.cookie('token', token, { maxAge: 1000 * 60 * 60, httpOnly: true })
        res.status(200).json({message: 'You are logged in!'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = createToken(user._id)
        res.cookie('token', token, { maxAge: 1000 * 60 * 60, httpOnly: true })
        res.status(201).send({message: 'You are registered!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

router.get('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 1 })
    res.status(200).json({message: 'You are logged out!'})
})

module.exports = router