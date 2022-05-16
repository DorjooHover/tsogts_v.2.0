import React from 'react';
import Link from 'next/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
// Images
import Image from 'next/image';
// import GoogleImg from '../public/images/google.png';
import TsogtsLogo from '../public/images/tsogts.jpg';

const Forget = () => {
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

					<>
						<h1 className="header__main">Нууц үг сэргээх</h1>
						<form action="" className="sign__form">
							<input
								type="phone"
								placeholder="Утасны дугаар"
								className="sign__input"
								required
							/>
							<div className="display verify">
								<input
									type="text"
									placeholder="Баталгаажуулах код"
									className="sign__input"
									required
								/>
								<button className="verify__btn">
									<SendIcon fontSize="small" />
								</button>
							</div>
							<div className="display">
								<input
									type="password"
									placeholder="Шинэ нууц үг"
									className="sign__input"
									required
								/>
								<input
									type="password"
									placeholder="Давтан бичнэ үү"
									className="sign__input"
									required
								/>
							</div>
							<input
								type="submit"
								className="sign__submit"
								value="Сэргээх"
							/>
						</form>
						<div className="help">
							<Link href="sign">
								<a onClick={() => setSignUp(true)}>
									Нэвтрэх
								</a>
							</Link>
						</div>
						<Stack
							sx={{
								width: '100%',
								// display: 'none'
							}}
						>
							<Alert severity="error">
								Амжилтгүй боллоо!
							</Alert>
							{/* <Alert severity="success">
									Амжилттай нэвтэрлээ!
								</Alert> */}
						</Stack>
					</>
				</div>
			</div>
		</>
	);
};

export default Forget;
