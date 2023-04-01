const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/student', require('./student'));
router.use('/interview', require('./interview'));

console.log('Router is working');

module.exports = router;