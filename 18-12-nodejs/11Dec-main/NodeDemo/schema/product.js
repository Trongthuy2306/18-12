var mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:String,
    desc: String,
    image : String,
    price:Number
});

module.exports = mongoose.model('Product', schema);;