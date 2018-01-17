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
			confirmPassword: '',
			firstName: '',
			lastName: '',
			errorMessage: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.pushToFirebase = this.pushToFirebase.bind(this);
	}

	// Create user form submitted
	async handleSubmit(event) {
		event.preventDefault();
		if (this.state.password === this.state.confirmPassword) {
			let userArray = [];
			// Get list of usernames from Firebase
			const usernames = await firebase.database().ref().once('value').then(function(snapshot) {
				userArray = Object.keys(snapshot.val());
			})
			// Compare proposed name against list of existing usernames
			if (userArray.map(name => {
				if (name === this.state.username) {
					return true;
				} else {
					return null;
				}
			}).join('')) {
				this.setState({
					errorMessage: `Someone's already got that name`
				})
			} else {
				// push to firebase if the name is unique
				this.pushToFirebase();
				// navigate to account setup
				window.location = '/settings';
			}

		} else {
			this.setState({
				errorMessage: `Whoops! Your passwords don't match`
			})
		}
	}

	// User action: type in any input
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value.toLowerCase(),
			errorMessage: ''
		});
	}

	// Send information to firebase auth
	// pushToFirebase() {
	// 	// Add a user for new player
	// 	firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
	// 		.then((data) => {
	// 			this.createUser(data.uid);
	// 		})
	// 		.catch((error) => {
	// 			alert(error.message)
	// 		})
	// }

	pushToFirebase() {
		const dbRef = firebase.database().ref(this.state.username);
		// User info to be pushed
		const userObject = {
			info: {
				name: this.state.username,
				pass: this.state.password,
				fname: '',
				lname: '',
				location: ''
			},
			wall: {
				userPosts: {
					0: 'none'
				},
				friendPosts: {
					0: 'none'
				}
			},
			friends: {
				0: 'none'
			}
		}
		dbRef.set(userObject);
		this.setState({
			username: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
			errorMessage: ''
		})
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

					{this.state.errorMessage === '' ? '' :
						<p className="errorMessage">{this.state.errorMessage}</p>
					}

					<input type="submit" className="createButton" value="Create Account" />
				</form>
			</main>
		)
	}
}

export default createAccountPage;