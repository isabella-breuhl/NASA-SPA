 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const dscovrSchema = new Schema({
     url: {
        type: String,
        required: true
      },
      owner : {
        type: Schema.ObjectId,
        required: true
      },
      rate : {
       type: String,
       required: true
      }
    }, { timestamps: true });
    
    module.exports = mongoose.model('DscovrPhoto', dscovrSchema);