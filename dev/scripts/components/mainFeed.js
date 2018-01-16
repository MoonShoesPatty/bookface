import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';

import WallPost from './wallPost.js';

class MainFeed extends React.Component {
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
				<form action="" onSubmit={this.handleSubmit} className="newPostForm">
					<img src="pj.jpg" alt="Your profile picture" className="userAvatar" />
					<label htmlFor="newPost" className="hiddenLabel">Name:</label>
					<textarea type="text" id="newPost" name="newPost" onChange={this.handleChange} value={this.state.newPost} placeholder="What's on your mind?" required className="newPostInput"></textarea>
				</form>
				<WallPost />
				<p>Book<span>Face</span></p>
			</main>
		)
	}
}

export default MainFeed;