import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { TokenToUser } from '../Models/TokenModel';
import { toUnicode } from 'punycode';

@Controller('user')
export class UserController {
	@Get('/:username')
	private async getUsername(req: Request, res: Response) {
		const { token } = req.query;
		const { username } = req.params;
		const tu = new TokenToUser(token, username);
		await tu.getDetails();
		if (!tu.user) return res.json({ error: 'User does not exist.' });
		return res.json({
			success: 'Yay',
			user: tu.user
		});
	}
	@Post('validate')
	private async postUsername(req: Request, res: Response) {
		const { token, username } = req.body;
		const user = new TokenToUser(token, username);
		const v = await user.validate();
		if (!v) return res.json({ error: 'You are not logged in.' });
		return res.json({
			success: 'Welcome back, ' + username,
			user
		});
	}
}
