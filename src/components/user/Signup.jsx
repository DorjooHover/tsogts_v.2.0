import {
	sendEmailVerification,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../config/firebase';
import GoogleIcon from '@mui/icons-material/Google';

import { Stack, Alert } from '@mui/material';
const SignUp = ({ setUserData, userData }) => {
	const [password, setPassword] = useState({ new: '', repeat: '' });
	const [alert, setAlert] = useState({ type: '', message: '',  });
	const registerByEmail = () => {
		if (userData.password != '' && password.repeat != '') {
			if (password.repeat == userData.password) {
				if (password.repeat.length >= 8) {
					createUserWithEmailAndPassword(
						auth,
						userData.email,
						userData.password
					)
						.catch(err => {
							console.log(err.message, err.code);
							if (
								err.code == 'auth/email-already-in-use'
							) {
								setAlert(alert => ({
									type: 'warning',
									message: 'Бүртгэлтэй имайл байна.',
								}));
							}
						})
						.then(res => console.log(res))
						.finally(() => {
							if (alert.type == '') {
								setAlert(alert => ({
									type: 'success',
									message: 'Амжилттай бүртгүүллээ',
								}));
							}
						});
				}
				setAlert(alert => ({
					type: 'warning',
					message: 'Нууц үг 7 гоос дээш оронтой байх хэрэгтэй.',
				}));
				return;
			}
			setAlert(alert => ({
				type: 'warning',
				message: 'Нууц үг болон давтан нууц үг зөрүүтэй байна.',
			}));
			return;
		}
		setAlert(alert => ({
			type: 'warning',
			message: 'Нууц үг эсвэл давтан нууц үгээ оруулна уу.',
		}));
		return;
	};
	return (
		// <form onSubmit={requestOTP}>
		//     <input type="tel" name="phone" id="phone" required onChange={(e) => (setPhoneNumber(e.target.value))}/>
		//     <input type="submit" value="send"  />
		//     <div id="recaptcha-container"></div>
		// </form>

		<>
			<div className="sign__form">
				<div className="display">
					<input
						type="text"
						placeholder="Овог"
						className="sign__input"
						required
						value={userData.firstName}
						onChange={e =>
							setUserData(userData => ({
								...userData,
								firstName: e.target.value,
							}))
						}
					/>
					<input
						type="text"
						placeholder="Нэр"
						className="sign__input"
						required
						value={userData.lastName}
						onChange={e =>
							setUserData(userData => ({
								...userData,
								lastName: e.target.value,
							}))
						}
					/>
				</div>
				<input
					type="email"
					placeholder="Имэйл"
					className="sign__input"
					required
					value={userData.email}
					onChange={e =>
						setUserData(userData => ({
							...userData,
							email: e.target.value,
						}))
					}
				/>
				<input
					type="tel"
					placeholder="Утас"
					className="sign__input"
					pattern="[0-9]{8}"
					required
					value={userData.phone}
					onChange={e =>
						setUserData(userData => ({
							...userData,
							phone: e.target.value,
						}))
					}
				/>
				<div className="display">
					<input
						type="password"
						placeholder="Нууц үг"
						className="sign__input"
						required
						value={userData.password}
						onChange={e =>
							setUserData(userData => ({
								...userData,
								password: e.target.value,
							}))
						}
					/>
					<input
						type="password"
						placeholder="Давтан нууц үг"
						className="sign__input"
						required
						value={password.repeat}
						onChange={e =>
							setPassword(password => ({
								...password,
								repeat: e.target.value,
							}))
						}
					/>
				</div>

				<input
					type="button"
					className="sign__submit"
					onClick={registerByEmail}
					value="Бүртгүүлэх"
					disabled={
						!userData.email &&
						!userData.phone &&
						!userData.password &&
						!userData.firstName &&
						!userData.lastName
					}
				/>
			</div>
			{alert.type != '' && (
				<>
					<Stack
						sx={{
							width: '100%',
							// display: 'none'
							mt: 2,
						}}
					>
						<Alert severity={alert.type}>
							{alert.message}
						</Alert>
						{/* <Alert severity="success">
                                Амжилттай нэвтэрлээ!
                            </Alert> */}
					</Stack>
				</>
			)}
		</>
	);
};

export default SignUp;
