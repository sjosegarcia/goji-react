export interface UserVerify {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export interface Login {
	email: string;
	password: string;
}

export interface ForgotPassword {
	email: string;
}

export interface UserUpdate {
	firstname: string;
	lastname: string;
	email: string;
	username: string;
}

export interface User {
	uid?: string;
	username?: string;
	email?: string;
	firstname?: string;
	lastname?: string;
	dob?: string;
	lastLoginDate?: Date;
	createdOn?: Date;
	updatedOn?: Date;
	photoUrl?: string;
	deleted?: boolean;
}
export interface UserInDB extends User {
	id: number;
}
