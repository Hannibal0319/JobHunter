import NavBar from "./components/NavBar"
import { Route,Routes } from 'react-router-dom';
import Profile from "./components/Profile";
import Jobs from "./components/Jobs";
import AddJob from "./components/AddJob";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import { store } from "./store";
import {Provider} from "react-redux"
function App() {
  return(
    <>
    <Provider store={store}>
    <NavBar />
    <Routes>        
      <Route path="/"  index element={<Jobs/>} />
      <Route path="/Profile"  element={<Profile />}/>
      <Route path="/AddJob"  element={<AddJob/>} />
      <Route path="/Logout"  element={<Logout />}/>
      <Route path="/Login"  element={<Login />}/>
      <Route path="/Register"  element={<Register />}/>
    </Routes>
    </Provider>
    </>
  )
}

export default App
