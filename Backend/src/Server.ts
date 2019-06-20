import { json, urlencoded } from 'body-parser';
import { connect } from 'mongoose';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { LoginController } from './Controllers/Login';
import { SignupController } from './Controllers/Signup';

export class MERN extends Server {
	constructor() {
		super(process.env.NODE_ENV === 'development');
		this.app.use(json());
		this.app.use(urlencoded({ extended: true }));
		this.setupControllers();
	}
	private setupControllers() {
		const loginController = new LoginController();
		const signupController = new SignupController();
		super.addControllers([loginController, signupController]);
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
