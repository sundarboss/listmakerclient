import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
    return (
        <header className="nav-main">
            <div className="nav-header">
                <h2 onClick={props.dashboardChange}>List Creator</h2>
            </div>
            <div className="nav-item">
                <ul>
                    <li onClick={props.dashboardChange}>Dashboard</li>
                    <li onClick={props.historyChange}>My History</li>
                    <Link to={'/'} className="logout"><li onClick={props.logout}>Logout</li></Link>
                </ul>
            </div>
        </header>
    )
}

export default Navbar;