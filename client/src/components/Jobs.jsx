import { useGetJobsQuery } from '../services/api'
import { useNavigate } from "react-router-dom";


function Jobs(){
    const { data, error, isLoading } = useGetJobsQuery()
    const navigate = useNavigate()
    return(
        <div className='w-1/2 m-auto'>
        Böngéssz az állások között
        <br/>
        <div className='m-auto'>
        <input type="text" className='border border-slate-900 rounded-lg w-3/4'/>
        <button className='mx-1 bg-slate-300 rounded-lg px-2 py-1'>Keresés</button>
        <button className=' bg-blue-600 rounded-lg px-2 py-1 text-white'>Szűrés</button>
        </div>
        
        <br/>
        Állás neve
        <hr ></hr>
        {isLoading ? 'Loading...' : data?.data.map(e=>
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