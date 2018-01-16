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
			newPost: '',
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			wallPosts: [],
			newPost: ''
		})
	}

	handleChange(event) {
		this.setState({
			newPost: event.target.value
		});
	}

	render() {
		return (
			<main>
				<form action="" onSubmit={this.handleSubmit} className="loginForm">
					<img src="pj.jpg" alt="Your profile picture" className="userAvatar" />
					<label htmlFor="newPost" className="hiddenLabel">Username:</label>
					<input type="text" id="newPost" name="newPost" onChange={this.handleChange} value={this.state.newPost} placeholder="Username" required className="newPostInput" />

					<label htmlFor="newPost" className="hiddenLabel">Password:</label>
					<input type="text" id="newPost" name="newPost" onChange={this.handleChange} value={this.state.newPost} placeholder="Password" required className="newPostInput" />

					<label htmlFor="newPost" className="hiddenLabel">Confirm Password:</label>
					<input type="text" id="newPost" name="newPost" onChange={this.handleChange} value={this.state.newPost} placeholder="Username" required className="newPostInput" />
				</form>
			</main>
		)
	}
}

export default createAccountPage;