import { useGetJobsQuery } from '../services/api'


function Jobs(){
    const { data, error, isLoading } = useGetJobsQuery()
    return(
        <>
        Jobs
        {isLoading ? 'Loading...' : data?.data.map(e=>
            <div key={e.id}>

                <div>{e.company}</div>{e.position}

            </div>
        )}
        </>
    );
}

export default Jobs;