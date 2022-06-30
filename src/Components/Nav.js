import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';

function LoggedIn() {
    const { username, setLoggedIn } = useContext(AppContext);
    return (
        <nav className="navbar navbar-expand-lg bg-light mb-4">
            <div className="container-fluid">
                <Link to={'/sites'} className="navbar-brand">EvaluationJs</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-between mx-4" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">

                            <Link to={'/sites'} className="nav-link ">Sites</Link>
                        </li>
                        <li className="nav-item">

                            <Link to={'/products'} className="nav-link ">Products</Link>
                        </li>
                        <li className="nav-item">

                            <Link to={'/socs'} className="nav-link ">Social Accounts</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/users'} className="nav-link ">Users</Link>
                        </li>

                    </ul>
                    <ul className="navbar-nav  mb-2 mb-lg-0" >
                        <li className="nav-item">
                            <span>Welcome {username} </span>
                            <Link to={'/login'} className="nav-link d-inline" onClick={() => setLoggedIn(false)}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
function NotLoggedIn() {
    return (
        <div className='text-center text-info'>Not LoggedIn</div>
    )
}
function Nav() {

    const { isLoggedIn } = useContext(AppContext);

    return (
        <div>
            {isLoggedIn ? <LoggedIn></LoggedIn> : <NotLoggedIn></NotLoggedIn>}

        </div>

    )
}

export default Nav;