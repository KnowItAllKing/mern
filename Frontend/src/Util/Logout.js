export const Logout = (token, username, forced) =>
	fetch('http://localhost:5000/logout', {
		method: 'POST',
		body: JSON.stringify({ username, token }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(res => res.json())
		.then(() => {
			if (!forced) window.location.href = '/';
		});
