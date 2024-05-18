import { useState } from "react";
import { useLoginMutation } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoggedInUser } from "../services/auth";


function Login(){
    const { data, error, isLoading } = useLoginMutation()
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    console.log(user);
    const handleLogin = (e)=>{
        dispatch(login({
            email: email,
            password: password
        }))
    }
    return(
        
        <div>

        Jelenetkezz be<br/>
        Email: <input type="text" onChange={handleEmailChange} value={email} className="border border-slate-900 rounded-lg bg-gray-200 m-2"/><br/>
        Jelszó: <input type="password" onChange={handlePasswordChange} value={password} className="border border-slate-900 rounded-lg bg-gray-200 m-2"/><br/>
        <button onClick={handleLogin}>Bejelentkezés</button>
        </div>
    );
}

export default Login;