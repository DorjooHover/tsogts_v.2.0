import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const PopUpAdd = ({ closePopUp }) => {
	const [addStudent, setAddStudent] = useState(false);
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
					{!addStudent && (
						<div>
							<div className="header__medium">
								Сурагч нэмэх хэсэг
							</div>

							<form className="popup__wrapper">
								<input
									id="student__name"
									type="text"
									placeholder="Овог"
									required
								/>
								<input
									id="student__name"
									type="text"
									placeholder="Нэр"
									required
								/>
								<input
									id="student__name"
									type="text"
									placeholder="Групп дугаар"
									required
								/>
								<input
									id="student__phone"
									type="phone"
									placeholder="Утас"
									required
								/>
								<input
									id="student__email"
									type="email"
									placeholder="Email"
									required
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
									onClick={() => setAddStudent(true)}
								>
									Нэмэх
								</button>
							</div>
						</div>
					)}
					{addStudent && (
						<div>
							<div className="header__medium">
								Итгэлтэй байна уу?
							</div>
							<div className="dialog__buttons">
								<button
									onClick={() => closePopUp(false)}
									className="confirm__btn text__big"
								>
									Үгүй
								</button>
								<button
									className="confirm__btn text__big"
									onClick={() => setAddStudent(true)}
								>
									Тийм
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default PopUpAdd;
