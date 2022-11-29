import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import socket from '../socket';
import { closeModal } from '../store/modalSlice';

function ModalBodyAdd() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const chanels = useSelector((state) => state.channelsInfo.channels).map((chanel) => chanel.name);
  const validationShema = yup.object().shape({
    channel: yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.Name3-20'))
      .max(20, t('validation.Name3-20'))
      .notOneOf(chanels, t('validation.uniqueName')),
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
    document.getElementsByName('channel')[0].focus();
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
            id="channel"
            onChange={handleChange}
            value={values.channel}
            placeholder={t('modal.placeholder.channel')}
          />
          {(errors.channel) ? <div className="text-danger">{errors.channel}</div> : null}
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
