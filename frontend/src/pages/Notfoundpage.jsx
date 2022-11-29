import { React } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  return (
    <div className="container-fluid h-100">
      <div className="row no-gutters align-items-center justify-content-center h-100">
        <div className="text-center text-light">
          <h1>404</h1>
          <h2>{t('notfoundpage.title')}</h2>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <u className="text-primary" role="button" tabIndex={0} onClick={goHome}>
            {t('notfoundpage.home')}
          </u>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
