const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema; //Not a collection but an embeded document. Notice it doesnt call 'mongoose.model'
