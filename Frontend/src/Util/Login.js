export const LoginFunc = async (username, password) => {
	const res = await fetch('http://localhost:5000/login', {
		method: 'POST',
		body: JSON.stringify({ username, password }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(x => x.json());
	if (res.error) return false;
	return res;
};
