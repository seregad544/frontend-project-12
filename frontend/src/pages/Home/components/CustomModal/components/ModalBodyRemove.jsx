import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { React, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { closeModal, selectModalExtra } from '../../../../../store/modalSlice';
import { SocketContext } from '../../../../../socket';

function ModalBodyRemove() {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const { removeChanell } = useContext(SocketContext);
  const { t } = useTranslation();
  const id = useSelector(selectModalExtra);
  const notifyRemoveChannel = () => toast(t('notifications.removeChannel'), {
    hideProgressBar: true,
    theme: 'dark',
  });
  const notifyErrorRemoveChannel = () => toast(t('notifications.errorChannelRemove'), {
    hideProgressBar: true,
    theme: 'dark',
  });
  const close = () => dispatch(closeModal());
  const deletee = () => {
    setSubmitting(true);
    const resolve = () => {
      setSubmitting(false);
      close();
      notifyRemoveChannel();
    };
    const reject = () => {
      notifyErrorRemoveChannel();
      setSubmitting(false);
    };
    removeChanell(id, resolve, reject);
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
}

export default ModalBodyRemove;
