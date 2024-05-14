const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type:String
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      required:true
    },
    date:{
      type:Date,
      default:Date.now
    } , 
    list :[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'List'
    }]
  });

module.exports = mongoose.model('User', UserSchema);