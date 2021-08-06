import React, { FC } from 'react';
import { UserVerify } from 'types/user.interface';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect } from 'react-router-dom';

const RegistrationForms: FC = () => {
	const schema = yup.object().shape({
		firstName: yup.string().max(20).required('Please provide your first name'),
		lastName: yup.string().required('Please provide your last name'),
		emailAddress: yup
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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserVerify>({
		defaultValues: {
			firstName: '',
			lastName: '',
			emailAddress: '',
			password: '',
			passwordConfirmation: '',
		},
		resolver: yupResolver(schema),
	});
	const onSubmit: SubmitHandler<UserVerify> = (data) => console.log(data);

	const [user] = useAuthState(auth);

	if (user) return <Redirect to="/" />;

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
								{...register('firstName')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border ${
									errors.firstName
										? 'border-red-500 bg-red-200'
										: 'border-gray-300 bg-gray-200'
								} rounded py-2 px-4 block w-full appearance-none`}
								type="firstname"
							/>
							{errors.firstName && (
								<span className="text-bold text-xs text-red-500">
									{errors.firstName.message}
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
								{...register('lastName')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${
									errors.lastName
										? 'border-red-500 bg-red-200'
										: 'border-gray-300 bg-gray-200'
								} rounded py-2 px-4 block w-full appearance-none`}
								type="lastname"
							/>
							{errors.lastName && (
								<span className="text-bold text-xs text-red-500">
									{errors.lastName.message}
								</span>
							)}
						</div>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Email Address
							</label>
							<input
								{...register('emailAddress')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${
									errors.emailAddress
										? 'border-red-500 bg-red-200'
										: 'border-gray-300 bg-gray-200'
								} rounded py-2 px-4 block w-full appearance-none`}
								type="email"
							/>
							{errors.emailAddress && (
								<span className="text-bold text-xs text-red-500">
									{errors.emailAddress.message}
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
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${
									errors.password
										? 'border-red-500 bg-red-200'
										: 'border-gray-300 bg-gray-200'
								} rounded py-2 px-4 block w-full appearance-none`}
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
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${
									errors.passwordConfirmation
										? 'border-red-500 bg-red-200'
										: 'border-gray-300 bg-gray-200'
								} rounded py-2 px-4 block w-full appearance-none`}
								type="password"
							/>
							{errors.passwordConfirmation && (
								<span className="text-bold text-xs text-red-500">
									{errors.passwordConfirmation.message}
								</span>
							)}
						</div>
						<div className="mt-8">
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
