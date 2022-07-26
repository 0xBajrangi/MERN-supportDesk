const asyncHandler = require('express-async-handler');

const User = require('../models/userModel')
const Tickets = require('../models/ticketModel')



// get api/tickets
const getTickets = asyncHandler(async (req, res) => {
//    get user using the id int ithe jwt 
const user = await User.findById(req.user.id);
if(!user){
    res.status(401);
    throw new Error('user Not Found');
}
const tickets = await Tickets.find({user:req.user.id });

    res.status(200).json(tickets)
    
});

//post api/create

const createTicket = asyncHandler(async (req, res) => {
    const {product ,description}  = req.body;
    console.log(req.body); 
    if(!product || !description) {
     res.status(400)
 throw new Error('please add a product and description')
 }
 const ticket = await Tickets.create({
    product , description,user:req.user.id,status:"new"
 });

 
    res.status(200).json(ticket); 
    
});

// get user ticket /api/tickets/:id
const getTicket = asyncHandler(async (req, res) => {
    //    get user using the id int ithe jwt 
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('user Not Found');
    }
    const ticket = await Tickets.findById(req.params.id);
    if(!ticket){
        res.status(404);
        throw new Error('Ticket not Found');
    }
    if(ticket.user.toString()!==req.user.id){
        res.status(401);
        throw new Error("Not Authorised")
    }
        res.status(200).json(ticket)
        
    });

    // delete ticket
    // delete  user ticket /api/tickets/:id
const deleteTicket = asyncHandler(async (req, res) => {
    //    get user using the id int ithe jwt 
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('user Not Found');
    }
    const ticket = await Tickets.findById(req.params.id);
    if(!ticket){
        res.status(404);
        throw new Error('Ticket not Found');
    }
    if(ticket.user.toString()!==req.user.id){
        res.status(401);
        throw new Error("Not Authorised")
    }
    await ticket.remove();

        res.status(200).json({success:true})
        
    });

        // delete ticket
    // update  user ticket /api/tickets/:id
const updateTicket = asyncHandler(async (req, res) => {
    //    get user using the id int ithe jwt 
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('user Not Found');
    }
    const ticket = await Tickets.findById(req.params.id);
    if(!ticket){
        res.status(404);
        throw new Error('Ticket not Found');
    }
    let updatedTicket = await Tickets.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(ticket.user.toString()!==req.user.id){
        res.status(401);
        throw new Error("Not Authorised")
    }
        res.status(200).json(updatedTicket);
    });
module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket
}
