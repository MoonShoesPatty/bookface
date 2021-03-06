import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from '../actions/get-user';

class SettingsPage extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			firstName: '',
			lastName: '',
			location: '',
			avatar: '',
			imagePreviewUrl: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.handlePhotoChange = this.handlePhotoChange.bind(this);
		this.displayPhoto = this.displayPhoto.bind(this);
		
		this.removeChars = this.removeChars.bind(this);
		this.getUserDatabase = this.getUserDatabase.bind(this);
	}

	// On component load, find user information to pre-populate form
	componentDidMount() {
		this.getUserDatabase(this.props.currentUser);
	}

	componentWillReceiveProps(nextProps) {
		this.getUserDatabase(nextProps.currentUser);
	}

	// Create user form submitted
	handleSubmit(event) {
		event.preventDefault();

		// Save user info
		firebase.database().ref(`${this.props.currentUser}/info/fname`).set(this.state.firstName);
		firebase.database().ref(`${this.props.currentUser}/info/lname`).set(this.state.lastName);
		firebase.database().ref(`${this.props.currentUser}/info/location`).set(this.state.location);

		// Save user photo
		if (this.state.avatar) {
			const photoRef = firebase.storage().ref().child(this.props.currentUser);
			console.log(this.state.avatar)
			photoRef.put(this.state.avatar);
		}

		// user feedback
		this.setState({
			saveMessage: 'Saved Changes'
		})
	}

	// Set state on form input change
	handleChange(event) {
		this.setState({
			errorMessage: ''
		})
		this.setState({
			[event.target.name]: this.removeChars(event.target.value)
		})
	}

	getUserDatabase(user) {
		const dbRef = firebase.database().ref(user);
		dbRef.once('value').then((snapshot) => {
			console.log(snapshot.val())
			if (snapshot.val()) {
				this.setState({
					firstName: snapshot.val().info.fname,
					lastName: snapshot.val().info.lname,
					location: snapshot.val().info.location
				})
			}
			const photoRef = firebase.storage().ref().child(user);
			photoRef.getDownloadURL().then((url) => {
				this.setState({
					imagePreviewUrl: url
				})
			})
		});
	}

	// remove special characters - only alphanumeric plus '_'
	removeChars(string) {
		let cleanString = '';
		const regex = /[a-zA-Z0-9_ ]/;
		for (let i = 0; i < string.length; i++) {
			if (regex.test(string[i])) {
				cleanString += string[i];
			} else {
				this.setState({
					errorMessage: 'Sorry, that character is not allowed'
				})
			}
		}
		return cleanString;
	}

	// Set avatar state and preview new image
	//  Shoutout to Brian Emil Hartz on Codepen for help
	handlePhotoChange(event) {
		event.preventDefault();
		console.log(event.target.files)
		if (event.target.files[0].size < 4000000) {
			let file = event.target.files[0];
			this.displayPhoto(file);
		} else {
			this.setState({
				errorMessage: 'Sorry, that file is too big'
			})
		}

	}

	displayPhoto(file) {
		let reader = new FileReader();

		reader.onloadend = () => {
			this.setState({
				avatar: file,
				imagePreviewUrl: reader.result
			});
		}

		reader.readAsDataURL(file);
	}

	render() {
		return (
			<main>
				<form action="" onSubmit={this.handleSubmit} className="settingsForm generalForm">
					<h2 className="settingsTitle"><span>Profile</span>Settings</h2>

					<label htmlFor="firstName" className="settingsLabel">Name:</label>
					<div>
						<input type="text" id="firstName" name="firstName" onChange={this.handleChange} placeholder="First" value={this.state.firstName} className="settingsInput" />
						<input type="text" id="lastName" name="lastName" onChange={this.handleChange} placeholder="Last" value={this.state.lastName} className="settingsInput" />
					</div>

					{this.state.errorMessage === '' ? '' :
						<p className="errorMessage">{this.state.errorMessage}</p>
					}

					<label htmlFor="location" className="settingsLabel">Location:</label>
					<input type="text" id="location" name="location" onChange={this.handleChange} placeholder="Where are you?" value={this.state.location} className="settingsInput" />

					<label htmlFor="location" className="settingsLabel">Photo:</label>
					<input type="file" id="avatar" name="avatar" accept=".jpg, .jpeg, .png" className="settingsInput" onChange={this.handlePhotoChange} />
					
					<img src={this.state.imagePreviewUrl ? this.state.imagePreviewUrl : "../public/assets/userPlaceholderImage.png"} alt="Your new profile photo" className="avatarPreview" />

					<input type="submit" className="settingsButton" value="Save Settings" />

					{this.state.saveMessage ?
						<p className="successMessage">{this.state.saveMessage}</p> : ''
					}

					<h2 className="settingsTitle"><span>Account</span>Settings</h2>

					<Link to="" className="settingsLink" onClick={this.LogOut}>Log Out</Link>
					<Link to="" className="settingsLink" onClick={this.DeleteAccount}>Delete Account</Link>
				</form>
				<p>{this.props.currentUser}</p>
			</main>
		)
	}
}

const stateMap = (state) => {
	return {
		currentUser: state.currentUser.user
	};
};

export default connect(stateMap)(SettingsPage);