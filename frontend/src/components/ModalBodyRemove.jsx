import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { closeModal } from '../store/modalSlice';
import socket from '../socket';

const ModalBodyRemove = () => {
	const dispatch = useDispatch();
	const [submitting, setSubmitting] = useState(false);
	const { t } = useTranslation();
	const id = useSelector((state) => state.modalInfo.extra);
	const notifyRemoveChannel = () => toast(t('notifications.removeChannel'), {
		hideProgressBar: true,
		theme: "dark"
	});
	const notifyErrorRemoveChannel = () => toast(t('notifications.errorChannelRemove'), {
		hideProgressBar: true,
		theme: "dark"
	});
	const close = () => dispatch(closeModal());
	const deletee = () => {
		setSubmitting(true);
		socket.timeout(5000).emit('removeChannel', id, (err) => {
			if (err) {
				notifyErrorRemoveChannel();
				setSubmitting(false);
			} else {
				setSubmitting(false);
				close();
				notifyRemoveChannel();
			}
		})
	};
	
	return (
		<>
			<p>{t('modal.title.areYouSure')}</p>
			<div className="d-flex justify-content-end">
				<button type="button" onClick={close} className="me-2 btn btn-secondary">
					{t('modal.button.cancel')}
				</button>
				<button type="submit" onClick={deletee} disabled={submitting} className="btn btn-danger">
					{t('modal.button.remove')}
				</button>
			</div>
		</>
	);
};

export { ModalBodyRemove };
