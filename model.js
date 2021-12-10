const mongoose = require('mongoose'); 

var textSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true,
    }
});

//Export the model
module.exports = mongoose.model('Text', textSchema);