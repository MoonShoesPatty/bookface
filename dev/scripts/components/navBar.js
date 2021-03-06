import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../actions/get-user';

class NavBar extends React.Component {
	render() {
		return (
			<nav className="navBar">
				<Link to={`/feed/`}>
					<div className="navItem">
						<p>Home</p>
					</div>
				</Link>
				<Link to={`/${this.props.currentUser}/`}>
					<div className="navItem">
						<p>Profile</p>
					</div>
				</Link>
				<Link to={`/settings/`}>
					<div className="navItem">
						<p>Settings</p>
					</div>
				</Link>
			</nav>
		)
	}
}

const stateMap = (state) => {
	return {
		currentUser: state.currentUser.user
	};
};

export default connect(stateMap)(NavBar);