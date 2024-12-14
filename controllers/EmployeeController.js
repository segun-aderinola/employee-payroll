const Customer = require('../models/Customer');
const Employee = require('../models/Employee');
const Payment = require('../models/Payment');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    const allCustomers = await Customer.findAll();
    
    const customerIds = employees.map(employee => employee.customer_id);

    const customers = await Customer.findAll({
      where: {
        id: customerIds
      }
    });

    const customerMap = customers.reduce((acc, customer) => {
      acc[customer.id] = customer;
      return acc;
    }, {});

    employees.forEach(employee => {
      employee.Customer = customerMap[employee.customer_id] || null;
    });
    res.render('employees', { 
      employees,
      allCustomers,
      customers,
      success: req.flash('success'),
      error: req.flash('error')
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred while fetching employees');
    res.redirect('/employees');
  }
};

exports.addEmployee = async (req, res) => {
  const { name, email, salary, department, customer_id } = req.body;
  try {
    // Create the new employee
    await Employee.create({ name, email, salary, department, customer_id });
    req.flash('success', 'Employee added successfully!');
    res.redirect('/employees');
  } catch (error) {
    req.flash('error', 'Failed to add employee.');
    res.redirect('/employees');
  }
};

exports.payEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findByPk(employeeId);
    //console.log(employee)
    if (!employee) {
      req.flash('error', 'Employee not found');
      return res.redirect('/employees');
    }

    const customer = await Customer.findByPk(employee.customer_id);
   // console.log(customer)
    if (!customer) {
      req.flash('error', 'Customer (Organization) not found');
      return res.redirect('/employees');
    }

    if (customer.payment_amount < employee.salary) {
      req.flash('error', 'Insufficient funds in the customer account');
      return res.redirect('/employees');
    }

    const payment = await Payment.create({
      employee_id: employeeId,
      amount_paid: employee.salary,
      payment_date: new Date(),
    });

    customer.payment_amount -= employee.salary;
    await customer.save();

    employee.status = 'Paid';
    await employee.save();

    req.flash('success', `Employee ${employee.name} paid successfully!`);
    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to process payment');
    res.redirect('/employees');
  }
};

// cache

// 