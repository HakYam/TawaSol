require('dotenv').config();
const jwt = require('jsonwebtoken');
const multer = require('multer');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token'); // the header will be x-auth-token in react
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' }); // 401 unauthorized
    }
    try {
        const jwtSecret = process.env.VITE_JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT secret is missing!");
        }

        jwt.verify(token, jwtSecret, (error, decoded) => { // it should be the same key for sign and verify
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' }); 
            } else {
                req.user = decoded.user; // decode content will be same payload in jwt.sign
                next();
            }
        }); 
        
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, `${req.user.id}`)
    }
  })
  
  const upload = multer({ storage: storage }).single('');

module.exports = { auth, upload }; // {} to export multi functions
