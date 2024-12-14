const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

router.get('/', CustomerController.getAllCustomers);
router.post('/add', CustomerController.addCustomer);

module.exports = router;
