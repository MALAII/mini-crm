const Customer = require("../models/Customer");

// @route   GET /api/customers
// @desc    Get all customers for the logged-in user (supports search)
// @access  Private
const getCustomers = async (req, res) => {
  try {
    const { search } = req.query;

    const query = { owner: req.user._id };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const customers = await Customer.find(query).sort({ createdAt: -1 });
    return res.json(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while fetching customers" });
  }
};

// @route   GET /api/customers/:id
// @desc    Get a single customer by id
// @access  Private
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, owner: req.user._id });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while fetching customer" });
  }
};

// @route   POST /api/customers
// @desc    Create a new customer
// @access  Private
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, address } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email and phone are required" });
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      company,
      address,
      owner: req.user._id,
    });

    return res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while creating customer" });
  }
};

// @route   PUT /api/customers/:id
// @desc    Update an existing customer
// @access  Private
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, owner: req.user._id });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const { name, email, phone, company, address } = req.body;

    customer.name = name ?? customer.name;
    customer.email = email ?? customer.email;
    customer.phone = phone ?? customer.phone;
    customer.company = company ?? customer.company;
    customer.address = address ?? customer.address;

    const updatedCustomer = await customer.save();
    return res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while updating customer" });
  }
};

// @route   DELETE /api/customers/:id
// @desc    Delete a customer
// @access  Private
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, owner: req.user._id });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.deleteOne();
    return res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while deleting customer" });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
