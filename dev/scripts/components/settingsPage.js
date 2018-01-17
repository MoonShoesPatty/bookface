import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import firebase from 'firebase';

class SettingsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            location: '',
            avatar: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Create user form submitted
    handleSubmit(event) {
        event.preventDefault();
    }

    // Set state on form input change
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Set avatar state and preview new image
    //  Shoutout to Brian Emil Hartz on Codepen for help
    handlePhotoChange(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

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

                    <label htmlFor="location" className="settingsLabel">Location:</label>
                    <input type="text" id="location" name="location" onChange={this.handleChange} placeholder="Where are you?" value={this.state.location} className="settingsInput" />

                    <label htmlFor="location" className="settingsLabel">Photo:</label>
                    <input type="file" id="avatar" name="avatar" accept=".jpg, .jpeg, .png" className="settingsInput" onChange={this.handlePhotoChange} />
                    
                    <img src={this.state.imagePreviewUrl ? this.state.imagePreviewUrl : './assets/userPlaceholderImage.png'} alt="Your new profile photo" className="avatarPreview" />

                    <h2 className="settingsTitle"><span>Account</span>Settings</h2>

                    <input type="submit" className="createButton" value="Delete Account" />
                </form>
            </main>
        )
    }
}

export default SettingsPage;