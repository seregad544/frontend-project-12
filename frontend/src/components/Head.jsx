import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthorizationContext } from '../AuthorizationContext';

function Head() {
  const { authorization, logout } = useContext(AuthorizationContext);
  const { t } = useTranslation();

  return (
    <header className="shadow-sm navbar navbar-expand-lg navbar-light gradient black">
      <div className="container">
        <Link className="navbar-brand text-light" to="/">Hexlet Chat</Link>
        {(authorization.status === true) ? <button onClick={logout} type="button" className="btn btn-outline-primary">{t('home.button')}</button> : null}
      </div>
    </header>
  );
}

export default Head;
