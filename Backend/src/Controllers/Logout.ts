import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { TokenToUser } from '../Models/TokenModel';

@Controller('logout')
export class LogoutController {
	@Post()
	private async postRoot(req: Request, res: Response) {
		const { token, username } = req.body;
		const tu = new TokenToUser(token, username);
		const p = await tu.logout();
		if (!p)
			return res.json({
				error: 'You could not be logged out.'
			});
		return res.json({
			success: 'You have successfully been logged out.'
		});
	}
}
