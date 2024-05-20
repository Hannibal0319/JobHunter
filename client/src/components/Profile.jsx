import { useGetUserInfoQuery } from "../services/api";

function Profile(){
    const { data, error, isLoading } = useGetUserInfoQuery(1)
    console.log(data);
    return(
        <>
        Profile
        <br/>
        {data?.email}
        <br/>
        {error?.data.message}
        </>
    );
}

export default Profile;