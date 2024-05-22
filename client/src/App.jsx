import NavBar from "./components/NavBar"
import { Route,Routes } from 'react-router-dom';
import Profile from "./components/Profile";
import Jobs from "./components/Jobs";
import AddJob from "./components/AddJob";
import Login from "./components/Login";
import Register from "./components/Register";
import { store } from "./store";
import {Provider} from "react-redux"
import JobDetails from "./components/JobDetails";
import EditJob from "./components/EditJob";
import NoMatch from "./components/NoMatch";
function App() {
  return(
    <>
    <Provider store={store}>
    <NavBar />
    <Routes>        
      <Route path="/"  index element={<Jobs/>} />
      <Route path="/Profile"  element={<Profile />}/>
      <Route path="/AddJob"  element={<AddJob/>} />
      <Route path="/EditJob/:id"  element={<EditJob/>} />
      
      <Route path="/Login"  element={<Login />}/>
      <Route path="/Register"  element={<Register />}/>
      <Route path="/Jobs/:id"  element={<JobDetails/>}/>

      <Route path="*"  element={<NoMatch/>} />
    </Routes>
    </Provider>
    </>
  )
}

export default App
