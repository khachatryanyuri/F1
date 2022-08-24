const {Schema, model} = require('mongoose');

const User = new Schema({
    userId:{type:Number},
    username:{type: String, unique: true, required: true},
    password:{type: String, required: true},
    roles:[{type: String, ref:'Role'}]
})

module.exports = model('User', User)