import { useParams } from "react-router-dom";
import { useGetOneJobQuery } from "../services/api";


function JobDetails(){
    const {id}=useParams()
    const { data, error, isLoading } = useGetOneJobQuery(id)
    console.log(data);

    return(
        < div className="w-1/2 mx-auto">
        {!error?.data.message ?
        
        <table className="w-full">
            <tbody>
                <tr>
                    <td>Állás részletei</td>
                    <td><button className="border border-slate-500 bg-slate-200 rounded-lg p-1 hover:bg-blue-600 hover:text-white">Jelentkezés</button></td>
                </tr>
                <tr className="even:bg-gray-100">
                    <td className="w-1/2">Név:</td>
                    <td>{data?.company}</td>
                </tr>
                <tr>
                    <td>Pozíció:</td>
                    <td>{data?.position}</td>
                </tr>
                <tr className="even:bg-gray-100">
                    <td>Leírás:</td>
                    <td>{data?.description}</td>
                </tr>
                <tr>
                    <td>Fizetési sáv:</td>
                    <td>{data?.salaryFrom} - {data?.salaryTo}</td>
                </tr>
                <tr className="even:bg-gray-100">
                    <td>Foglalkoztatás típusa:</td>
                    <td>{data?.type}</td>
                </tr>
                <tr>
                    <td>Település</td>
                    <td>{data?.city}</td>
                </tr>
                <tr className="even:bg-gray-100">
                    <td>Home Office</td>
                    <td>{data?.homeOffice ? 'Van':'Nincs'}</td>
                </tr>
            </tbody>
        </table> : error.data.message}
        </div>
    );
}

export default JobDetails;