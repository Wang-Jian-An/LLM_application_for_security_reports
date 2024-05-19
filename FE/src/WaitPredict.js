import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function WaitPredict(props) {

    const { ButtonClicked } = props;

    if (ButtonClicked === true) { 
    return (
        <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        </div>
    );
    } else {
        return (
            <div></div>
        )
    }
  };
export default WaitPredict;