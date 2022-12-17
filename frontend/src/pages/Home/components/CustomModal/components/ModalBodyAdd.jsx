import {
  React, useEffect, useRef, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { closeModal } from '../../../../../store/modalSlice';
import { selectNamesChannels } from '../../../../../store/channelsSlice';
import { SocketContext } from '../../../../../socket';
import UseErrorHandler from '../../../../../hoc/UseErrorHandler';
import { AuthorizationContext } from '../../../../../AuthorizationContext';

function ModalBodyAdd() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const errorHandler = UseErrorHandler();
  const { addChannel } = useContext(SocketContext);
  const { authorization: { userName: author } } = useContext(AuthorizationContext);

  const namesChannels = useSelector(selectNamesChannels);
  const input = useRef(null);
  const validationShema = yup.object().shape({
    channel: yup.string()
      .required('required')
      .min(3, 'minLength')
      .max(20, 'maxLength')
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
  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const resolve = () => {
        resetForm({ channel: '' });
        setSubmitting(false);
        close();
        notifyAddChannel();
      };
      const reject = () => {
        notifyErrorAddChannel();
        setSubmitting(false);
      };
      addChannel(values.channel, author, resolve, reject);
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

export default ModalBodyAdd;
