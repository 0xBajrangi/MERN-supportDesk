import React from 'react';
import {Routes , Route , BrowserRouter as Router} from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Invalid from './pages/Invalid';
import Login from "./pages/Login"
import Register from "./pages/Register"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify"
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
import Tickets from './pages/Tickets';



function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path="/new-ticket" element={<PrivateRoute/>}>
              <Route path="/new-ticket" element={<NewTicket/>}/>
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tickets" element={<PrivateRoute/>}>
              <Route path="/tickets" element={<Tickets/>} />
            </Route>
            <Route path="*" element={<Invalid />}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
