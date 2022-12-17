import { useTranslation } from 'react-i18next';

function UseErrorHandler() {
  const { t } = useTranslation();
  const errorList = {
    409: 'errors.409',
    401: 'errors.401',
    required: 'validation.required',
    uniqueName: 'validation.uniqueName',
    minLength: 'validation.Name3-20',
    maxLengt: 'validation.Name3-20',
    minLengthPassword: 'validation.minPassword6',
    passwordsDontMatch: 'validation.PasswordsDontMatch',
    'Request failed with status code 401': 'notifications.errorAuthorization',
    'Network Error': 'notifications.errorConnect',
  };

  const errorHandler = (error) => ((errorList[error] === undefined) ? `${t('errors.default')} ${error}` : t(errorList[error]));
  return errorHandler;
}

export default UseErrorHandler;
