const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    product: {
        type: String, 
        required: [true, 'Please add an Product'],
        enum :['iPhone','Macbook Pro','iMac','iPad']
    },
    description: {
        type: String,
        required:[true,"Please Enter a Description"]
    }, status: {
        type: String,
        enum:['new','open','closed'],
        default:'new'
    }
    
}, {
    timestamp:true,
})


const Tickets = mongoose.model('Tickets', ticketSchema);
module.exports = Tickets;
