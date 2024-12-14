const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

router.get('/', EmployeeController.getAllEmployees);
router.post('/add', EmployeeController.addEmployee);
router.post('/pay/:id', EmployeeController.payEmployee);


module.exports = router;