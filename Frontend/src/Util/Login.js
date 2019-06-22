import bcrypt from 'bcryptjs';
export const LoginFunc = async (username, password) => {
	const hashed = await bcrypt.hash(password, 10);
	console.log(username, password, hashed);
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
