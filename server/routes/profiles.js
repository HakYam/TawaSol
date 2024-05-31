const express = require('express');
const router = express.Router();
const { auth, upload } = require('../utils');
const { check, validationResult } = require('express-validator');
const normalizeUrl = require('normalize-url');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');



/*
1 POST /profiles
2 GET /profiles/me
3 GET /profiles
4 GET profiles/user/:user_id
5 DELETE profiles
6 POST /profiles/upload
7 PUT /profiles/experience
8 DELETE /profiles/experience/:exp_id
9 PUT /profiles/education
10 DELETE /profiles/education/:edu_id
*/

// private api as it uses auth as a middleware
// 1 POST /profiles
router.post('/', auth,
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { website, skills, github, youtube, facebook, twitter, instagram, linkedin, ...rest } = req.body;
        const profile = {
            user: req.user.id, // from decoded token in auth middleware
            website: website && website !== '' ? normalizeUrl(website, { forceHttps: true }) : '',
            skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
            ...rest
        };
        const socialFields = { github, youtube, facebook, twitter, instagram, linkedin };
        for (let key in socialFields) {
            const value = socialFields[key];
            if (value && value !== '') {
                socialFields[key] = normalizeUrl(value, { forceHttps: true });
            }
        }

        profile.social = socialFields;

        try {
            let profileObject = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profile },
                { new: true, upsert: true },
            )
            res.json(profileObject);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });


router.get('/', auth, async (req, res) => {

    try {
        const profiles = await Profile.find().populate('user', ['name']);

        res.json(profiles);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/me', auth, async (req, res) => {

    try { // user is from the auth middleware - decoded token
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/user/:user_id', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/', auth, async (req, res) => {
    try { // any deal with db needs try catch
        // remove  1 posts, profile, then user
        await Promise.all([ // to Promise.all to handel multiple promises functions
            Post.deleteMany({ user: req.user.id }),
            Profile.findOneAndDelete ({ user: req.user.id }),
            User.findOneAndDelete ({ _id: req.user.id }),
        ]);
        res.json({ msg: 'User info is deleted successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// 6 POST /profiles/upload
router.post('/upload', auth, async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server Error : ${err.message}');
            } else {
                res.status(200).send(req.user.id);
            }
        })
    }
    catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        });

        // 7 PUT /profiles/experience
        router.put('/experience', auth, 
        check ('title', 'Title is required').notEmpty(),
        check ('company', 'Company is required').notEmpty(),
        check ('from', 'From date is required and need to be from the past').notEmpty().custom((value) => {
            return new Date(value) < Date.now();
        }),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const profile = await Profile.findOne({ user: req.user.id });
                profile.experience.unshift(req.body);
                await profile.save();
                res.json(profile);
            }
            catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        });

        // 8 DELETE /profiles/experience/:exp_id
        router.delete('/experience/:exp_id', auth, async (req, res) => {
            try {
                const profile = await Profile.findOne({ user: req.user.id });
                profile.experience = profile.experience.filter( exp => {
                    return exp._id.toString() !== req.params.exp_id}
                );
                await profile.save();
                res.json(profile);
            }
            catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        });

        // 9 PUT /profiles/education
        router.put('/education', auth, 
        check ('school', 'School is required').notEmpty(),
        check ('degree', 'Degree is required').notEmpty(),
        check ('fieldofstudy', 'Field of study is required').notEmpty(),
        check ('from', 'From date is required and need to be from the past').notEmpty().custom((value) => {
            return new Date(value) < Date.now();
        }),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const profile = await Profile.findOne({ user: req.user.id });
                profile.education.unshift(req.body);
                await profile.save();
                res.json(profile);
            }
            catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        });

        // 10 DELETE /profiles/education/:edu_id
        router.delete('/education/:edu_id', auth, async (req, res) => {
            try {
                const profile = await Profile.findOne({ user: req.user.id });
                profile.education = profile.education.filter( edu => {
                    return edu._id.toString() !== req.params.edu_id}
                );
                await profile.save();
                res.json(profile);
            }
            catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        });
        module.exports = router;