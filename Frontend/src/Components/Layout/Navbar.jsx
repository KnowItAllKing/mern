import React, { Component } from 'react';
import {
	Navbar,
	NavbarBrand,
	Nav,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

/*
props = {
    isLoggedIn: boolean,
    username: string
};
}
*/
import '../../Styles/Navbar.css';
import { Logout } from '../../Util/Logout';

export class NavBar extends Component {
	state = {
		username: this.props.username,
		isLoggedIn: this.props.isLoggedIn,
		...this.props
	};
	loggedInItems = (
		<>
			<DropdownItem>Profile</DropdownItem>
			<DropdownItem
				onClick={() => Logout(this.state.token, this.state.username)}>
				Logout
			</DropdownItem>
		</>
	);
	notLoggedInItems = (
		<>
			<DropdownItem href='/login'>Login</DropdownItem>
			<DropdownItem href='/signup'>Signup</DropdownItem>
		</>
	);
	render() {
		return (
			<>
				<Navbar color='dark' dark expand='md'>
					<NavbarBrand href='/'>Home</NavbarBrand>
					<Nav className='ml-auto' navbar>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								{this.state.username}
							</DropdownToggle>
							<DropdownMenu right>
								{this.state.isLoggedIn
									? this.loggedInItems
									: this.notLoggedInItems}
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Navbar>
			</>
		);
	}
}
