import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { FaStackExchange } from "react-icons/fa";

import ticketService from "./ticketService"

const initialState = {
    tickets:[],
    ticket:{},
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
};


export const createTicket = createAsyncThunk('ticket/create',async (ticketData , thunkAPI)=>{
   
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.createTicket(ticketData,token);
    } catch (error) {
        console.log(error)
        const message = (error.response && error.response.data && error.response.data.message)||error.message ||error.toString();
        return thunkAPI.rejectWithValue(message)
    }
});


export const getTickets = createAsyncThunk('ticket/getAll',async (_ , thunkAPI)=>{
   
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.getTickets(token);
    } catch (error) {
        console.log(error)
        const message = (error.response && error.response.data && error.response.data.message)||error.message ||error.toString();
        return thunkAPI.rejectWithValue(message)
    }
});


export const ticketSlice = createSlice({
    name:'ticket',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
builder.addCase(createTicket.pending,(state)=>{
    state.isLoading = true;
    state.isError = false;
state.isSuccess = false;
}).addCase(createTicket.fulfilled,(state)=>{
    state.isLoading = false;
    state.isSuccess= true;

}).addCase(createTicket.rejected,(state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;

}).addCase(getTickets.pending,(state)=>{
    state.isLoading = true;
    state.isError = false;
state.isSuccess = false;
}).addCase(getTickets.fulfilled,(state,actions)=>{
    state.tickets = actions.payload
    state.isLoading = false;
    state.isSuccess= true;

}).addCase(getTickets.rejected,(state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;

})
    }

})
export default ticketSlice.reducer;

 export const {reset} =ticketSlice.actions;