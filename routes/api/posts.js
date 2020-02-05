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
			check('text', 'text is required').not().isEmpty()
		]
	],
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
				avatar: user.avatar,
				user: req.user.id
			});

			const post = await newPost.save();

			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route POST api/posts/like/:id
// @desc likes a post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		const likes = post ? post.likes.filter((like) => like.user.toString() === req.user.id) : [];
		let resp = { msg: 'Post already liked' };

		if (likes.length === 0) {
			post.likes.unshift({ user: req.user.id });
			resp = { msg: 'Post liked!' };
		}
		res.json(resp);
		await post.save();
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});
// @route    PUT api/posts/unlike/:id
// @desc     Like a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check if the post has already been liked
		if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
			return res.status(400).json({ msg: 'Post has not yet been liked' });
		}

		// Get remove index
		const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id);

		post.likes.splice(removeIndex, 1);

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
	'/comment/:id',
	[
		auth,
		[
			check('text', 'text is required').not().isEmpty()
		]
	],
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
				avatar: user.avatar,
				user: req.user.id
			};

			post.comments.unshift(newComment);

			await post.save();
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);
// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Pull out comment
		const comment = post.comments.find((comment) => comment.id === req.params.comment_id);

		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		// Check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		// Get remove index
		const removeIndex = post.comments.map((comment) => comment.id).indexOf(req.params.comment_id);

		post.comments.splice(removeIndex, 1);

		await post.save();

		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route DELETE api/posts/:id
// @desc  deletes a post
// @access Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await post.remove();

		res.json({ msg: 'Post removed' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

module.exports = router;
