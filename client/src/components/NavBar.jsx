import { Link } from "react-router-dom";

function NavBar(){
    return(
        <>
        <nav className="bg-slate-800 text-white p-3">
        <Link to="/" className="m-2">Álláshirdetések</Link>
        <Link to="/Profile" className="m-2">Profilom</Link>
        <Link to="/AddJob" className="m-2">Álláshirdetés hozzáadása</Link>
        <Link to="/Logout" className="m-2">Kijelentkezés</Link>
        <Link to="/Login" className="m-2">Bejelentkezés</Link>
        <Link to="/Register" className="m-2">Kijelentkezés</Link>
        </nav>

</>
    );
}

export default NavBar;