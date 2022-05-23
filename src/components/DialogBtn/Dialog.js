import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

const Dialog = ({ closeDialog, level, text, gid, act, lid, cid }) => {
	const changeGroupLevel = async () => {
		closeDialog(false);
		const groupLevelDoc = doc(db, 'groups', gid);
		const groupLevelSnap = await updateDoc(groupLevelDoc, {
			level_id: level,
		});
	};
	const deleteGroup = async () => {
		closeDialog(false);
		await deleteDoc(doc(db, 'groups', gid));
	};
	const deleteLesson = async () => {
		closeDialog(false);
		await deleteDoc(doc(db, 'categories/' + cid + '/lessons/' + lid));
	};

	return (
		<>
			<div id="dialog">
				<div className="dialog__close">
					<button
						onClick={() => {
							closeDialog(false);
						}}
						className="close__icon"
					>
						<CloseIcon />
					</button>
				</div>
				<h2 className="header__medium">{text}</h2>
				<div className="dialog__buttons">
					<button
						onClick={() => {
							closeDialog(false);
						}}
						className="confirm__btn text__big dialog"
					>
						Болих
					</button>
					{act == 'deleteGroup' && (
						<button
							className="confirm__btn text__big dialog"
							onClick={deleteGroup}
						>
							Тийм
						</button>
					)}
					{act == 'deleteLesson' && (
						<button
							className="confirm__btn text__big dialog"
							onClick={deleteLesson}
						>
							Тийм
						</button>
					)}
					{act == 'updateLevel' && (
						<button
							className="confirm__btn text__big dialog"
							onClick={changeGroupLevel}
						>
							Тийм
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default Dialog;
