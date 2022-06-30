import React, { useState, useContext, useEffect } from "react";
import { AppContext } from '../Contexts/AppContext';


function AddEditItem(props) {
    const [itemId, setItemId] = useState(props.item.id);
    const [name, setName] = useState(props.item.name);
    const [model, setModel] = useState(props.item.model);
    const [platform, setPlatform] = useState(props.item.platform);
    const [url, setUrl] = useState(props.item.url);
    const [error, setError] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [success, setSuccess] = useState("");
    const { baseUrl } = useContext(AppContext);

    useEffect(() => {
        setName(props.item.name);
        setItemId(props.item.id);
        setPlatform(props.item.platform);
        setUrl(props.item.url);
        setModel(props.item.model);
    }, [props.item]);
    const saveItem = async () => {
        let iurl = baseUrl + props.saveUrl;

        var data = {
            id: itemId,
            name: name,
            url: url,
            platform: platform,
            model: model
        };

        const response = await fetch(iurl, {
            method: props.method,
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
        <div className="modal modal-fade text-start" id="addEditItem" tabIndex="-1" aria-labelledby="addEditItemLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">

                        <h5 className="modal-title" id="addEditItemLabel">{props.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group" style={props.type == 'prod' ? { display: 'block' } : { display: 'none' }}>
                            <label>Model</label>
                            <input type="text" className="form-control" id="model" placeholder="Enter model" pattern="[0-9]+" value={model} onChange={(e) => setModel(e.target.value)} />
                        </div>
                        <div className="form-group" style={props.type == 'site' || props.type == 'soc' ? { display: 'block' } : { display: 'none' }}>
                            <label>Url</label>
                            <input type="text" className="form-control" id="url" placeholder="Enter url" value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        <div className="form-group" style={props.type == 'soc' ? { display: 'block' } : { display: 'none' }}>
                            <label>Platform</label>
                            <select id="platform" className="form-control" name="platform" placeholder="Select Platform" onChange={(e) => setPlatform(e.target.value)}>

                                <option value="TWITTER" selected={platform == 'TWITTER'}>Twitter</option>
                                <option value="INSTAGRAM" selected={platform == 'INSTAGRAM'}>Instagram</option>
                                <option value="WHATSAPP" selected={platform == 'WHATSAPP'}>Whatsapp</option>
                                <option value="FACEBOOK" selected={platform == 'FACEBOOK'}>Facebook</option>
                                <option value="TELEGRAM" selected={platform == 'TELEGRAM'}>Telegram</option>
                                <option value="SNAPCHAT" selected={platform == 'SNAPCHAT'}>SnapChat</option>

                            </select>
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

export default AddEditItem;
