import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from '../actions/get-user';

import ProfileWall from './profileBody/profileWall';
import ProfileInfo from './profileBody/profileInfo';
import ProfileFriends from './profileBody/profileFriends';

class ProfilePage extends React.Component {
	constructor() {
		super();
		this.state = {
			activeSection: 'Wall'
		}
		this.getUserDatabase = this.getUserDatabase.bind(this);
		this.changeSection = this.changeSection.bind(this);
		this.renderBody = this.renderBody.bind(this);
	}

	componentDidMount() {
		this.getUserDatabase(this.props.currentUser);
	}

	componentWillReceiveProps(nextProps) {
		this.getUserDatabase(nextProps.currentUser);
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

	changeSection(event) {
		event.preventDefault();
		console.log(event.target.text);
		this.setState({
			activeSection: event.target.text
		})
	}
	renderBody(section) {

	}

	render() {
		return (
			<main>
				<header className="profileHeader">
					<div className="profileCover"></div>
					<div className="profileUserInfo">
						<img src={this.state.imagePreviewUrl} alt="" className="profilePhoto" />
						<div className="profileNameContainer">
							<h1 className="profileTitle"><span>{this.state.firstName} </span>{this.state.lastName}</h1>
							<p className="profileLocation">{this.state.location}</p>
						</div>
						<p className="profileDescription">Go ahead, write something about yourself</p>
						<div className="profileLinks">
							<Link to="" className={this.state.activeSection === 'Info' ? 'profileLink active' : 'profileLink'} onClick={this.changeSection}>Info</Link>
							<Link to="" className={this.state.activeSection === 'Wall' ? 'profileLink active' : 'profileLink'} onClick={this.changeSection}>Wall</Link>
							<Link to="" className={this.state.activeSection === 'Friends' ? 'profileLink active' : 'profileLink'} onClick={this.changeSection}>Friends</Link>
						</div>
					</div>
				</header>
				<section className="profileBody">
					<ProfileWall />
					<ProfileInfo />
					<ProfileFriends />
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