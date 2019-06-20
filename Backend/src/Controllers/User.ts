import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { TokenToUser } from '../Models/TokenModel';

@Controller('/user/:username')
export class UserController {
	@Get()
	private async getRoot(req: Request, res: Response) {
		const { token, username } = req.body;
		const tu = new TokenToUser(token, username);
		tu.getDetails();
		if (!tu.user)
			return res.json({
				error: 'User does not exist.'
			});
		return res.json({
			success: 'Yay',
			user: tu.user
		});
	}
}
