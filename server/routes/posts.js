const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth } = require('../utils');
const Post = require('../models/Post');
const User = require('../models/User');


/*
1 POST /posts
2 GET /posts
3 GET /posts/:id
4 DELETE /posts/:id
5 PUT /posts/like/:id
6 PUT /posts/unlike/:id
7 POST /posts/comment/:id
8 DELETE /posts/comment/:id/:comment_id
*/

// 1 POST /posts
router.post('/', auth,
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                user: req.user.id
            })
            const post = await newPost.save();
            res.json(post);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// 2 GET /posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }); // -1 for descending
        res.json(posts);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// 3 GET /posts/:id
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    }
    catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// 4 DELETE /posts/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Post.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Post removed' });
    }
    catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});
// 5 PUT /posts/like/:id
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        // avoid multiple likes from the same user
        if (post.likes.some(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id }); // add user id to the beginning of the likes array
        await post.save();
        res.json(post.likes);
    }
    catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }

});

// 6 PUT /posts/unlike/:id
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        // avoid multiple likes from the same user
        if (!post.likes.some(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post has not yet been liked previously' });
        }
        post.likes = post.likes.filter(like => like.user.toString() !== req.user.id); // remove user id from the likes array
        await post.save();
        res.json(post.likes);
    }
    catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// 7 POST /posts/comment/:id
router.post('/comment/:id', auth,
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);
            const newComment = {
                text: req.body.text,
                name: user.name,
                user: req.user.id
            };
            post.comments.unshift(newComment);
            await post.save();
            res.json(post.comments);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// 8 DELETE /posts/comment/:id/:comment_id
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        post.comments = post.comments.filter(comment => comment.id !== req.params.comment_id);
        await post.save();
        res.json(post.comments);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;