import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ErrorMessage.css';


function ErrorMessage() {
    return (
      <div className='errormessage'>
        <p> ERROR: 上傳錯誤格式！請上傳.fasta格式。</p>

      </div>
    );
  };

export default ErrorMessage;