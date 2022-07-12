const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add an name']
    },
    email: {
        type: String, 
        required: [true, 'Please add an Email'],
        unique:true
    },
    password: {
        type: String,
        required:[true,"Please add an password"]
    }, isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
    
}, {
    timestamp:true,
})


const User = mongoose.model('User', userSchema);
module.exports = User;
