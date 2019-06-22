import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { User } from '../Models/UserModel';

@Controller('login')
export class LoginController {
	@Post()
	private async postRoot(req: Request, res: Response) {
		const user = new User(req.body);
		if (!user.compare())
			return res.json({ error: 'Invalid username/email/password.' });

		const payload = await user.login();
		return res.json(payload);
	}
}
