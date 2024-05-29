const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { check, validationResult } = require('express-validator');
const normalizeUrl = require('normalize-url');
const Profile = require('../models/Profile');



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

module.exports = router;