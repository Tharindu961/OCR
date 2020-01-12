import React, { Fragment, useState } from 'react';
import axios from 'axios';
//just a comment

const UploadImage = () => {

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [text, setText] = useState("");

    const onChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/user/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const {fileName, filePath} = res.data;
            setUploadedFile({fileName, filePath});
            console.log(res.data.message)
            setText(res.data.message);

        } catch(err) {
            // if(err.response.status === 500) {
            //     console.log('There was a problem with the server');
            // }else {
            //     console.log(err.response.data.msg);
            // }
            console.log("wrong input");
        }
    };

    return (
        <div className="container mt-4" style={{backgroundColor : "#7fb4c7"}}>
            <h4 className="display-4 text-center mb-4">
                <i className="fab fa-react" />React File Upload
            </h4>

            <Fragment>
                <form onSubmit={onSubmit}>
                    <div className="custom-file mb-4">
                        <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                        <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                    </div>
                    <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
                    <h2>{text}</h2>
                </form>
                <div>
                    
                </div>
            </Fragment>
            
        </div>
    )
}

export default UploadImage;