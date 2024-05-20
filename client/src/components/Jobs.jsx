import { useGetJobsQuery } from '../services/api'


function Jobs(){
    const { data, error, isLoading } = useGetJobsQuery()
    console.log(data);
    return(
        <div className='w-1/2 m-auto'>
        Böngéssz az állások között
        <br/>
        <div className='m-auto'>
        <input type="text" className='border border-slate-900 rounded-lg w-3/4'/>
        <button className='mx-1 bg-slate-300 rounded-lg px-2 py-1'>Keresés</button>
        <button className=' bg-blue-600 rounded-lg px-2 py-1'>Szűrés</button>
        </div>
        
        <br/>
        Állás neve
        <hr ></hr>
        {isLoading ? 'Loading...' : data?.data.map(e=>
            <div key={e.id} className='p-2 bg-slate-300 rounded-lg my-2'>
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