import { useState,useEffect } from "react";
import {useSelector} from 'react-redux';

export const useAuthStatus = ()=>{
    const [logedIn ,setLogedIn]  = useState(false);
    const [checkingStatus , setCheckingStatus] = useState(true);
    const {user}  = useSelector((state)=>state.auth);
    useEffect(()=>{
if(user){
    setLogedIn(true)
}else{
    setLogedIn(false)
}
setCheckingStatus(false);
    },[user])

    return {logedIn , checkingStatus}
}