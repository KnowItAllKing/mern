import { Schema, model, Document } from 'mongoose';
import { TokenType } from '../Types/TokenType';
import { UserType } from '../Types/UserType';
import { UserModel } from './UserModel';

const token = new Schema({
	token: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true
	},
	expiration: {
		type: Number,
		required: true,
		default: Date.now()
	}
});

export const TokenModel = model<TokenDoc>('tokens', token);

interface TokenDoc extends Document, TokenType {}

export class Token {
	public token!: string;
	constructor(private user: UserType) {
		this.user = user;
	}
	public async save() {
		this.token = await this.generateToken();
		const newToken = new TokenModel({
			token: this.token,
			username: this.user.username,
			expiration: Date.now() + 6.048e8
		});
		try {
			return await newToken.save();
		} catch (e) {
			throw e;
		}
	}
	private async generateToken(length = 30) {
		var token: string = this.random(length);
		if (await this.findExisting(token))
			return await this.generateToken(length);
		return token;
	}
	private random(length = 30) {
		const chars =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
		const token: string[] = [];
		for (let i = 0; i < length; i++)
			token.push(chars[Math.floor(Math.random() * chars.length)]);
		return token.join('');
	}
	private async findExisting(token: string): Promise<boolean> {
		const doc = await TokenModel.findOne({ token });
		return Boolean(doc);
	}
}

export class TokenToUser {
	public user?: UserType | null;
	constructor(public token: string, public username: string) {
		this.token = token;
		this.username = this.username;
	}
	public async getDetails() {
		const doc = await UserModel.findOne({ username: this.username });
		this.user = doc;
	}
	public async logout() {
		try {
			var doc = await TokenModel.findOneAndDelete({ token: this.token });
		} catch (e) {
			return false;
		}
		if (!doc) return false;
		return true;
	}
	public async validate() {
		const doc = await TokenModel.findOne({
			token: this.token,
			username: this.username
		});
		return doc || false;
	}
}
