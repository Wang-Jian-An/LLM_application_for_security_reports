import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowAnalysisButton() {
    return (
        <div>
            <Link to="/analysis_report">
                <button type="button" className="btn btn-outline-primary btn-lg button-1">
                    查看分析結果
                </button>
            </Link>
        </div>
    );
};


export default ShowAnalysisButton;