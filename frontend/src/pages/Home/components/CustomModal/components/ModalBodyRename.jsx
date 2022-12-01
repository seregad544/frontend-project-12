import {
  React, useEffect, useRef, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import socket from '../../../../../socket';
import { closeModal, selectModalExtra } from '../../../../../store/modalSlice';
import { selectCurrentChannelName, selectNamesChannels } from '../../../../../store/channelsSlice';
import { AuthorizationContext } from '../../../../../AuthorizationContext';

function ModalBodyRename() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { errorHandler } = useContext(AuthorizationContext);
  const input = useRef(null);
  const { id } = useSelector(selectModalExtra);
  const namesChanels = useSelector(selectNamesChannels);
  const currentName = useSelector(selectCurrentChannelName);
  const validationShema = yup.object().shape({
    channel: yup.string()
      .required('required')
      .min(3, 'minLength3')
      .max(20, 'maxLength20')
      .notOneOf(namesChanels, 'uniqueName'),
  });
  const close = () => dispatch(closeModal());
  const notifyRenameChannel = () => toast(t('notifications.renameChannel'), {
    hideProgressBar: true,
    theme: 'dark',
  });
  const notifyErrorRenameChannel = () => toast(t('notifications.errorChannelRename'), {
    hideProgressBar: true,
    theme: 'dark',
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{
        channel: currentName,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const renameChannel = (name) => socket.timeout(5000).emit('renameChannel', { id, name }, (err) => {
          if (err) {
            notifyErrorRenameChannel();
            setSubmitting(false);
          } else {
            resetForm({ channel: '' });
            setSubmitting(false);
            close();
            notifyRenameChannel();
          }
        });
        renameChannel(values.channel);
      }}
      validationSchema={validationShema}
    >
      {({
        values, errors, handleChange, isValid, handleSubmit, isSubmitting,
      }) => (
        <form>
          <label className="visually-hidden" htmlFor="channel">{t('modal.label.channel')}</label>
          <input
            className="p-0 px-2 mb-2 form-control"
            type="text"
            name="channel"
            ref={input}
            id="channel"
            onChange={handleChange}
            value={values.channel}
            placeholder={t('modal.placeholder.channel')}
          />
          {(errors.channel) ? <div className="text-danger">{errorHandler(errors.channel)}</div> : null}
          <div className="d-flex justify-content-end">
            <button type="button" onClick={close} className="me-2 btn btn-secondary">
              {t('modal.button.cancel')}
            </button>
            <button type="submit" onClick={handleSubmit} disabled={!isValid || isSubmitting} className="btn btn-primary">
              {t('modal.button.send')}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default ModalBodyRename;
