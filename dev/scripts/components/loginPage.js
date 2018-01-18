import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';
import firebase from 'firebase';

class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			loginEmail: '',
			loginPassword: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			loginEmail: '',
			loginPassword: ''
		})
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
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
					
					<input type="submit" className="loginButton" value="Login" />
				</form>
			</main>
		)
	}
}

export default LoginPage;