import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../AuthorizationContext";
import { useTranslation } from 'react-i18next';

const Head = () => {
	const { authorization, logout } = useContext(AuthorizationContext);
	const { t } = useTranslation();
    const navigate = useNavigate();
    const goHome = () => navigate('/');

	return (
        <header className="shadow-sm navbar navbar-expand-lg navbar-light gradient black">
            <div className="container">
                <div role="button" className="navbar-brand text-light" onClick={goHome}>Typo Slack</div>
                {(authorization.status === true) ? <button onClick={() => logout()} type="button" className="btn btn-outline-primary">{t('home.button')}</button> : null}
            </div>    
        </header>
    );	
};
 
export { Head };
