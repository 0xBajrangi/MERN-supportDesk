import React from 'react';
import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {  email, password } = formData;
  const onChange = (e) => {
    console.log('hello');
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
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
