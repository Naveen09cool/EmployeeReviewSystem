const express = require('express');
const router = express.Router();
const passport = require('passport');     


const adminsController = require('../controllers/admins_controller');

router.get('/admin-view', adminsController.adminView);
router.post('/update-emp/:id', adminsController.updateEmployee);//Make Admin
router.get('/view-emp', adminsController.viewEmployees);
router.get('/remove-emp/:id', adminsController.removeEmployee);
// router.post('/assign-review', adminsController.assignReview);




module.exports= router;


// Admin view
//      Add/remove/update/view employees
//      Add/update/view performance reviews
//      Assign employees to participate in another employee's performance review
