import { useState } from "react";
import { useAddExperienceMutation, useLoginMutation, useRegisterMutation } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoggedInUser } from "../services/auth";
import { store } from "../store";

function Register(){
    const user = useSelector(selectLoggedInUser);
    const [ loginMutate ] = useLoginMutation();
    const [ registerMutate] = useRegisterMutation();
    const [addExperienceMutate] = useAddExperienceMutation();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [role,setRole]=useState('jobseeker');
    const [experience,setExperience] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleExperienceChange = (e) => {
        setExperience(e.target.value)
    }
    const dispatch = useDispatch()
    const addExperiences = async  (exp) =>{
        console.log(exp);
        exp.split("\n").map(async (e)=>
            {
                
                const elem=e.split(";")
                console.log(elem);
                if (elem.length>1) await addExperienceMutate({company: elem[0], title: elem[1], interval:elem[2]})
      }  )
    }
    const handleRegister = async ()=>{

        const register = await registerMutate({email: email, password: password,name: name, role: role}).unwrap()
        console.log(register);
        const result = await loginMutate({email: email, password: password}).unwrap()
        console.log(result);
        dispatch(login({
            id: result.user.id,
            email: result.user.email,
            token: result.accessToken
        }))
        addExperiences(experience)

    }
    return(
        <>
        <div className="m-auto h-1/2 w-1/2">
        {user ? user.id : <div className="text-center">
        <br/>
        Teljes név: <input type="text" onChange={handleNameChange} value={name} className="border border-slate-900 rounded-lg bg-gray-200 m-2"/>
        <br/>
        Email: <input type="text" onChange={handleEmailChange} value={email} className="border border-slate-900 rounded-lg bg-gray-200 m-2"/>
        <br/>
        Jelszó: <input type="password" onChange={handlePasswordChange} value={password} className="border border-slate-900 rounded-lg bg-gray-200 m-2"/>
        <br/>
        Típus: <div>
            <input type="radio" name="jobseeker" value="jobseeker" onChange={handleRoleChange} checked={role=="jobseeker"}/>
            <label htmlFor="jobseeker">Munkavállaló</label>
            <br/>
            <input type="radio" name="company" value="company" onChange={handleRoleChange} checked={role=="company"}/>
            <label htmlFor="company">Cég</label>
        </div>
        {role==="jobseeker" ? <>Tapasztalatok: 
        <br/>
        <textarea onChange={handleExperienceChange} value={experience} className="border border-slate-900 rounded-lg bg-gray-200 m-2"/>
        </>: ''}
        <br/>
        <button onClick={handleRegister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Regisztráció</button>
        </div>}
        </div>
        </>
    );
}

export default Register;