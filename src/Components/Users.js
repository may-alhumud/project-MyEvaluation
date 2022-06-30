import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../Contexts/AppContext';

function UserTable(props) {

  return (
    <table className='table table-sm table-bordered table-hover tale-stripped'>
      <thead>
        <tr>
          <th>Username</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(x =>
          <tr key={x.id}>
            <td>{x.name}</td>
            <td>{x.role}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const { baseUrl } = useContext(AppContext);

  useEffect(() => {
    if (!(users && users.length)) {
      loadUsers();
    }
  },[]);
  
  const loadUsers = async () => {

    let url = baseUrl + "/user"
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: new Headers({ 
        'content-type': 'application/json',
       'Access-Control-Allow-Origin': "*",
       'Access-Control-Allow-Credentials':true}),
      credentials: "include",

    });

    const result = await response.json(); // parses JSON response into native JavaScript objects
    const status = await response.status;
    if (status == 400) {
      setErrorStatus(true);
      setError(result.message);

    }
    else if (status == 200 || status == 201) {
      setErrorStatus(false);
      setError("");
      setUsers(result)

    }
  }
  return (
    errorStatus ? <div>{error}</div> : <UserTable users={users}></UserTable>
  )
}

export default Users;