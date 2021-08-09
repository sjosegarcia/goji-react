import React, { FC } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect } from 'react-router-dom';
import { ForgotPassword } from 'types/user.interface';

const ForgotPasswordForms: FC = () => {
	const schema = yup.object().shape({
		emailAddress: yup
			.string()
			.email('Please provide a valid email address')
			.required('Please provide a valid email address'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPassword>({
		defaultValues: {
			emailAddress: '',
		},
		resolver: yupResolver(schema),
	});
	const onSubmit: SubmitHandler<ForgotPassword> = (data) =>
		auth.sendPasswordResetEmail(data.emailAddress);

	const [user] = useAuthState(auth);

	const textBoxColor = (error?: FieldError) =>
		error ? 'border-red-500 bg-red-200' : 'border-gray-300 bg-gray-200';

	if (user) return <Redirect to="/" />;

	return (
		<div className="bg-white h-screen flex flex-col justify-center">
			<div className="py-6">
				<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
					<div className="w-full p-8 lg:w">
						<h2 className="text-2xl font-semibold text-gray-700 text-center">
							Forgot Password
						</h2>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Email Address
							</label>
							<input
								{...register('emailAddress')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.emailAddress
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="email"
							/>
							{errors.emailAddress && (
								<span className="text-bold text-xs text-red-500">
									{errors.emailAddress.message}
								</span>
							)}
						</div>
						<div className="mt-8">
							<button
								onClick={handleSubmit(onSubmit)}
								className="bg-yellow-500 text-gray-700 font-bold py-2 px-4 w-full rounded hover:bg-yellow-300"
							>
								Send Email
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordForms;
