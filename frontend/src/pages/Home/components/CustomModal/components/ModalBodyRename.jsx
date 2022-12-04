import {
  React, useEffect, useRef, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { closeModal, selectModalExtra } from '../../../../../store/modalSlice';
import { selectCurrentChannelName, selectNamesChannels } from '../../../../../store/channelsSlice';
import { AuthorizationContext } from '../../../../../AuthorizationContext';

function ModalBodyRename() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { errorHandler, socket } = useContext(AuthorizationContext);
  const input = useRef(null);
  const { id } = useSelector(selectModalExtra);
  const namesChanels = useSelector(selectNamesChannels);
  const currentName = useSelector(selectCurrentChannelName);
  const validationShema = yup.object().shape({
    channel: yup.string()
      .required('required')
      .min(3, 'minLength')
      .max(20, 'maxLength')
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
  const formik = useFormik({
    initialValues: {
      channel: currentName,
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
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
    },
    validationSchema: validationShema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="visually-hidden" htmlFor="channel">{t('modal.label.channel')}</label>
      <input
        className="p-0 px-2 mb-2 form-control"
        type="text"
        name="channel"
        ref={input}
        id="channel"
        onChange={formik.handleChange}
        value={formik.values.channel}
        placeholder={t('modal.placeholder.channel')}
      />
      {(formik.errors.channel) ? <div className="text-danger">{errorHandler(formik.errors.channel)}</div> : null}
      <div className="d-flex justify-content-end">
        <button type="button" onClick={close} className="me-2 btn btn-secondary">
          {t('modal.button.cancel')}
        </button>
        <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="btn btn-primary">
          {t('modal.button.send')}
        </button>
      </div>
    </form>
  );
}

export default ModalBodyRename;
