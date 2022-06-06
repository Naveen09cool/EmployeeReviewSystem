const express = require('express');
const router = express.Router();
const passport = require('passport');     


const adminsController = require('../controllers/admins_controller');

router.get('/admin-view',passport.checkAuthentication, adminsController.adminView);
router.post('/update-emp/:id', adminsController.updateEmployee);//Make Admin
router.get('/view-emp', adminsController.viewEmployees);
router.get('/remove-emp/:id', adminsController.removeEmployee);
router.post('/assign-review', adminsController.assignReview);
router.post('/add-employee',adminsController.addEmployee)

module.exports= router;

