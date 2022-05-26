const express = require('express');
const router = express.Router();
const passport = require('passport');     

const reviewsController = require('../controllers/reviews_controller');

router.get('/set-review/:id', reviewsController.setReview);

module.exports= router;

