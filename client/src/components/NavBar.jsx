import { Link } from "react-router-dom";
import { logout, selectLoggedInUser } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavBar(){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    const handleLogout = () =>{
        dispatch(logout())
        navigate("/")
    }
    return(
        <>
        <nav className="bg-slate-800 text-white p-3">
        <Link to="/" className="m-2">Álláshirdetések</Link>
        {user ? <Link to="/Profile" className="m-2">Profilom</Link> :''}
        {user?.role==="company" ? <Link to="/AddJob" className="m-2">Álláshirdetés hozzáadása</Link>:''}
        {user ? <button onClick={handleLogout}>Kijelentkezés</button>:''}
        {!user ? <Link to="/Login" className="m-2">Bejelentkezés</Link>:''}
        {!user ?<Link to="/Register" className="m-2">Regisztráció</Link>:''}
        </nav>

</>
    );
}

export default NavBar;