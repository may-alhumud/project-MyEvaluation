import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';


function Register() {

    const { baseUrl } = useContext(AppContext);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    const [error,setError] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [success, setSuccess] = useState(false);
    const register = async () => {

        if(!vaildate()){
            alert("Please fill all the information!!");
            return;
        }
        setErrorStatus(false);
        setError("");
        setSuccess(false);

        let data = {
            "username": user,
            "password": password,
            "role": type
        }
        let url = baseUrl + "/user/register"

        
        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            headers:new Headers({'content-type': 'application/json','Access-Control-Allow-Origin':"*",
            'Access-Control-Allow-Credentials':true}),
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const result =  await response.json();
        const status = await response.status;
        if(status == 400)
        {
                setErrorStatus(true);
                setError(result.message);
                setSuccess(false);
        }
        else if(status == 200 || status == 201)
        {
            setErrorStatus(false);
            setError("");
            setSuccess(true);
        }
        


    };

    const vaildate = () => {
        if(!user || !user.length){
            return false;
        }
        if(!password || !password.length ){
            return false;
        }
        return true;
    };

    return (
        <div className="d-flex flex-col justify-content-center align-items-center min-vh-100 fw-bold">
            <div className='col-3 bg-light p-3 '>
                <h4 className='fw-bold'>Create new account.</h4>
                <hr />
                <span className='text-danger' style={errorStatus ? {display:'block'}: {display:'none'}}>
                    Failed to register new user ({error})
                </span>
                <span className='text-success' style={success ? {display:'block'}: {display:'none'}}>
                    User successfully registered!.
                </span>
                
                <div className="form-group my-2 text-start">
                    <label className='my-2 '>Username:</label>
                    <input type={'text'} name="username" placeholder="Enter user name"
                        className='form-control' onChange={(e) => setUser(e.target.value)} />
                </div>
                <div className="form-group my-2 text-start">
                    <label className='my-2 '>Password:</label>
                    <input type={'password'} name="password" placeholder="Enter password"
                        className='form-control' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group my-2 text-start">
                    <label className='my-2 mx-2'>User:</label>
                    <input type={'radio'} name="type" placeholder="Enter password" value="USER"
                        className='form-control-radio mx-2' onChange={(e) => setType('USER')} />
                    <label className='my-2 mx-2'>Admin:</label>
                    <input type={'radio'} name="type" placeholder="Enter password" value="ADMIN"
                        className='form-control-radio mx-2' onChange={(e) => setType('ADMIN')} />
                </div>

                <div className='form-group my-4'>
                    <button type='button' className='btn btn-primary w-100 fw-bold' onClick={register}>Register</button>

                    <Link to={'/login'} className="nav-link text-info mt-3"> Already have account ?</Link>
                </div>
            </div>

        </div>
    )
}

export default Register;