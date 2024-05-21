import { createSlice } from "@reduxjs/toolkit"


const initialstate={user: null, token: null}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialstate,
    reducers: {
        login: (state,action)=>{
            state.user={
                id: action.payload.id,
                role: action.payload.role,
                name: action.payload.name
            }
            state.token=action.payload.token
            
        },
        logout: (state,action)=>{
            state.user=null
            state.token=null

        }
        

    }
})

export const selectLoggedInUser = (state) => {
    return state.auth.user
}
export const selectAuthToken = (state) => state.auth.token

export const {login , logout} = authSlice.actions
export const {reducer: authReducer} = authSlice 