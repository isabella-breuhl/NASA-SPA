const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  _id : {
    type: Schema.Types.ObjectId
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
   type: String,
   required: true,
   unique: false
  },
  age: {
    type: Number
  }},
  {timestamp: true}
);

userSchema.virtual('dscovr', {
  ref: 'DscovrPhoto',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.virtual('rover', {
  ref: 'RoverPhoto',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.set('toObject', {virtuals: true} );
userSchema.set('toJSON', { virtuals : true });

module.exports = mongoose.model('User', userSchema);
