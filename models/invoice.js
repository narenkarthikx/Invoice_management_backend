// models/invoice.js

const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  date: String,
  selectedCourses: [{ id: Number, name: String, amount: Number }],
  amountPaid: Number,
  invoiceNumber: String,
  paymentStatus: String,
  nextDueDate: String,
  createdBy: String,
  phoneNumber: String,
  placeOfSupply: String,
  billingAddress: String,
  items: [{ description: String, rate: Number, qty: Number, total: Number }],
  grandTotal: Number,
  amountInWords: String,
  notes: String,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
