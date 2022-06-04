const express = require('express');
const router = express.Router();
const passport = require('passport');     


const employeesController = require('../controllers/employees_controller');

router.get('/emp-view', passport.checkAuthentication, employeesController.empView);

module.exports= router;

// Employee view
//      List of performance review requiring feedback
//      Submit feedback