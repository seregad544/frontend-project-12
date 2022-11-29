import { React, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthorizationContext } from '../AuthorizationContext';

function Login() {
  const {
    authorization, login, errorAuthorization, errorHandler,
  } = useContext(AuthorizationContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const validationShema = yup.object().shape({
    username: yup.string().required(t('validation.required')),
    password: yup.string().required(t('validation.required')),
  });
  const goRegister = () => navigate('/signup');
  const notifyErrorNetwork = () => toast(t('notifications.errorConnect'), {
    hideProgressBar: true,
    theme: 'dark',
  });

  useEffect(() => {
    if (authorization.status === true) {
      navigate('/');
    }
  });
  useEffect(() => {
    document.getElementsByName('username')[0].focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row no-gutters text-center align-items-center justify-content-center h-100">
        <div className="col-11 col-md-5 col-lg-4 col-xl-3">
          <h1 className="font-weight-bold">{t('login.title')}</h1>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              const request = (data) => {
                axios.post('/api/v1/login', data)
                  .then((response) => {
                    const { token, username } = response.data;
                    localStorage.token = token;
                    localStorage.username = username;
                    login();
                  })
                  .catch((error) => {
                    if (error.code === 'ERR_NETWORK') {
                      notifyErrorNetwork();
                    }
                    setSubmitting(false);
                    errorAuthorization(error.response.status);
                  });
              };
              request(values);
            }}
            validationSchema={validationShema}
          >
            {({
              values, errors, touched, handleChange, isValid, handleSubmit, isSubmitting,
            }) => (
              <form className="mb-3">
                <div className="mb-3">
                  <label htmlFor="username" className="visually-hidden">{t('login.label.userName')}</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control form-control-md black border-0 text-secondary"
                    onChange={handleChange}
                    value={values.username}
                    placeholder={t('login.placeholder.userName')}
                  />
                  {(touched.username && errors.username) ? <div className="bg-danger position-absolute rounded px-2 opacity-75">{errors.username}</div> : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="visually-hidden">{t('login.label.password')}</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-md black border-0 text-secondary"
                    onChange={handleChange}
                    value={values.password}
                    placeholder={t('login.placeholder.password')}
                  />
                  {(touched.password && errors.password) ? <div className="bg-danger position-absolute rounded px-2 opacity-75">{errors.password}</div> : null}
                  {(authorization.status !== false) ? <div className="bg-danger position-absolute rounded px-2 opacity-75">{errorHandler(authorization.status)}</div> : null}
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold mb-2 w-100"
                  disabled={!isValid || isSubmitting}
                  onClick={handleSubmit}
                  type="submit"
                >
                  {t('login.button')}
                </button>
                <p className="text-light">
                  {t('login.signUpStart')}
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <u className="text-primary" role="button" tabIndex={0} onClick={goRegister}>
                    {t('login.signUpEnd')}
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

export default Login;
