import { useState } from "react";
import { useLoginMutation } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoggedInUser } from "../services/auth";
import { store } from "../store";


function Login(){
    const [ loginMutate ] = useLoginMutation()
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
    const handleLogin = async ()=>{
        const result = await loginMutate({email: email, password: password}).unwrap()
        console.log(result);
        dispatch(login({
            id: result.user.id,
            email: result.user.email,
            token: result.accessToken
        }))
        console.log(store.getState());
    }
    return(
        
        <div className="grid h-1/2 place-items-center">
        {user ? user.id : <>
        <br/>
        Email: <input type="text" onChange={handleEmailChange} value={email} className="border border-slate-900 rounded-lg bg-gray-200 m-2"/>
        Jelszó: <input type="password" onChange={handlePasswordChange} value={password} className="border border-slate-900 rounded-lg bg-gray-200 m-2"/>
        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Bejelentkezés</button></>}
        </div>
    );
}

export default Login;