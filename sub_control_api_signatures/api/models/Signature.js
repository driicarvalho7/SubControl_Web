const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SignatureSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: ['brl', 'usd', 'eur'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  period: {
    type: String,
    enum: ['days', 'weeks', 'months', 'years'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Signature', SignatureSchema);
