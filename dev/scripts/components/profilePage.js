import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from '../actions/get-user';

class ProfilePage extends React.Component {
	constructor() {
		super();
		this.state = {}
	}

	componentDidMount() {
		const dbRef = firebase.database().ref(`/${this.props.currentUser}/`);
		dbRef.once('value').then((snapshot) => {
			console.log(snapshot.val())
			if (snapshot.val()) {
				this.setState({
					firstName: snapshot.val().info.fname,
					lastName: snapshot.val().info.lname,
					location: snapshot.val().info.location,
					imagePreviewUrl: (snapshot.val().info.imagePreviewUrl !== '' ? snapshot.val().info.imagePreviewUrl : '../public/assets/userPlaceholderImage.png')
				})
			}
		});
	}

	render() {
		return (
			<main>
				<header className="profileHeader">
					<div className="coverImage">

					</div>
					<img src="" alt="" />
					<div className="profileUserInfo">
						<h1 className="ProfileTitle"><span>{this.state.firstName}</span>{this.state.lastName}</h1>
					</div>
				</header>
				<section className="profileBody">
					
				</section>
			</main>
		)
	}
}



const stateMap = (state) => {
	return {
		currentUser: state.currentUser.user
	};
};

export default connect(stateMap)(ProfilePage);