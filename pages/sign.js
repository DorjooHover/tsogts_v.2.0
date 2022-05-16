import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Images
import Image from 'next/image';
// import GoogleImg from '../public/images/google.png';
import TsogtsLogo from '../public/images/tsogts.jpg';
// Icon
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
	const [signUp, setSignUp] = useState(false);

	return (
		<>
			<div className="sign__container">
				<div className="sign__wrapper">
					<div className="sign__img">
						<Image
							src={TsogtsLogo}
							alt="Google Login"
							className="sign__img"
							priority
						></Image>
					</div>
					{!signUp && (
						<>
							<h1 className="header__main">
								Нэвтрэх хэсэг
							</h1>
							<form action="" className="sign__form">
								<input
									type="email / phone"
									placeholder="Имэйл / Утас"
									className="sign__input"
									required
								/>
								<input
									type="password"
									placeholder="Нууц үг"
									className="sign__input"
									required
								/>
								<div className="display sign__btn">
									<div className="sign__mail">
										<GoogleIcon />
									</div>
									<input
										type="submit"
										className="sign__submit"
										value="Нэвтрэх"
									/>
								</div>
							</form>
							<div className="help">
								<Link href="/forget">
									<a onClick={() => setSignUp(true)}>
										Нууц үг сэргээх
									</a>
								</Link>

								<a onClick={() => setSignUp(true)}>
									Бүртгүүлэх
								</a>
							</div>
							<Stack
								sx={{
									width: '100%',
									// display: 'none'
								}}
							>
								<Alert severity="error">
									Имэйл эсвэл нууц үг алдаатай байна!
								</Alert>
								{/* <Alert severity="success">
									Амжилттай нэвтэрлээ!
								</Alert> */}
							</Stack>
						</>
					)}
					{signUp && (
						<>
							<h1 className="header__main">
								Бүртгүүлэх хэсэг
							</h1>
							<form action="" className="sign__form">
								<div className="display">
									<input
										type="text"
										placeholder="Овог"
										className="sign__input"
										required
									/>
									<input
										type="text"
										placeholder="Нэр"
										className="sign__input"
										required
									/>
								</div>
								<input
									type="email"
									placeholder="Имэйл"
									className="sign__input"
									required
								/>
								<input
									type="phone"
									placeholder="Утас"
									className="sign__input"
									required
								/>
								<div className="display">
									<input
										type="password"
										placeholder="Нууц үг"
										className="sign__input"
										required
									/>
									<input
										type="password"
										placeholder="Давтан нууц үг"
										className="sign__input"
										required
									/>
								</div>
								<div className="display sign__btn">
									<div className="sign__mail">
										<GoogleIcon />
									</div>
									<input
										type="submit"
										className="sign__submit"
										value="Бүртгүүлэх"
									/>
								</div>
							</form>
							<div className="help">
								<a onClick={() => setSignUp(false)}>
									Нэвтрэх
								</a>
							</div>
							<Stack
								sx={{
									width: '100%',
									// display: 'none'
								}}
							>
								<Alert severity="error">
									Бүртгэл амжилтгүй боллоо!
								</Alert>
								{/* <Alert severity="success">
									Амжилттай бүртгэгдлээ!
								</Alert> */}
							</Stack>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default LoginPage;
