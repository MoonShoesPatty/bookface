// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
	BrowserRouter as Router,
	Route, Link, Switch, BrowserHistory
} from 'react-router-dom';
// Import custom components
import NavBar from './components/navBar.js';
import MainFeed from './components/mainFeed.js';
import LoginPage from './components/loginPage.js';
import SplashPage from './components/splashPage.js';
import ProfilePage from './components/profilePage.js';
import SettingsPage from './components/settingsPage.js';
import CreateAccountPage from './components/CreateAccountPage.js';

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

class App extends React.Component {
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
						<Route exact path='/:username' component={ProfilePage}></Route>
					</Switch>
				</div>
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
