import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from '../actions/get-user';

class SplashPage extends React.Component {
    constructor() {
        super();
        this.state = {
        }
        this.demoLogin = this.demoLogin.bind(this);
    }
    
    demoLogin(event) {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword('pat@pat.com', 'password')
            .then((data) => {
                this.props.dispatch(getUser(data.uid));
                window.location = `/${data.uid}`
            })
    }

    render() {
        return (
            <main className="splashWrapper">
                <h1 className="appTitle"><span>Book</span>Face</h1>
                <p className="appSubtitle"><span>Yes</span>, this is the popular social networking site known as "<span>BookFace</span>"</p>
                <div className="splashButtons">
                    <Link to="/login" className="splashButton"><span>Log</span>in</Link>
                    <a href="" onClick={this.demoLogin} className="splashButton"><span>Demo</span>Account</a>
                    <p>or</p>
                    <Link to="/create" className="splashButton"><span>Sign</span>up</Link>
                </div>
                <p className="splashFooter">Words at the bottom make you look more professional</p>
            </main>
        )
    }
}

const stateMap = (state) => {
    return {
        currentUser: state.currentUser.user
    };
};

export default connect(stateMap)(SplashPage);