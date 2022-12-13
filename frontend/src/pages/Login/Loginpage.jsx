import {
  React, useEffect, useContext, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthorizationContext } from '../../AuthorizationContext';
import UseErrorHandler from '../../hoc/UseErrorHandler';

function Login() {
  const { login } = useContext(AuthorizationContext);
  const [errorAuthorization, seterrorAuthorization] = useState('');
  const errorHandler = UseErrorHandler();
  const { t } = useTranslation();
  const firstInput = useRef(null);
  const validationShema = yup.object().shape({
    username: yup.string().required('required'),
    password: yup.string().required('required'),
  });
  const notifyErrorNetwork = () => toast(t('notifications.errorConnect'), {
    hideProgressBar: true,
    theme: 'dark',
  });

  useEffect(() => {
    firstInput.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      const request = (data) => {
        axios.post('/api/v1/login', data)
          .then((response) => login(response.data))
          .catch((error) => {
            if (error.code === 'ERR_NETWORK') {
              notifyErrorNetwork();
            }
            setSubmitting(false);
            seterrorAuthorization(error.response.status);
          });
      };
      request(values);
    },
    validationSchema: validationShema,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row no-gutters text-center align-items-center justify-content-center h-100">
        <div className="col-11 col-md-5 col-lg-4 col-xl-3">
          <h1 className="font-weight-bold">{t('login.title')}</h1>
          <form onSubmit={formik.handleSubmit} className="mb-3">
            <div className="mb-3">
              <label htmlFor="username" className="visually-hidden">{t('login.label.userName')}</label>
              <input
                type="text"
                name="username"
                ref={firstInput}
                id="username"
                className="form-control form-control-md black border-0 text-secondary"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder={t('login.placeholder.userName')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="visually-hidden">{t('login.label.password')}</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control form-control-md black border-0 text-secondary"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder={t('login.placeholder.password')}
              />
              {(errorAuthorization !== '') ? <div className="bg-danger position-absolute rounded px-2 opacity-75">{errorHandler(errorAuthorization)}</div> : null}
            </div>
            <button
              className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold mb-2 w-100"
              disabled={!formik.isValid || formik.isSubmitting}
              type="submit"
            >
              {t('login.button')}
            </button>
            <p className="text-light">
              {t('login.signUpStart')}
              <Link to="/signup">
                {t('login.signUpEnd')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
