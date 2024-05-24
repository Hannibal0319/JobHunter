import { useState } from 'react';
import { useGetJobsQuery } from '../services/api'
import { useNavigate } from "react-router-dom";


function Jobs(){
    const { data, error, isLoading } = useGetJobsQuery()
    const [search,setSearch] = useState('')
    const [filt,setfilt] = useState(false)
    const [searchMax,setSearchMax] = useState(10000000)
    const [searchMin,setSearchMin] = useState(0)
    const [searchCity,setSearchCity] = useState('')
    const [searchType,setSearchType] = useState('')
    const [searchHome,setSearchHome] = useState(false)
    const [modalVisible,setModalVisible] = useState(false)
    const navigate = useNavigate()

    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }
    const handleFilter = (e) => {
        setModalVisible(!modalVisible)
    }
    const handleHomeChange = (e) => {
        setSearchHome(e.target.value)
    }
    const handleMaxChange = (e) => {
        searchMax(Math.max(e.target.value,searchMin))
    }
    const handleMinChange = (e) => {
        setSearchMin(e.target.value)
        setSearchMax(Math.max(e.target.value,searchMax))
    }
    const handleCityChange = (e) => {
        setSearchCity(e.target.value)
    }
    const handleTypeChange = (e) => {
        setSearchType(e.target.value)
    }
    const handleFilterButton = (e) => {
        setModalVisible(!modalVisible)
        setfilt(true)
    }
    const handleUnfilterButton = (e) => {
        setfilt(false)
    }
    const filtering = (e)=>{
        console.log(e.type, searchType);
        let filtered = e.position.toLowerCase().includes(search) &
         e.city.toLowerCase().includes(searchCity) &
         e.salaryFrom>searchMin & e.salaryTo<searchMax & e.type==searchType & e.homeOffice==searchHome
        return filtered
    }
    const unfiltering = (e)=>{
        return true
    }

    return(
        <div className='w-1/2 m-auto p-2'>
            <dialog open={modalVisible} className='border border-slate-900 rounded-lg w-1/2'>
                <span className='m-2 font-bold text-3xl'>Szűrők</span>
                <br />
                <div className='p-2 text-center '>
                
                Fizetési sáv alja:
                <input type="number" className='border border-slate-900 rounded-lg w-1/4 m-2' 
                value={searchMin}
                onChange={handleMinChange}/>
                <br />
                Fizetési sáv teteje:
                <input type="number" className='border border-slate-900 rounded-lg w-1/4 m-2'
                value={searchMax}
                onChange={handleMaxChange}/>
                <br/>
                Foglalkoztatás típusa
                <select className='border border-slate-500 rounded-lg m-2' value={searchType} onChange={handleTypeChange}>
                    <option value="full-time">full-time</option>
                    <option value="part-time">part-time</option>
                    <option value="internship">internship</option>
                </select>
                <br />
                Település:
                <input type="text" className='border border-slate-900 rounded-lg w-1/4 m-2' value={searchCity} onChange={handleCityChange}/>
                <br/>
                Home Office:
                <input type="checkbox" className=' m-2' value={searchHome} onChange={handleHomeChange}/>
                <br/>
                <button className='boder border-slate-500 text-white bg-blue-600 rounded-lg p-2' onClick={handleFilterButton}>Vissza</button>
                </div>
                
            </dialog>
        <span className='text-xl font-bold mt-1'>Böngéssz az állások között</span>
        <br/>
        <div className='m-auto pt-2'>
            Keresés:
        <input type="text" className='border border-slate-900 rounded-lg w-3/4 m-2' value={search} onChange={handleSearch}/>
        <br />
        <button className=' bg-blue-600 rounded-lg px-2 py-1 text-white' onClick={handleFilter}>Szűrés</button>
        <br />
        <br />
        <button className=' bg-red-600 rounded-lg px-2 py-1 text-white' onClick={handleUnfilterButton}>Szűrés visszavonása</button>

        </div>
        
        <br/>
        Állás neve
        <hr ></hr>
        {isLoading ? 'Loading...' : data?.data.filter(filt ? filtering : unfiltering).map(e=>
            <div key={e.id} className='h-20 p-4 bg-slate-300 rounded-lg my-2' onClick={()=>navigate("/Jobs/"+e.id)}>
                <div className='float-right text-right'>
                <div className='font-bold'>{e.salaryFrom}-{e.salaryTo} Ft</div>
                <div>{e.type}</div>
                </div>
                <div className='font-bold'>{e.position}</div>
                <div>{e.city}</div>
                
                

            </div>
            
        )}
        <hr></hr>
        </div>
    );
}

export default Jobs;