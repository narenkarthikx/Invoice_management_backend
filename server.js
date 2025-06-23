const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Invoice = require('./models/invoice');
require('dotenv').config();

// Function to generate and save invoice number
const generateAndSaveInvoiceNumber = async (requestData) => {
  try {
    const currentDate = new Date();
    const [year, month, day] = [currentDate.getFullYear().toString().slice(-2), (currentDate.getMonth() + 1).toString().padStart(2, '0'), currentDate.getDate().toString().padStart(2, '0')];
    const invoiceCount = await Invoice.countDocuments({});
    const formattedSerialNumber = (invoiceCount + 1).toString().padStart(4, '0');
    const invoiceNumber = `${year}CBINV${month}${day}${formattedSerialNumber}`;
    requestData.invoiceNumber = invoiceNumber;
    await new Invoice(requestData).save();
    return invoiceNumber;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// User model and schema
const User = mongoose.model('users', new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: 'user' },
}));


// Middleware variable for authorization access.
const verifyToken = (req, res, next) => {
  
  next();
} 
  

// check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  res.status(403).json({ message: 'Forbidden: Admin access required' });
};

// User registration
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw { status: 400, message: 'Email and password are required' };

    if (await User.findOne({ email })) throw { status: 409, message: 'Email already in use' };

    const hashedPassword = await bcrypt.hash(password, 10);
    await new User({ email, password: hashedPassword }).save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw { status: 400, message: 'Email and password are required' };

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) throw { status: 401, message: 'Invalid credentials' };

    // Create JWT token
    const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: parseInt(process.env.TOKEN_EXPIRATION) });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
});
// Update invoice details

app.put('/api/invoices/:invoiceNumber', verifyToken, async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    const updatedData = req.body;

    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }

    const updatedInvoice = await Invoice.findOneAndUpdate(
      { invoiceNumber },
      { $set: updatedData },
      { new: true }
    );

    if (updatedInvoice) {
      res.json({ message: 'Invoice updated successfully', updatedInvoice });
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Failed to update the invoice' });
  }
});

// Routes
// create an invoice
app.post('/api/invoices', verifyToken, async (req, res) => {
  try {
    const invoiceNumber = await generateAndSaveInvoiceNumber(req.body);  // Use the function here
    res.json({ message: 'Invoice added successfully', invoiceNumber });
  } catch (error) {
    console.error('Error adding invoice:', error);
    res.status(500).json({ error: 'Failed to add the invoice' });
  }
});

app.route('/api/invoices')
  .get(async (req, res) => {
    try {
      const invoices = await Invoice.find();
      res.json(invoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      res.status(500).json({ error: 'Failed to retrieve invoices' });
    }
  });

app.route('/api/invoices/:invoiceNumber')
  .get(async (req, res) => {
    try {
      const invoice = await Invoice.findOne({ invoiceNumber: req.params.invoiceNumber });
      invoice ? res.json(invoice) : res.status(404).json({ error: 'Invoice not found' });
    } catch (error) {
      console.error('Error fetching invoice:', error);
      res.status(500).json({ error: 'Failed to retrieve the invoice' });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await Invoice.deleteOne({ invoiceNumber: req.params.invoiceNumber });
      result.deletedCount === 1 ? res.json({ message: 'Invoice deleted successfully', invoiceNumber: req.params.invoiceNumber }) : res.status(404).json({ error: 'Invoice not found' });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      res.status(500).json({ error: 'Failed to delete the invoice' });
    }
  });

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
