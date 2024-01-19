const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
    },
    date: { type: Date, default: () => Date.now() },
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
