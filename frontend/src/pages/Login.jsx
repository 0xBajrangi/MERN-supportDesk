import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {  email, password } = formData;

  const {user  , isError , isSuccess , isLoading , message} = useSelector(state=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
    
    navigate('/');
    dispatch(reset())

    }
      },[isSuccess , isError , user,navigate,dispatch,message]);

  const onChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
 
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email , password
    }
    dispatch(login(userData))
  };
  if(isLoading) return <Spinner/>
  return ( 
      <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
              </h1>
              <p>Welcome Back User</p>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              
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

export default Login;
