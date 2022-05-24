const express = require('express');
const router = express.Router();
const passport = require('passport');     


const adminsController = require('../controllers/admins_controller');

router.post('/admin-view', adminsController.adminView);
// router.post('/assign-review', adminsController.assignReview);
router.post('/update-emp', adminsController.updateEmployee);//Make Admin
router.get('/view-emp', adminsController.viewEmployee);
router.get('/remove-emp/:id', adminsController.removeEmployee);
// router.post('/add-emp', adminsController.addEmployee);



module.exports= router;


// Admin view
//      Add/remove/update/view employees
//      Add/update/view performance reviews
//      Assign employees to participate in another employee's performance review
