const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { auth } = require('../utils');

// register  API steps
// get req body - in server.js app.use(express.json()); then post req
// validate the req body - using express-validator which is middleware
// check if user exists - findOne(email)
// encrypt password
// save data in db - await user.save();
// create token contain user id, return token - jwt.sign

//  POST /api/users/register
// register a new user
// public
router.post('/register',
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            user = new User({
                name,
                email,
                password,
            });
            const salt = await bcrypt.genSalt(10); // 10 rounds of salt = 10 rounds of encryption
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id // id is automatically generated by mongoose and .id and ._id are the same
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '5 days' }, (err, token) => {
                if (err) throw err;
                res.send({ token }); // respond will be a token obj  - same as res.json({token});
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

//  POST /api/users/login
// login an existing user
// public

//login API Steps
// get req body 
// validate the req body - using check method express-validator which is middleware
// check if user exists - findOne(email)
// check password - compare() by req.body.password and user.password from db
// create token contain user id, return token - jwt.sign

router.post('/login',
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
            }

                const payload = {
                    user: {
                        id: user.id // id is automatically generated by mongoose and .id and ._id are the same
                    }
                }
                jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '5 days' }, (err, token) => {
                    if (err) throw err;
                    res.send({ token }); // respond will be a token obj  - same as res.json({token});
                });

            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
            }
        });


//  GET /api/users
// takes a token and returns the user info excluding password
// private

// auth is a custom middleware called for next api route


router.get('/', auth ,async (req, res) => { // auth user here as a custom middleware
    try { // find user by id from req.user from auth middleware
        const user = await User.findById(req.user.id).select('-password'); // select('-password') will exclude password from the response
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;