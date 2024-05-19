import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CorrectMessage(props) {

    const { uploadProgress } = props;

    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" 
                 role="progressbar" 
                 aria-valuenow={uploadProgress}
                 aria-valuemin={0}
                 aria-valuemax={100}
                 style={{ width: `${uploadProgress}%` }}
            ></div>
        </div>
    );
  };
export default CorrectMessage;