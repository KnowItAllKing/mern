import { Schema, model, Document } from 'mongoose';
import { UserType } from '../Types/UserType';
import { TokenType } from '../Types/TokenType';
import { Token, TokenModel } from './TokenModel';

const user = new Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: { type: String, required: true }
});

export const UserModel = model<UserDoc>('users', user);

interface UserDoc extends Document, UserType {}

export class User {
	constructor(private user: UserType) {
		this.user = user;
	}
	public async validate(): Promise<Boolean> {
		const doc = await UserModel.findOne(this.user);
		if (!doc) return false;
		return true;
	}
	public async validateEach(): Promise<Boolean> {
		const { username, email } = this.user;
		const bool =
			(await UserModel.findOne({ username })) ||
			(await UserModel.findOne({ email }));
		return Boolean(bool);
	}
	public login(): Promise<TokenType> {
		const token = new Token(this.user);
		return token.save();
	}

	public async save() {
		const newUser = new UserModel(this.user);
		try {
			return await newUser.save();
		} catch (e) {
			throw e;
		}
	}
}
