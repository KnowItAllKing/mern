import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Logout } from '../Util/Logout';

import { NavBar } from './Layout/Navbar';
import { Login } from './Login';
import { Home } from './Home';
import { CheckIsLoggedIn } from '../Util/CheckUser';

export class App extends Component {
	state = {
		token: localStorage.getItem('token'),
		username: localStorage.getItem('username') || 'Account',
		expiration: localStorage.getItem('expiration')
	};
	isLoggedIn = this.state.username !== 'Account';
	async componentDidMount() {
		const { token, username, expiration } = this.state;
		if (expiration <= Date.now()) {
			Logout(token, username, true);
			return this.logoutState();
		}
		if (!(await CheckIsLoggedIn(token, username))) {
			Logout(token, username, true);
			return this.logoutState();
		}
	}
	logoutState = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('expiration');
		this.setState({
			token: null,
			username: 'Account',
			expiration: null
		});
	};

	loginHandler = (token, username, expiration) => {
		this.setState({
			token,
			username,
			expiration
		});
		localStorage.setItem('token', token);
		localStorage.setItem('username', username);
		localStorage.setItem('expiration', expiration);
		window.location.href = '/';
	};
	render() {
		return (
			<>
				<NavBar
					username={this.state.username}
					isLoggedIn={this.isLoggedIn}
					token={this.state.token}
					logoutHandler={this.logoutState}
				/>
				<Route exact path='/' component={Home} />
				<Route
					exact
					path='/login'
					component={() =>
						this.isLoggedIn ? (
							<Home />
						) : (
							<Login
								loginHandler={this.loginHandler}
								logoutHandler={this.logoutState}
							/>
						)
					}
				/>
			</>
		);
	}
}
