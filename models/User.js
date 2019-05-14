const mongoose = require('mongoose'); //imports mongoose module
const { Schema } = mongoose; //creates Schema objects so mongoose can interact with mongo

const userSchema = new Schema({
  googleID: String, //Property of User collection
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema); //Adds Users into DB. Only creates new model instance if model does not alreayd exist just adds.
