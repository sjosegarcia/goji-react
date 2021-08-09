export interface UserVerify {
	firstName: string;
	lastName: string;
	emailAddress: string;
	password: string;
	passwordConfirmation: string;
}

export interface Login {
	emailAddress: string;
	password: string;
}

export interface ForgotPassword {
	emailAddress: string;
}

export interface User {
	uid?: string;
	username?: string;
	emailAddress?: string;
	firstName?: string;
	lastName?: string;
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
