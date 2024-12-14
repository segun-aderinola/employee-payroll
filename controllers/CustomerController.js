const Customer = require('../models/Customer');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.render('customers', { 
      customers,
      success: req.flash('success'), 
      error: req.flash('error') 
    });
  } catch (error) {
    req.flash('error', 'Failed to fetch customers.');
    res.redirect('/customers');
  }
};

exports.addCustomer = async (req, res) => {
  const { name, payment_type, payment_amount } = req.body;
  try {
    await Customer.create({ name, payment_type, payment_amount });
    req.flash('success', 'Customer added successfully!');
    res.redirect('/customers');
  } catch (error) {
    req.flash('error', 'Failed to add customer.');
    res.redirect('/customers');
  }
};