import React from 'react';
import {Routes , Route , BrowserRouter as Router} from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Invalid from './pages/Invalid';
import Login from "./pages/Login"
import Register from "./pages/Register"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify"



function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Invalid />}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
