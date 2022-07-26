import React from 'react'
import { Navigate , Outlet } from 'react-router-dom'
import {useAuthStatus} from "../hooks/useAuthStatus"
import Spinner from './Spinner'
const PrivateRoute = () => {
    const {logedIn , checkingStatus}  = useAuthStatus();
    if(checkingStatus){
return <Spinner/>
    }
  return logedIn?<Outlet/> :<Navigate to='/login'/>
}

export default PrivateRoute