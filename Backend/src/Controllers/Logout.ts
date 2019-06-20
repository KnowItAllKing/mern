import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { User } from '../Models/UserModel';
import { TokenToUser } from '../Models/TokenModel';

@Controller('logout')
export class LoginController {
	@Post()
	private async postRoot(req: Request, res: Response) {
		const { token, username } = req.body;
		const tu = new TokenToUser(token, username);
		tu.logout();
		return res.json({
			success: 'You have successfully been logged out.'
		});
	}
}
