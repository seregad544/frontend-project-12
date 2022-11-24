import { createContext, useState } from 'react';
import { useTranslation } from "react-i18next";

const AuthorizationContext = createContext();

const AuthorizationProvider = ({ children }) => {
	const initialState = localStorage.getItem('token') ? { status: true, userName: localStorage.getItem('username')} : { status: false };
	const [authorization, setAuthorization] = useState(initialState);
	const { t } = useTranslation();
	const errorList = {
		409: t('errors.409'),
		401: t('errors.401')
	};
	const login = () => setAuthorization({ status: true, userName: localStorage.getItem('username')});
	const logout = () => {
		localStorage.clear();
		setAuthorization({ status: false });
	};
	const errorAuthorization = (error) => setAuthorization({ status: error });
	const errorHandler = (error) => (errorList[error] === undefined) ? `${t('errors.default')} ${error}` : errorList[error];
	
	return (
		<AuthorizationContext.Provider value={{ authorization, login, logout, errorAuthorization, errorHandler }}>
			{children}
		</AuthorizationContext.Provider>
	);
};

export { AuthorizationProvider, AuthorizationContext };