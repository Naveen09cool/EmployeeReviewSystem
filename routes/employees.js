const express = require('express');
const router = express.Router();
const passport = require('passport');     


const employeesController = require('../controllers/employees_controller');

router.post('/list-review-to', employeesController.listReviewTo);
router.post('/give-review-to', employeesController.giveReviewTo);
router.get('/emp-view', employeesController.empView);


module.exports= router;

// Employee view
//      List of performance review requiring feedback
//      Submit feedback