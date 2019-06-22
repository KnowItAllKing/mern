import React, { Component } from 'react';

import { Form, Label, Col, Input, FormGroup, Button, Alert } from 'reactstrap';
import { LoginFunc } from '../Util/Login';

export class Login extends Component {
	state = {
		username: '',
		password: '',
		invalid: false
	};
	onUsernameChange = e =>
		this.setState({
			username: e.target.value,
			password: this.state.password
		});
	onPasswordChange = e =>
		this.setState({
			username: this.state.username,
			password: e.target.value
		});
	onSubmit = async () => {
		const res = await LoginFunc(this.state.username, this.state.password);
		if (!res)
			return this.setState({ username: '', password: '', invalid: true });
		this.props.loginHandler(res.token, res.username, res.expiration);
	};
	render() {
		return (
			<>
				{this.state.invalid && (
					<Alert>Invalid username/password. Try again.</Alert>
				)}
				<Form>
					<FormGroup row>
						<Label for='Username' sm={2}>
							Username
						</Label>
						<Col sm={10}>
							<Input
								type='username'
								name='username'
								id='Username'
								onChange={this.onUsernameChange}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for='Password' sm={2}>
							Password
						</Label>
						<Col sm={10}>
							<Input
								type='password'
								name='password'
								id='Password'
								onChange={this.onPasswordChange}
							/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col sm={10}>
							<Button onClick={this.onSubmit}>Submit</Button>
						</Col>
					</FormGroup>
				</Form>
			</>
		);
	}
}
