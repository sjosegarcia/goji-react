import React, { FC, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Login } from 'types/user.interface';
import { appleAuth, auth, googleAuth } from '../lib/firebase';
import { User } from '@firebase/auth-types';
import getAuthenticatedUser from 'lib/user/endpoints/getAuthenticatedUser';
import { useUser } from 'Hooks';

import { getUserInDB } from 'lib/user/database/getUserInDB';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { FirebaseAuthErrors } from 'types/firebase.interface';

const schema = yup.object().shape({
	email: yup
		.string()
		.email('Please provide a valid email address')
		.required('Please provide a valid email address'),
	password: yup.string().required('Please provide a valid password'),
});

const handleSignIn = async (user: User | null) => {
	if (!user) return null;
	const userInDB = await getUserInDB(user);
	const idToken = await user.getIdToken(true);
	return await getAuthenticatedUser(idToken);
};

const LoginForms: FC = () => {
	const [user] = useUser();
	const [authError, setAuthErrors] = useState<FirebaseAuthErrors | null>();
	const [rememberMe, setRememberMe] = useState(false);

	const signInWithGoogle = async () => {
		googleAuth.addScope('profile');
		return await auth.signInWithPopup(googleAuth).then(
			async function (result) {
				const signedIn = await handleSignIn(result.user);
			},
			function (error: FirebaseAuthErrors) {
				setAuthErrors(error);
			}
		);
	};

	const signInWithApple = async () => {
		return await auth.signInWithPopup(appleAuth).then(
			async function (result) {
				const signedIn = await handleSignIn(result.user);
			},
			function (error: FirebaseAuthErrors) {
				setAuthErrors(error);
			}
		);
	};

	const signInWithEmailAndPassword = async (
		email: string | null,
		password: string | null
	) => {
		if (!email || !password) return null;
		return await auth.signInWithEmailAndPassword(email, password).then(
			async function (result) {
				const signedIn = await handleSignIn(result.user);
			},
			function (error: FirebaseAuthErrors) {
				setAuthErrors(error);
			}
		);
	};

	const rememberMeChecked = () => {
		setRememberMe(!rememberMe);
		auth.setPersistence(rememberMe ? 'local' : 'none');
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Login>({
		defaultValues: { email: '', password: '' },
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<Login> = async (data) => {
		signInWithEmailAndPassword(data.email, data.password);
	};

	const textBoxColor = (error?: FieldError) =>
		error ? 'border-red-500 bg-red-200' : 'border-gray-300 bg-gray-200';

	return (
		<div className="bg-white h-screen flex flex-col justify-center">
			<div className="py-6">
				<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
					<div
						className="hidden lg:block lg:w-1/2 bg-cover"
						style={{
							backgroundImage: `url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')`,
						}}
					></div>
					<div className="w-full p-8 lg:w-1/2">
						<h2 className="text-2xl font-semibold text-gray-700 text-center">
							GOJI
						</h2>
						<p className="text-xl text-gray-600 text-center">Welcome back!</p>
						<div
							onClick={signInWithGoogle}
							className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
						>
							<div className="px-4 py-3">
								<svg className="h-6 w-6" viewBox="0 0 40 40">
									<path
										d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
										fill="#FFC107"
									/>
									<path
										d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
										fill="#FF3D00"
									/>
									<path
										d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
										fill="#4CAF50"
									/>
									<path
										d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
										fill="#1976D2"
									/>
								</svg>
							</div>
							<h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
								Sign in with Google
							</h1>
						</div>
						<div
							onClick={signInWithApple}
							className="flex items-center justify-center mt-4 bg-black text-white rounded-lg shadow-md hover:bg-gray-100"
						>
							<div className="px-4 py-3">
								<h1 className="w-5/6 text-center text-white font-bold text-3xl">
									
								</h1>
							</div>
							<h1 className="px-4 py-3 w-5/6 text-center text-white font-bold">
								Sign in with Apple
							</h1>
						</div>
						<div className="mt-4 flex items-center justify-between">
							<span className="border-b w-1/5 lg:w-1/4"></span>
							<a
								href="/"
								className="text-xs text-center text-gray-500 uppercase"
							>
								or login with email
							</a>
							<span className="border-b w-1/5 lg:w-1/4"></span>
						</div>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Email Address
							</label>
							<input
								{...register('email')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.email
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="email"
							/>
							{errors.email && (
								<span className="text-bold text-xs text-red-500">
									{errors.email.message}
								</span>
							)}
						</div>
						<div className="mt-4">
							<div className="flex justify-between">
								<label className="block text-gray-700 text-sm font-bold mb-2">
									Password
								</label>
								<a href="/forgot-password" className="text-xs text-gray-500">
									Forget Password?
								</a>
							</div>
							<input
								{...register('password')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.password
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="password"
							/>
							{errors.password && (
								<span className="text-bold text-xs text-red-500">
									{errors.password.message}
								</span>
							)}
						</div>
						<div className="mt-4">
							<span className="text-xl text-bold text-gray-500">
								Remember Me{' '}
							</span>
							<input
								type="checkbox"
								className="form-checkbox h-5 w-5 text-yellow-300"
								onClick={rememberMeChecked}
							></input>
						</div>
						<div className="mt-8">
							{authError && (
								<span className="text-bold text-xs text-red-500">
									{authError.message}
								</span>
							)}
							<button
								onClick={handleSubmit(onSubmit)}
								//disabled={processingUserLogin}
								className="bg-yellow-500 text-gray-700 font-bold py-2 px-4 w-full rounded hover:bg-yellow-300"
							>
								Login
							</button>
						</div>
						<div className="mt-4 flex items-center justify-between">
							<span className="border-b w-1/5 md:w-1/4"></span>
							<a href="/signup" className="text-xs text-gray-500 uppercase">
								or sign up
							</a>
							<span className="border-b w-1/5 md:w-1/4"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginForms;
