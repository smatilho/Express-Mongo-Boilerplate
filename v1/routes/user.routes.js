// TODO: Figure out if we can standardize more requests
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    getAll, getOneByKey, post, putOne, deleteOne,
} = require('../../helpers/crudGenerics');
const validateRequestStructure = require('../../middleware/validateRequestStructure');
const authenticateToken = require('../../middleware/auth');

const User = require('../models/user.model');

router.route('').get(getAll(User));
router.route('/:username').get(getOneByKey(User, 'username'));
// router.route('/add').post(authenticateToken, validateRequestStructure, post(User));
// router.route('/:username').put(authenticateToken, validateRequestStructure, putOne(Availability, 'username'));
router.route('/:username').delete(authenticateToken, deleteOne(User, 'username'));

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
