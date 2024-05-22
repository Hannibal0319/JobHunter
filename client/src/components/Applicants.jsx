import { useParams } from "react-router-dom";
import { useGetApplicantsForJobQuery } from "../services/api";

const Applicants = () =>{
    const {id}=useParams()

    const { data, error, isLoading } = useGetApplicantsForJobQuery(id)
    console.log(data);
    return(
        <>
        
        <div className="font-bold w-full text-center text-3xl">
            Jelentkezők:<br/><hr/>
        {data?.map(e=><>{e.user.fullname}<br/></>)}
        </div>
        </>
    );
}

export default Applicants