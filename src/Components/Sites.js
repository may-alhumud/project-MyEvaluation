import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../Contexts/AppContext';
import AddComment from './AddComment';
import AddEditItem from './AddEditItem';

function ItemsTable(props) {

  return (
    <table className='table table-sm table-bordered table-hover tale-stripped'>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>url</th>
          <th>votes</th>
          <th>comments</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map(x =>
          <tr key={x.id}>
            <td>{x.id}</td>
            <td>{x.name}</td>
            <td>{x.url}</td>
            <td> <span className="badge bg-success" >{x.upVotes}</span> -  <span className="badge bg-danger" >{x.downVotes}</span> </td>
            <td><ul>{x.comments.map(z => <li key={z.id}><span className="text-success">{z.comment}</span ><span className="text-info"> | {z.user}</span></li>)}</ul></td>
            <td>
              <button className='btn btn-warning m-1 btn-sm' data-bs-toggle="modal" data-bs-target="#addEditItem" onClick={() => props.editItem(x)}>Edit</button>
              <button className='btn btn-info m-1 btn-sm' onClick={() => props.voteUp(x)}>Vote UP</button>
              <button className='btn btn-danger m-1 btn-sm' onClick={() => props.voteDown(x)}>Vote Down</button>
              <button className='btn btn-primary m-1 btn-sm' data-bs-toggle="modal" data-bs-target="#addCommentModal"  onClick={() => props.editItem(x)}>Add Comment</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

function Sites() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const { baseUrl, userId } = useContext(AppContext);
  const [currentItem, setCurrentItem] = useState({});
  const [vote,setVote] = useState(0);

  useEffect(() => {

    loadItems();

  }, [currentItem]);

  const loadItems = async () => {

    let url = baseUrl + "/website"

    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': true
      }),
      credentials: "include",

    });

    const result = await response.json();
    const status = await response.status;
    if (status == 400) {
      setErrorStatus(true);
      setError(result.message);

    }
    else if (status == 200 || status == 201) {
      setErrorStatus(false);
      setError("");
      setItems(result)

    }
  }

  const voteUp = async (item) => {
    let data = {
      "vote": 1,
      "item": {
        "id": item.id
      },
      "user": {
        "id": userId
      }
    }
    await sendVote(data);
    await loadItems();
  }
  const voteDown = async (item) => {
    let data = {
      "vote": -1,
      "item": {
        "id": item.id
      },
      "user": {
        "id": userId
      }
    }
    await sendVote(data);
    await loadItems();
  }

  const sendVote = async (item) => {
    let url = baseUrl + "/evaluation/add-evaluation";

    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': true
      }),
      credentials: "include",
      body: JSON.stringify(item)
    });
      let res = await response.json();
      
      alert(res.message);


  };
  return (<div className='text-start'>
    <button type="button" className="btn btn-primary align-self-start" data-bs-toggle="modal" data-bs-target="#addEditItem" onClick={() => setCurrentItem({})}>
      New
    </button>
    <AddEditItem item={currentItem} onSave={setCurrentItem} type={'site'} title={'Add/Edit Site'} saveUrl={currentItem.id > 0 ? '/website/update-website/' + currentItem.id : '/website/add-website'} method={currentItem.id > 0 ? 'put' : 'post'} ></AddEditItem>
    <AddComment item={currentItem} onSave={()=>loadItems()}></AddComment>
    <hr />
    {errorStatus ? <div className='alert alert-danger'>{error}</div> : <ItemsTable items={items} editItem={setCurrentItem} voteDown={voteDown} voteUp={voteUp}></ItemsTable>}
     
  </div>

  )
}
export default Sites;
