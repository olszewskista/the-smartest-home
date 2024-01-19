const {Router} = require('express')
const Comment = require('../models/comment')
const Post = require('../models/post')
const {checkAuthMiddleware} = require('../utils/auth')

const router = Router()
router.use(checkAuthMiddleware)

//create a comment on a post with id
router.post('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const comment = new Comment({
            content: req.body.content,
            author: res.locals.token.id,
        })
        await comment.save()
        post.comments.push(comment._id)
        await post.save()
        res.status(200).json({message: 'Comment created!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

//update a comment with id
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        comment.content = req.body.content
        console.log(comment)
        await comment.save()
        res.status(200).json({message: 'Comment updated!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

//delete a comment with id
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        console.log(comment)
        res.status(200).json({message: 'Comment deleted!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

module.exports = router