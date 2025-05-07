 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const roverSchema = new Schema({
     url: {
        type: String,
        required: true
      },
      owner : {
        type: Schema.ObjectId,
        required: true
      },
      note : {
       type: String,
       required: false
      }
    }, { timestamps: true });
    
    module.exports = mongoose.model('RoverPhoto', roverSchema);