import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Dialog = ({ closeDialog }) => {
	return (
		<>
			<div id="dialog">
				<div className="dialog__close">
					<button
						onClick={() => closeDialog(false)}
						className="close__icon"
					>
						<CloseIcon />
					</button>
				</div>
				<h2 className="header__medium">
					Та устгахдаа итгэлтэй байна уу?
				</h2>
				<div className="dialog__buttons">
					<button
						onClick={() => closeDialog(false)}
						className="confirm__btn text__big"
					>
						Болих
					</button>
					<button className="confirm__btn text__big">
						Тийм
					</button>
				</div>
			</div>
		</>
	);
};

export default Dialog;
