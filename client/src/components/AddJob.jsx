import { useState } from "react";
import { useAddJobMutation } from "../services/api";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

function AddJob(){
    const navigate = useNavigate()
    const [addJobMutate] = useAddJobMutation()
    const [name,setName]=useState('')
    const [position,setPosition]=useState('')
    const [description,setDescription]=useState('')
    const [minSalary,setMinSalary]=useState(0)
    const [maxSalary,setMaxSalary]=useState(0)
    const [type,setType]=useState('full-time')
    const [city,setCity]=useState('')
    const [homeOffice,setHomeOffice]=useState(false)
    const user = useSelector(selectLoggedInUser);

    const handleTypeChange = (e) =>{
        setType(e.target.value)
    }
    const handlePositionChange = (e) =>{
        setPosition(e.target.value)

    }
    const handleNameChange = (e) =>{
        setName(e.target.value)
    }
    const handleCityChange = (e) =>{
        setCity(e.target.value)
    }
    const handleHomeOfficeChange = (e) =>{
        setHomeOffice(e.target.value)
    }
    const handleSalaryFromChange = (e) =>{
        setMinSalary(e.target.value)
        setMaxSalary(Math.max(e.target.value,maxSalary))
    }
    const handleSalaryToChange = (e) =>{
        setMaxSalary(Math.max(e.target.value,minSalary))
    }
    const handleDescriptionChange = (e) =>{
        setDescription(e.target.value)
    }    
    const handleAddJob = async (e) =>{
        const result = await addJobMutate({
            id: user?.id,
            name: name, 
            position: position,
            description: description,
            salaryFrom: minSalary,
            salaryTo: maxSalary,
            type: type,
            city: city,
            homeOffice: homeOffice
        })
        navigate("/")
    } 

    return(
        <div className="w-full text-center m-3">
            Név:<br/>
        <input type="text" className="border border-slate-500 rounded-lg" onChange={handleNameChange} value={name}/><br/>
        Pozíció:<br/>
        <input type="text" className="border border-slate-500 rounded-lg" onChange={handlePositionChange} value={position}/><br/>
        Leírás:<br/>
        <input type="text" className="border border-slate-500 rounded-lg" onChange={handleDescriptionChange} value={description}/><br/>
        Fizetési minimum:<br/>
        <input type="range" min={0} max={10000000} className="border border-slate-500 rounded-lg" onChange={handleSalaryFromChange} value={minSalary}/><br/>
        Fizetési maximum:<br/>
        <input type="range" min={0} max={10000000} className="border border-slate-500 rounded-lg" onChange={handleSalaryToChange} value={maxSalary}/><br/>
        Foglalkoztatás típusa:<br/>
        <div>
            <input type="radio" name="full-time" value="full-time" onChange={handleTypeChange} checked={type=="full-time"}/>
            <label htmlFor="jobseeker">full-time</label>
            <br/>
            <input type="radio" name="part-time" value="part-time" onChange={handleTypeChange} checked={type=="part-time"}/>
            <label htmlFor="part-time">part-time</label>
        </div><br/>
        Település:<br/>
        <input type="text" className="border border-slate-500 rounded-lg" onChange={handleCityChange} value={city}/><br/>
        {"Home Office: "} 
        <input type="checkbox" onChange={handleHomeOfficeChange} value={homeOffice}/><br/>
        <button className="border m-3 text-white border-slate-500 rounded-lg p-2 bg-blue-600" onClick={handleAddJob}> Hozzáad</button>
        </div>
    );
}

export default AddJob;