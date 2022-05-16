import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const PopUpLesson = ({ closePopUp }) => {
	const [upload, setUpload] = useState(false);

	return (
		<>
			<div id="popup" className="popup">
				<div className="dialog__close">
					<button
						onClick={() => closePopUp(false)}
						className="close__icon"
					>
						<CloseIcon />
					</button>
				</div>
				<div className="popup__container">
					<div className="header__medium">
						Хичээл нэмэх хэсэг
					</div>
					{!upload && (
						<div>
							<form className="popup__wrapper">
								<input
									id="student__name"
									type="text"
									placeholder="Хичээлийн дугаар"
									required
								/>
								<input
									id="student__name"
									type="text"
									placeholder="Хичээлийн нэр"
									required
								/>

								<input
									accept="video/*"
									id="lesson__video"
									type="file"
								/>
							</form>
							<div className="dialog__buttons">
								<button
									onClick={() => closePopUp(false)}
									className="confirm__btn text__big"
								>
									Буцах
								</button>
								<button
									className="confirm__btn text__big"
									onClick={() => setUpload(true)}
								>
									Нэмэх
								</button>
							</div>
						</div>
					)}
					{upload && (
						<div>
							<Box
								sx={{
									width: '100%',
									height: 30,
									mt: 3,

									backgroundColor: '#dfdfe1',
								}}
							>
								<Box
									sx={{
										width: 10,
										height: 30,
										position: 'absolute',
										backgroundColor: '#11101b',
									}}
								></Box>
							</Box>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default PopUpLesson;
