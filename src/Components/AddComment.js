import React, { useState, useContext, useEffect } from "react";
import { AppContext } from '../Contexts/AppContext';


function AddComment(props) {
    const [itemId, setItemId] = useState(props.item.id);
    const [comment, setComment] = useState(props.item.name);
   
    const [error, setError] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [success, setSuccess] = useState("");
    const { baseUrl,userId } = useContext(AppContext);

    useEffect(() => {
        setComment(props.item.comment);
        setItemId(props.item.id);
      
    }, [props.item]);
    const saveItem = async () => {
        let iurl = baseUrl + "/comment/add-comment";

        let data = {
            "comment": comment,
            "item": {
              "id": itemId
            },
            "user": {
              "id": userId
            }
          };

        const response = await fetch(iurl, {
            method: "POST",
            mode: 'cors',
            headers: new Headers({
                'content-type': 'application/json', 'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': true
            }),
            credentials: 'include',
            body: JSON.stringify(data)
        });
        const result = await response.json();
        const status = await response.status;
        if (status == 400) {
            setErrorStatus(true);
            setError(result.message);
        }
        else if (status == 200 || status == 201) {
            setSuccess(result.message);
            props.onSave(data);
        }
    }


    return (
        <div className="modal modal-fade text-start" id="addCommentModal" tabIndex="-1" aria-labelledby="addCommentItemLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">

                        <h5 className="modal-title" id="addCommentItemLabel">Add Comment</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Comment</label>
                            <input type="text" className="form-control" id="comment" placeholder="Enter comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                        </div>
                       

                        {errorStatus ? <div className="alert alert-danger"> {error} </div> : (success ? <div className="alert alert-success"> {success} </div> : <span></span>)}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={saveItem}>Save</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>

    )




}

export default AddComment;
