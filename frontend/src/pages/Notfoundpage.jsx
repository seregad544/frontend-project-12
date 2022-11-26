import { React } from 'react';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <div className="text-center text-light">
        <h1>404</h1>
        <h2>{t('notfoundpage.title')}</h2>
      </div>
    </div>
  );
}

export default NotFound;
