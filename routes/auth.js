const router = require('express').Router();
const User = require('../models/User');

const {regUser, loginUser } = require('../controllers/auth');

// Register a new user
router.post('/register', regUser);

// Login a user

router.post('/login', loginUser);

module.exports = router;