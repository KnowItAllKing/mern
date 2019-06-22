import { json, urlencoded } from 'body-parser';
import { connect } from 'mongoose';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { LoginController } from './Controllers/Login';
import { SignupController } from './Controllers/Signup';
import cors from 'cors';
import { LogoutController } from './Controllers/Logout';
import { UserController } from './Controllers/User';

export class MERN extends Server {
	constructor() {
		super(process.env.NODE_ENV === 'development');
		this.app.use(json());
		this.app.use(urlencoded({ extended: true }));
		this.app.use(cors());
		this.setupControllers();
	}
	private setupControllers() {
		const loginController = new LoginController();
		const signupController = new SignupController();
		const logoutController = new LogoutController();
		const userController = new UserController();
		super.addControllers([
			loginController,
			signupController,
			logoutController,
			userController
		]);
	}
	public async start(port: number) {
		await connect(
			process.env.MONGO!,
			{
				useFindAndModify: false,
				useNewUrlParser: true,
				useCreateIndex: true
			}
		);
		this.app.listen(port, () =>
			Logger.Imp(`Server listening on port ${port}`)
		);
	}
}
