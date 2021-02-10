import React from 'react';


const Taskitem = (props) => {
    return (
        <li key={props.taskId}>   
        <div className="item-container">
            <div className="item-header">
                <h3>{props.title}</h3>
                <p>{`Created at ${props.created}`}</p>
            </div>
            <div className="item-desc">
                <p>{props.desc}</p>
            </div>
            <div className="item-footer">
                <button className="complete-btn" onClick={props.updateModalOpen.bind(this, props.taskId)}>Task Completed</button>
                <button className="delete-btn" onClick={props.deleteModalOpen.bind(this, props.taskId)}><i class="fas fa-trash"></i>  Delete Task</button>
            </div>
        </div>
        </li>
    )
}

export default Taskitem;