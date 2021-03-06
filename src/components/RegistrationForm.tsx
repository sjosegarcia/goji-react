import React, { FC, useState } from 'react';
import { UserVerify } from 'types/user.interface';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '../lib/firebase';
import { Redirect } from 'react-router-dom';
import { User } from '@firebase/auth-types';
import { FirebaseAuthErrors } from 'types/firebase.interface';
import { getUserInDB } from 'lib/user/database/getUserInDB';
import getAuthenticatedUser from 'lib/user/endpoints/getAuthenticatedUser';
import { useUser } from 'Hooks';

const schema = yup.object().shape({
	firstname: yup.string().max(20).required('Please provide your first name'),
	lastname: yup.string().required('Please provide your last name'),
	email: yup
		.string()
		.email('Please provide a valid email address')
		.required('Please provide a valid email address'),
	password: yup
		.string()
		.required('Please provide a valid password')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
		),
	passwordConfirmation: yup
		.string()
		.required('Please confirm your password')
		.oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

const RegistrationForms: FC = () => {
	const user = useUser();
	const [authError, setAuthErrors] = useState<FirebaseAuthErrors | null>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserVerify>({
		defaultValues: {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			passwordConfirmation: '',
		},
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<UserVerify> = async (data) => {
		await auth.createUserWithEmailAndPassword(data.email, data.password).then(
			async function (result) {
				if (!result.user) return null;
				const userInDB = await getUserInDB(result.user);
				const idToken = await result.user.getIdToken();
				return await getAuthenticatedUser(idToken);
			},
			function (error: FirebaseAuthErrors) {
				setAuthErrors(error);
			}
		);
	};

	const textBoxColor = (error?: FieldError) =>
		error ? 'border-red-500 bg-red-200' : 'border-gray-300 bg-gray-200';

	if (user && user !== 'NOT_YET_LOADED') return <Redirect to="/" />;

	return (
		<div className="bg-white h-screen flex flex-col justify-center">
			<div className="py-6">
				<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
					<div className="w-full p-8 lg:w">
						<h2 className="text-2xl font-semibold text-gray-700 text-center">
							Registration
						</h2>
						<div className="mt-4">
							<div className="flex justify-between">
								<label className="block text-gray-700 text-sm font-bold mb-2">
									First Name
								</label>
							</div>
							<input
								{...register('firstname')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border ${textBoxColor(
									errors.firstname
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="firstname"
							/>
							{errors.firstname && (
								<span className="text-bold text-xs text-red-500">
									{errors.firstname.message}
								</span>
							)}
						</div>
						<div className="mt-4">
							<div className="flex justify-between">
								<label className="block text-gray-700 text-sm font-bold mb-2">
									Last Name
								</label>
							</div>
							<input
								{...register('lastname')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.lastname
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="lastname"
							/>
							{errors.lastname && (
								<span className="text-bold text-xs text-red-500">
									{errors.lastname.message}
								</span>
							)}
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
							<div className="flex justify-between">
								<label className="block text-gray-700 text-sm font-bold mb-2">
									Confirm Password
								</label>
							</div>
							<input
								{...register('passwordConfirmation')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.passwordConfirmation
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="password"
							/>
							{errors.passwordConfirmation && (
								<span className="text-bold text-xs text-red-500">
									{errors.passwordConfirmation.message}
								</span>
							)}
						</div>
						<div className="mt-8">
							{authError && (
								<span className="text-bold text-xs text-red-500">
									{authError.message}
								</span>
							)}
							<button
								onClick={handleSubmit(onSubmit)}
								className="bg-yellow-500 text-gray-700 font-bold py-2 px-4 w-full rounded hover:bg-yellow-300"
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegistrationForms;
