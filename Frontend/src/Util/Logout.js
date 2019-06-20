import { Redirect } from 'react-router-dom';
export const Logout = (token, username) => {
	fetch('http://localhost:5000/logout', {
		method: 'POST',
		body: { username, token }
	});
	return <Redirect to='/' />;
};
