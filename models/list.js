const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type:String,
        required:true
    } ,
    body: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now,
    }, 
    user : [{
        type:mongoose.Schema.Types.ObjectId , 
        ref : "User"
    }]
});

module.exports = mongoose.model('List', listSchema);