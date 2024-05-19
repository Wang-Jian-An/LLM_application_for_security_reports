import React from "react";
import './InputBar.css';

const InputTask = () => {
    return (
        <div>
            <div className="inputTaskTitle">
                <textarea type="text" className="taskTitle" placeholder="Type Something Here…" />
            </div>
        </div>
    );
}

export default InputTask;
