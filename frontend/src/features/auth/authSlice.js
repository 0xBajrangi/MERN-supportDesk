import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

import authServise from "./authService";

// get user form LS

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user:user?user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
};

// create an async thunk

export const register = createAsyncThunk('auth/register',async (user , thunkAPI)=>{
   
    try {
        return await authServise.register(user);
    } catch (error) {
        console.log(error)
        const message = (error.response && error.response.data && error.response.data.message)||error.message ||error.toString();
        return thunkAPI.rejectWithValue(message)
    }
});


export const login = createAsyncThunk('auth/login',async (user , thunkAPI)=>{
   try{
return await authServise.login(user)
   }catch(error){
    const message = (error.response && error.response.data && error.response.data.message)||error.message ||error.toString();
    return thunkAPI.rejectWithValue(message)
   }
});
 

//logout 
export const logout = createAsyncThunk('auth/logout',async ()=>{
    await authServise.logout();

})
// creating slice


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

        reset:(state)=>{
            state.isLoading = false;
            state.isSuccess = false
            state.message = "";
            state.isError= false;
        }
    },
    extraReducers:(builder)=>{
                    
        builder.addCase(register.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.isError = false;
        }).addCase(register.rejected,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.user = null;
            state.message = action.payload;
            state.isError= true;
        }).addCase(logout.fulfilled,(state)=>{
            state.user = null;
        }).addCase(login.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.isError = false;

        }).addCase(login.rejected,(state,action)=>{
            console.log('rejected')
            state.isLoading = false;
            state.isSuccess = false;
            state.user = null;
            state.message = action.payload;
            state.isError= true;
        })
    }
})

export default authSlice.reducer;
export const {reset} = authSlice.actions;