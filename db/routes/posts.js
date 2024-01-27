const { Router } = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const { checkAuthMiddleware } = require('../utils/auth');

const router = Router();
router.use(checkAuthMiddleware);

router.get('/', async (req, res) => {
    try {
        let findObject = {};
        if (req.query.key === 'author') {
            const author = await User.findOne({
                name: { $regex: req.query.value, $options: 'i' },
            });
            findObject = {
                "author": author ? author._id : null,
            };
        } else if (req.query.value) {
            findObject = {
                [req.query.key]: { $regex: req.query.value, $options: 'i' },
            };
        }
        const posts = await Post.find(findObject)
            .populate('author', 'name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'name',
                },
            })
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: res.locals.token.id,
            comments: [],
        });
        await post.save();
        res.status(200).json({ message: 'Post created!' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.author.toString() !== res.locals.token.id)
            throw new Error('You are not the author of this post!');
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.status(200).json({ message: 'Post updated!' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = await Comment.deleteMany({
            _id: { $in: post.comments },
        });
        const response = await Post.deleteOne({
            _id: req.params.id,
            author: res.locals.token.id,
        });
        res.status(200).json({ message: 'Post deleted!' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;
