import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import socket from '../../../../../socket';
import { closeModal } from '../../../../../store/modalSlice';

function ModalBodyRename() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useSelector((state) => state.modalInfo.extra);
  const chanels = useSelector((state) => state.channelsInfo.channels);
  const chanelsName = chanels.map((chanel) => chanel.name);
  const currentName = chanels.filter((item) => item.id === id).map((item) => item.name)[0];
  const validationShema = yup.object().shape({
    channel: yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.Name3-20'))
      .max(20, t('validation.Name3-20'))
      .notOneOf(chanelsName, t('validation.uniqueName')),
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
    document.getElementsByName('channel')[0].focus();
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

export default ModalBodyRename;
