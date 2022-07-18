import React from 'react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify'
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    console.log('hello');
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (password === password2) {
            
            toast.error("Paswords do not Match")
            return;
        }
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
                type='password'
                className="form-control"
                value={password2}
                name="password2"
                onChange={onChange}
                placeholder="Conform Password"
                required
              />
                      </div>
                      <div className="form-group">
                          <button type='submit' className='btn btn-block'>
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
