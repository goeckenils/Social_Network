const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');

// @route GET api/profile/me
// @desc  GET the current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
			'name',
			'avatar'
		]);
		if (!profile) {
			return res.status(400).json({ msg: 'there is no profile for this user!' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route GET api/profile
// @desc  Get all profiles
// @access Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [
			'name',
			'avatar'
		]);
		res.json(profiles);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});
// @route GET api/profile/user/:user_id
// @desc  Get profile by id
// @access Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
			'name',
			'avatar'
		]);
		res.json(profile);
		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found!' });
		}
	} catch (err) {
		console.error(err);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found!' });
		}
		res.status(500).send('Server Error');
	}
});
// @route PUT api/profile/education
// @desc  add profile education
// @access Private
router.post(
	'/education',
	[
		auth,
		[
			check('school', 'school is required').not().isEmpty(),
			check('degree', 'degree is required').not().isEmpty(),
			check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
			check('from', 'from is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { school, degree, fieldofstudy, from, to, current, description } = req.body;

		const newEdu = {
			school: school,
			degree: degree,
			fieldofstudy: fieldofstudy,
			from: from,
			to: to,
			current: current,
			description: description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEdu);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error!');
		}
	}
);
// @route PUT api/profile/experience
// @desc  add profile experience
// @access Private
router.post(
	'/experience',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('company', 'company is required').not().isEmpty(),
			check('from', 'from is required').not().isEmpty(),
			check('to', 'to is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, company, location, from, to, current, description } = req.body;

		const newExp = {
			title: title,
			company: company,
			location: location,
			from: from,
			to: to,
			current: current,
			description: description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error!');
		}
	}
);
// @route POST api/profile
// @desc  POST create or update a profile
// @access Private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'status is required').not().isEmpty(),
			check('skills', 'skills are required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;

		// Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) {
			profileFields.company = company;
		}
		if (website) {
			profileFields.website = website;
		}
		if (location) {
			profileFields.location = location;
		}
		if (bio) {
			profileFields.bio = bio;
		}
		if (status) {
			profileFields.status = status;
		}
		if (githubusername) {
			profileFields.bio = bio;
		}
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		//Build social object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (facebook) profileFields.social.facebook = facebook;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				// Update profile
				profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

				return res.json(profile);
			}

			// Create
			profile = new Profile(profileFields);
			await profile.save();
			console.log(profile);
			res.json(profile);
		} catch (err) {
			console.log(err.massage);
			res.status(500).send('Server error');
		}
	}
);

// @route DELETE api/profile
// @desc  delete profile, user & post
// @access Private
router.delete('/', auth, async (req, res) => {
	try {
		await Profile.findOneAndRemove({ user: req.user.id });
		await Post.deleteMany({ user: req.user.id });
		await User.findOneAndRemove({ _id: req.user.id });
		res.status(200).json({ msg: 'deleted user' });
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route DELETE api/profile/education/edu_id
// @desc  deletes education
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const removeIndex = await profile.education.map((item) => item.id).indexOf(req.params.edu_id);
		console.log(profile.education);
		profile.education.splice(removeIndex, 1);

		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});
// @route DELETE api/profile/experience/exp_id
// @desc  deletes experience
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const removeIndex = await profile.experience.map((item) => item.id).indexOf(req.params.edu_id);

		profile.experience.splice(removeIndex, 1);

		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
