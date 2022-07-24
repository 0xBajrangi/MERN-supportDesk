import React from "react";
import { useState,useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register,reset } from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom"; 
import Spinner from "../components/Spinner";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();
  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();

  const { user, isLoading,isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
    
    navigate('/');
    dispatch(reset())

    }
      },[isSuccess , isError , user,navigate,dispatch,message])
  const onChange = (e) => {
    setFormData((prevState)=>{return { ...prevState, [e.target.name]: e.target.value }});
  
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Paswords do not Match");
      return;
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData))
    }
  };
  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Hello New User Register yourself</p>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={name}
                name="name"
                onChange={onChange}
                placeholder="Enter your Name"
                required
              />
              <input
                type="email"
                className="form-control"
                value={email}
                name="email"
                onChange={onChange}
                placeholder="Enter your Email"
                required
              />
              <input
                type="password"
                className="form-control"
                value={password}
                name="password"
                onChange={onChange}
                placeholder="Enter your Password"
                required
              />
              <input
                type="password"
                className="form-control"
                value={password2}
                name="password2"
                onChange={onChange}
                placeholder="Conform Password"
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default Register;
