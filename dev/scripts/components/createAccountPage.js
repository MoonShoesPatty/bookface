import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from '../actions/get-user';

class CreateAccountPage extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
			errorMessage: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.pushToFirebase = this.pushToFirebase.bind(this);
		this.createUser = this.createUser.bind(this);
	}

	// Create user form submitted
	async handleSubmit(event) {
		event.preventDefault();
		if (this.state.password === this.state.confirmPassword) {
			let userArray = [];
			// Get list of emails from Firebase
			const emails = await firebase.database().ref().once('value').then(function(snapshot) {
				if (snapshot.val()) {
					userArray = Object.keys(snapshot.val());
				}
			})
			// Compare proposed name against list of existing emails
			if (userArray.map(name => {
				if (name === this.state.email) {
					return true;
				} else {
					return null;
				}
			}).join('')) {
				this.setState({
					errorMessage: `Someone's already got that name`
				})
			} else {
				this.createUser();
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
		})
	}

	// Send information to firebase auth
	createUser() {
		// Add a user for new player
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((data) => {
				this.pushToFirebase(data.uid);
			})
			.catch((error) => {
				this.setState({
					errorMessage: error.message
				})
			});
	}

	pushToFirebase(firebaseUID) {
		console.log('Made it')
		const dbRef = firebase.database().ref(firebaseUID);
		// User info to be pushed
		const userObject = {
			info: {
				email: this.state.email,
				fname: '',
				lname: '',
				location: '',
				imagePreviewUrl: ''
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
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
			errorMessage: ''
		})

		// update user state
		this.props.dispatch(getUser(firebaseUID));

		// navigate to account setup
		window.location = '/settings';
	}

	render() {
		return (
			<main>
				<form action="" onSubmit={this.handleSubmit} className="createForm generalForm">
					<h1 className="moduleTitle"><span>Sign</span>Up</h1>
					<label htmlFor="email" className="createLabel">Email:</label>
					<input type="text" id="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" required className="createInput" />

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

const stateMap = (state) => {
	return {
		currentUser: state.currentUser.user
	};
};

export default connect(stateMap)(CreateAccountPage);
