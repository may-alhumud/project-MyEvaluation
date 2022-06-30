import { useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AppContext } from './Contexts/AppContext';
import Sites from './Components/Sites';
import Users from './Components/Users';
import  NotAuth  from './Components/NotAuth';
import Register from './Components/Register';
import Products from './Components/Products';
import SocialAccounts from './Components/SocialAccounts';

function UserRoutes(props) {

  return (<Routes>
    <Route path="/products" exact element={<Products ></Products>} />
    <Route path="/sites" exact element={<Sites ></Sites>} />
    <Route path='/socs' exact element={<SocialAccounts ></SocialAccounts>} />
    <Route path="/users" exact element={props.role == 'ADMIN' ? <Users></Users> : <NotAuth/>}></Route>
    <Route path="/:any" element={<Navigate replace to="/sites" />} />
  </Routes>);
}
function GuestRoutes() {
  return (<Routes>
    <Route path="/login" exact element={<Login />} />
    <Route path="/register" exact element={<Register />} />
    <Route path="/" exact element={<Login />} />
    <Route path="/:any" element={<Navigate replace to="/login" />} />
  </Routes>);
}
function App() {

  const baseUrl = "http://localhost:8080/api/v1";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);


  return (
    <Router>
      <div className="App container">
        <AppContext.Provider value={{ isLoggedIn, setLoggedIn, username, setUsername, baseUrl, role, setRole,userId,setUserId }}>
          <Nav />
          {isLoggedIn ?
            <UserRoutes role={role}></UserRoutes>
            :
           <GuestRoutes></GuestRoutes>
          }

        </AppContext.Provider>
      </div>
    </Router>
  );
}

export default App;
