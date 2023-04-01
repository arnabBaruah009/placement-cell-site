const express = require('express');
const router = express.Router();
const passport = require('passport');

const interviewController = require('../controllers/interview_controller');

router.get('/', passport.checkAuthentication, interviewController.home);
router.post('/create', interviewController.create);
router.get('/:id', interviewController.interview);
router.post('/add/:id', interviewController.add);
router.post('/result/:id', interviewController.result);

module.exports = router;