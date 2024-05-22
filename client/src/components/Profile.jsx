import { useSelector } from "react-redux";
import { useGetJobsOfCompanyQuery, useGetUserExperiencesQuery, useGetUserInfoQuery, useRemoveJobMutation } from "../services/api";
import { selectLoggedInUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profile(){
    const navigate = useNavigate();
    
    const user = useSelector(selectLoggedInUser)

    const { data: dataExp,error: errorExp,isLoading: isLoadingExp } = useGetUserExperiencesQuery()
    const { data, error, isLoading } = useGetUserInfoQuery(user?.id)
    const { data: dataJobs,error: errorJobs,isLoading: isLoadingJobs } = useGetJobsOfCompanyQuery(user?.id)
    const [removeJobMutate] = useRemoveJobMutation()
    return(
        <div className="w-5/6 mx-auto">
            
        {!error?.data.message ? <div>
        {user?.role==="jobseeker" ? <>
        <table className="w-full">
            <tbody>
            <tr>
            <td className="w-1/2"><span className="font-bold">Személyes adatok</span><br/>
            Adataid és tapasztalataid egy helyen</td>
            <td><button className="border border-slate-500 rounded-lg p-1 hover:bg-blue-400 hover:text-white">Tapasztalatok szerkesztése</button></td>
            </tr>
            <tr  className="bg-gray-100">
            <td>Név:</td>
            <td>{data?.fullname}</td>
            </tr>
            <tr>
            <td>Email:</td>
            <td>{data?.email}</td>
            </tr>
            <tr className="bg-gray-100">
            <td>Státusz:</td>
            <td>{data?.role ==="jobseeker" ? "Álláskereső" : "Cég"}</td>
            </tr>
            </tbody>
        </table>
        <br/>
        <span className="font-bold">Tapasztalatok:</span>
        <table className="w-full">
             <tbody>
        {dataExp?.data.map(e=>
            
                <tr className="odd:bg-gray-100">
                    <td className="w-1/2">{e.company}</td>
                    <td>{e.interval}   {e.title}</td>
                </tr>
)
        }
         </tbody>
        </table>
        </>
        :
        
        <div className="w-full">
            {dataJobs?.data.map(e=>
            <div className="bg-gray-200 w-full m-3 p-3" key={e.id}>
            <div className="float-right">
                    <button className="border border-slate-300 rounded" onClick={()=>navigate('/EditJob/'+e.id)}>Szerkesztés</button>
                    <button className="border border-slate-300 rounded bg-white">Megtekintés</button>
                    <button className="border border-slate-300 rounded text-white bg-red-600" onClick={()=>{removeJobMutate({id: e.id})}}>Törlés</button>
            </div>
            <div className="font-bold">
                    {e.position}
            </div>
                {e.type}    {e.homeOffice ? 'Remote':'On-site'}   {e.salaryFrom}-{e.salaryTo}
            </div>
            )}
            <div className="text-center">
            <button className="border border-slate-500 p-2 rounded-lg text-white bg-blue-600" onClick={()=>navigate('/AddJob')}>Hozzáadás</button>
            </div>
        </div>
        }</div>:error.data.message}
        </div>
        
    );
}

export default Profile;