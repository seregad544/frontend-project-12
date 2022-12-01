import {
  React, useEffect, useRef, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import socket from '../../../../../socket';
import { closeModal } from '../../../../../store/modalSlice';
import { selectNamesChannels } from '../../../../../store/channelsSlice';
import { AuthorizationContext } from '../../../../../AuthorizationContext';

function ModalBodyAdd() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { errorHandler } = useContext(AuthorizationContext);
  const namesChannels = useSelector(selectNamesChannels);
  const input = useRef(null);
  const validationShema = yup.object().shape({
    channel: yup.string()
      .required('required')
      .min(3, 'minLength3')
      .max(20, 'maxLength20')
      .notOneOf(namesChannels, 'uniqueName'),
  });
  const notifyAddChannel = () => toast(t('notifications.addChannel'), {
    hideProgressBar: true,
    theme: 'dark',
  });
  const notifyErrorAddChannel = () => toast(t('notifications.errorChannelAdd'), {
    hideProgressBar: true,
    theme: 'dark',
  });
  const close = () => dispatch(closeModal());

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{
        channel: '',
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const addChannel = (channel) => socket.timeout(5000).emit('newChannel', { name: channel }, (err) => {
          if (err) {
            notifyErrorAddChannel();
            setSubmitting(false);
          } else {
            resetForm({ channel: '' });
            setSubmitting(false);
            close();
            notifyAddChannel();
          }
        });
        addChannel(values.channel);
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

export default ModalBodyAdd;
