const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
    },
    date: { type: Date, default: () => Date.now() },
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'comment' }],
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
