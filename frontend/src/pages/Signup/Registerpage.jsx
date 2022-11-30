import {
  React, useContext, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthorizationContext } from '../../AuthorizationContext';

function Register() {
  const { login, errorHandler } = useContext(AuthorizationContext);
  const [errorAuthorization, seterrorAuthorization] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const firstInput = useRef(null);
  const validationShema = yup.object().shape({
    username: yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.Name3-20'))
      .max(20, t('validation.Name3-20')),
    password: yup.string()
      .required(t('validation.required'))
      .min(6, t('validation.minPassword6')),
    confirmPassword: yup.string()
      .required(t('validation.required'))
      .oneOf([yup.ref('password')], t('validation.PasswordsDontMatch')),
  });
  const goLogin = () => navigate('/login');
  const goHome = () => navigate('/');
  const notifyErrorNetwork = () => toast(t('notifications.errorConnect'), {
    hideProgressBar: true,
    theme: 'dark',
  });

  useEffect(() => {
    firstInput.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row no-gutters text-center align-items-center justify-content-center h-100">
        <div className="col-11 col-md-5 col-lg-4 col-xl-3">
          <h1 className="font-weight-bold">{t('signUp.title')}</h1>
          <Formik
            initialValues={{
              username: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              const request = (data) => {
                axios.post('/api/v1/signup', data)
                  .then((response) => {
                    const { token, username } = response.data;
                    localStorage.token = token;
                    localStorage.username = username;
                    login(goHome);
                  })
                  .catch((error) => {
                    if (error.code === 'ERR_NETWORK') {
                      notifyErrorNetwork();
                    }
                    setSubmitting(false);
                    seterrorAuthorization(error.response.status);
                  });
              };
              request(values);
            }}
            validationSchema={validationShema}
          >
            {({
              values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting,
            }) => (
              <form className="mb-3">
                <div className="mb-3">
                  <label htmlFor="username" className="visually-hidden">{t('signUp.label.userName')}</label>
                  <input
                    type="text"
                    name="username"
                    ref={firstInput}
                    id="username"
                    className="form-control form-control-md black border-0 text-secondary"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    placeholder={t('signUp.placeholder.userName')}
                  />
                  {(touched.username && errors.username) ? <div className="bg-danger position-absolute rounded px-2 opacity-75">{errors.username}</div> : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="visually-hidden">{t('signUp.label.password')}</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-md black border-0 text-secondary"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    placeholder={t('signUp.placeholder.password')}
                  />
                  {(touched.password && errors.password) ? <div className="bg-danger position-absolute rounded px-2 opacity-75">{errors.password}</div> : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="visually-hidden">{t('signUp.label.confirmPassword')}</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control form-control-md black border-0 text-secondary"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    placeholder={t('signUp.placeholder.confirmPassword')}
                  />
                  {(touched.confirmPassword && errors.confirmPassword) ? <div className="bg-danger position-absolute rounded px-2 opacity-75">{errors.confirmPassword}</div> : null}
                  {(errorAuthorization !== '') ? <div className="bg-danger position-absolute rounded px-2 opacity-75">{errorHandler(errorAuthorization)}</div> : null}
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold mb-2 w-100"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  type="submit"
                >
                  {t('signUp.button')}
                </button>
                <p className="text-light">
                  {t('signUp.loginStart')}
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <u className="text-primary" role="button" tabIndex={0} onClick={goLogin}>
                    {t('signUp.loginEnd')}
                  </u>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
