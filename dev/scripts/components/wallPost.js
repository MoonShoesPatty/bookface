import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';

class WallPost extends React.Component {
	render() {
		return (
			<section className="wallPost">
                <p>I am a wall post hooray.</p>
            </section>
		)
	}
}

export default WallPost;