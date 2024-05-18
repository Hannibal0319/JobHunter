import { createSlice } from "@reduxjs/toolkit"
import Login from "../components/Login"
import Logout from "../components/Logout"

const initialstate={user: null, token: null}

const authSlice = createSlice({
    name: 'auth',
    initialstate,
    reducers: {
        login: (state,action)=>{
            state.user={
                id: action.payload.id,
                email: action.payload.email
            }
            state.token=action.payload.token
        },
        logout: (state,action)=>{
            state.user=null
            state.token=null
        }
        

    }
})

export const selectLoggedInUser = (state) => state.auth.user
export const selectAuthToken = (state) => state.auth.token

export const {login , logout} = authSlice.actions

export const {reducer: authReducer} = authSlice.reducer 