import React from 'react';
import './Finished.css';

const Finished = (props) => {
    return (
        <li key={props.taskId}>
        <div className="finished-container">
            <div className="finished-header">
                <h3>{props.title}</h3>
                <div className="finished-dates">
                    <p>{`Created at ${props.created}`}</p>
                    <p>{`Completed at ${props.completed}`}</p>
                </div> 
            </div>
            <div className="finished-desc">
                <p>{props.desc}</p>
            </div>
        </div>
        </li>
    )
}

export default Finished;