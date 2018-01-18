import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

class SplashPage extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }
    
    render() {
        return (
            <main className="splashWrapper">
                <h1 className="appTitle"><span>Book</span>Face</h1>
                <p className="appSubtitle"><span>Yes</span>, this is the popular social networking site known as "<span>BookFace</span>"</p>
                <form action="" className="splashForm">
                    <input type="submit" className="splashButton" value="Login" />
                    <p>or</p>
                    <input type="submit" className="splashButton" value="Sign Up" />
                </form>
                <p className="splashFooter">Words at the bottom make you look more professional</p>
            </main>
        )
    }
}

export default SplashPage;