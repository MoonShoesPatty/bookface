// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
	BrowserRouter as Router,
	Route, Link, Switch, BrowserHistory
} from 'react-router-dom';
import { connect } from 'react-redux';
// custom components
import NavBar from './navBar.js';
import MainFeed from './mainFeed.js';
import LoginPage from './loginPage.js';
import SplashPage from './splashPage.js';
import ProfilePage from './profilePage.js';
import CreateAccountPage from './CreateAccountPage.js';
import SettingsPage from './settingsPage.js';
// redux actions
import { getUser } from '../actions/get-user';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBwadNElhUCzZkNZr4JHajel4A0h3WYyY0",
	authDomain: "bookface-69d38.firebaseapp.com",
	databaseURL: "https://bookface-69d38.firebaseio.com",
	projectId: "bookface-69d38",
	storageBucket: "bookface-69d38.appspot.com",
	messagingSenderId: "138274614162"
};
firebase.initializeApp(config);

class MainApp extends React.Component {
	// On component load, find which (if any) user is logged in
	async componentDidMount() {
		await firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.dispatch(getUser(user.uid))
			} else {
				this.setState({
					currentUser: null
				})
			}
		})
	}

	render() {
		return (
			<Router history={BrowserHistory}>
				<div>
					<NavBar />
					<Switch>
						<Route exact path='/' component={SplashPage}></Route>
						<Route exact path='/feed' component={MainFeed}></Route>
						<Route exact path='/settings' component={SettingsPage}></Route>
						<Route exact path='/create' component={CreateAccountPage}></Route>
						<Route exact path='/login' component={LoginPage}></Route>
						<Route exact path='/:userid' component={ProfilePage}></Route>
					</Switch>
					<div className="devName">{this.props.currentUser}</div>
				</div>
			</Router>
		)
	}
}

const stateMap = (state) => {
	return {
		currentUser: state.currentUser.user
	};
};

export default connect(stateMap)(MainApp);
