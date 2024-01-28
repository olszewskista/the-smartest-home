const {Router} = require('express')
const User = require('../models/user')
const {checkAdminMiddleware, checkAuthMiddleware} = require('../utils/auth')

const router = Router()

router.use(checkAuthMiddleware)
router.use(checkAdminMiddleware)

//get all users
router.get('/', async (req, res) => {
    try {
        const usr = await User.find()
        res.status(200).json(usr)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//create new user
router.post('/create', async (req, res) => {
    try {
        const usr = new User({name: req.body.name, password: req.body.password, role: req.body.role})
        await usr.save()
        res.status(200).json({message: 'User created!'})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//update existing user
router.put('/update/:name', async (req, res) => {
    try {
        const users = await User.find({name: req.params.name})
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
router.delete('/delete/:name', async (req, res) => {
    console.log(req.params.name)
    try {
        const response = await User.deleteOne({name: req.params.name})
        res.status(200).json({message: 'User deleted!'})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router