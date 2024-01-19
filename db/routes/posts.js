const {Router} = require('express')
const Post = require('../models/post')
const {checkAuthMiddleware} = require('../utils/auth')

const router = Router()
router.use(checkAuthMiddleware)

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name').populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'name',
            }
        })
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: res.locals.token.id,
            comments: [],
        })
        await post.save()
        res.status(200).json({message: 'Post created!'})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)        
    }
})

module.exports = router