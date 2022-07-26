import React from 'react'
import {useState} from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket , reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import BackButton from '../components/BackButton';


const NewTicket = () => {
  const {user} = useSelector((state)=>state.auth);
  const [name , setName] = useState(user.name);
  const [email , setEmail] = useState(user.email);
  const [product , setProduct] = useState("");
  const {isLoading , isError , isSuccess , message} = useSelector((state)=>state.ticket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(()=>{

    if(isError){
        toast.error(message)
    }
    if(isSuccess){
        dispatch(reset());
        navigate('/tickets')
    }
},[dispatch , isError , isSuccess , navigate , message])

  const [description , setDescription] = useState("")
const onSubmit = (e)=>{
    console.log({product , description});
e.preventDefault();
dispatch(createTicket({product,description}));

}
if(isLoading){
    return <Spinner/>
}
    return (

    <>
    <BackButton url='/'></BackButton>
    <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>

    </section>
    <section className="form">
        <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input type="text" className='form-control' value={name} disabled />
        </div>
        <div className="form-group">
            <label htmlFor="email">Customer Email</label>
            <input type="text" className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
           <div className="form-group">
           <label htmlFor="product">Product</label>
            <select name="product" id="product" value={product} onChange={(e)=>setProduct(e.target.value)}>
             <option value=""></option>   
            <option value="iPhone">iPhone</option>
            <option value="iMac">iMac</option>
            <option value="Macbook Pro">Macbook Pro</option>
            <option value="iPad">iPad</option>
            </select>
           </div>
           <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea  className='form-control' value={description} onChange={(e)=>setDescription(e.target.value)}  />
        </div>
        <div className="form-group">
            <button className="btn btn-block">Create</button>
        </div>
        </form>
    </section>
    </>
  )
}

export default NewTicket