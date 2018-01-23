import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from '../actions/get-user';

class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			loginEmail: '',
			loginPassword: '',
			errorMessage: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.propsToRedux = this.propsToRedux.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		firebase.auth().signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword)
			.then((data) => {
				this.propsToRedux(data.uid);
				this.setState({
					loginEmail: '',
					loginPassword: '',
					currentUser: data.uid
				})
			})
			.catch((error) => {
				this.setState({
					errorMessage: error.message
				})
			});
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	propsToRedux(data) {
		this.props.dispatch(getUser(data));
	}

	render() {
		return (
			<main>
				<form action="" onSubmit={this.handleSubmit} className="loginForm generalForm">
					<img src="../pj.jpg" alt="Your profile picture" className="loginAvatar" />
					
					<label htmlFor="loginEmail" className="loginLabel">Email:</label>
					<input type="text" id="loginEmail" name="loginEmail" onChange={this.handleChange} value={this.state.loginEmail} placeholder="Email" required className="loginInput" />

					<label htmlFor="loginPassword" className="loginLabel">Password:</label>
					<input type="password" id="loginPassword" name="loginPassword" onChange={this.handleChange} value={this.state.loginPassword} placeholder="Password" required className="loginInput" />
					
					{this.state.errorMessage === '' ? '' :
						<p className="errorMessage">{this.state.errorMessage}</p>
					}

					<input type="submit" className="loginButton" value="Login" />
				</form>
			</main>
		)
	}
}

const stateMap = (state) => {
	console.log('state: ', state);
	return {
		currentUser: state.userReducer.user
	};
};

export default connect(stateMap)(LoginPage);