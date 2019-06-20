import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { User } from '../Models/UserModel';

@Controller('signup')
export class SignupController {
	@Post()
	private async postRoot(req: Request, res: Response) {
		const user = new User(req.body);
		console.log(req.body);
		if (await user.validateEach())
			return res.json({
				error: 'Account with that email/username already exists'
			});
		await user.save();
		return res.json({
			success:
				'Account successfully created. You may now use it to login.'
		});
	}
}
