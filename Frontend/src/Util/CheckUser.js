export const CheckIsLoggedIn = async (token, username) => {
	const body = await fetch('http://localhost:5000/user/validate', {
		method: 'POST',
		body: JSON.stringify({ token, username }),
		headers: { 'Content-Type': 'application/json' }
	}).then(res => res.json());
	return body.error ? false : body;
};
