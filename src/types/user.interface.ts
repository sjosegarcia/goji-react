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