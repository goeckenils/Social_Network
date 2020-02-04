const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// @route GET api/posts
// @desc get all posts
// @access Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});
// @route GET api/posts
// @desc get post by id
// @access Private
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		console.log(post);
		res.json(post);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route POST api/posts
// @desc creates a post
// @access Public
router.post(
	'/',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('description', 'description is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, description, tags } = req.body;

		const postFields = {};
		postFields.user = req.user.id;
		if (title) postFields.title = title;
		if (description) postFields.description = description;
		if (tags) {
			postFields.tags = tags.split(',').map((tag) => tag.trim());
		}

		try {
			console.log(postFields);
			const post = new Post(postFields);
			await post.save();
			console.log(post);
			res.json(post);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route DELETE api/posts
// @desc  delete posts
// @access Private
router.delete('/:id', auth, async (req, res) => {
	try {
		await Post.findOneAndRemove({ id: req.params.id });
		res.status(200).json({ msg: 'post deleted' });
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
