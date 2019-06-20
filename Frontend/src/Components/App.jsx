import React, { Component } from 'react';
import { Logout } from '../Util/Logout';

export class App extends Component {
	state = {
		token: localStorage.getItem('token'),
		username: localStorage.getItem('username'),
		expiration: localStorage.getItem('expiration')
	};
	async componentDidMount() {
		const { token, username, expiration } = this.state;
		if (!token || !username || expiration) return;
		if (expiration <= Date.now())
			return Logout(this.state.token, this.state.username);
	}
	render() {
        return (
            <>
            </>
        );
    }
}
