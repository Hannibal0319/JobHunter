import { useSelector } from "react-redux";
import { useGetUserExperiencesQuery, useGetUserInfoQuery } from "../services/api";
import { selectLoggedInUser } from "../services/auth";

function Profile(){
    const user = useSelector(selectLoggedInUser)
    const { data: dataExp,error: errorExp,isLoading: isLoadingExp } = useGetUserExperiencesQuery()
    const { data, error, isLoading } = useGetUserInfoQuery(user?.id)
    console.log(dataExp);
    return(
        <div className="w-1/2 mx-auto">
        {!error?.data.message ? <div className="">
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

        </div>:error.data.message}
        </div>
        
    );
}

export default Profile;