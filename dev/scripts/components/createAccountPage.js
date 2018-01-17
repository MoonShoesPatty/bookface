import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';
import firebase from 'firebase';

class createAccountPage extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			comfirmPassword: '',
			firstName: '',
			lastName: '',

		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
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
				<form action="" onSubmit={this.handleSubmit} className="createForm generalForm">
					<h1 className="moduleTitle"><span>Sign</span>Up</h1>
					<label htmlFor="username" className="createLabel">Username:</label>
					<input type="text" id="username" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Username" required className="createInput" />

					<label htmlFor="password" className="createLabel">Password:</label>
					<input type="text" id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" required className="createInput" />

					<label htmlFor="confirmPassword" className="createLabel">Confirm Password:</label>
					<input type="text" id="confirmPassword" name="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword} placeholder="Confirm Password" required className="createInput" />

					<input type="submit" className="createButton" value="Create Account" />
				</form>
			</main>
		)
	}
}

export default createAccountPage;