import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navBar">
                <Link to={`/`}>
                    <div className="navItem">
                        <p>Home</p>
                    </div>
                </Link>
                <Link to={`/patrick/`}>
                    <div className="navItem">
                        <p>Profile</p>
                    </div>
                </Link>
                <Link to={`/settings/`}>
                    <div className="navItem">
                        <p>Settings</p>
                    </div>
                </Link>
            </nav>
        )
    }
}

export default NavBar;