import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from '../../actions/get-user';

class ProfileWall extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <section>
                <p>This is your wall</p>
            </section>
        )
    }
}

const stateMap = (state) => {
    return {
        currentUser: state.currentUser.user
    };
};

export default connect(stateMap)(ProfileWall);