import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthorizationContext } from '../AuthorizationContext';

function Head() {
  const { authorization, logout } = useContext(AuthorizationContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  return (
    <header className="shadow-sm navbar navbar-expand-lg navbar-light gradient black">
      <div className="container">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div role="button" className="navbar-brand text-light" tabIndex={0} onClick={goHome}>Hexlet Chat</div>
        {(authorization.status === true) ? <button onClick={() => logout()} type="button" className="btn btn-outline-primary">{t('home.button')}</button> : null}
      </div>
    </header>
  );
}

export default Head;
