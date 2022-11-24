import { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import filter from 'leo-profanity'
import { toast } from 'react-toastify';
import { AuthorizationContext } from '../AuthorizationContext';
import socket from '../socket';

const InputMessageFeed = () => {
    const { t } = useTranslation();
	const { authorization: { userName } } = useContext(AuthorizationContext);
    const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
	const validationShema = yup.object().shape({
		message: yup.string().required(t('validation.required'))
	});

	const notifyErrorAddMessage = () => toast(t('notifications.errorMessage'), {
		hideProgressBar: true,
		theme: "dark"
	});
    
	useEffect(() => {
		document.getElementsByName("message")[0].focus();
	});
	
	return (
        <div className="mt-auto px-5 py-3">
            <form noValidate="" className="py-1 border-0 rounded-2">
                <Formik
					initialValues={{
						message: ''
					}}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						const addMessage = (message, channelId, username) =>socket.timeout(5000).emit('newMessage', { body: message, channelId, username }, (err) => {
							if (err) {
								notifyErrorAddMessage();
								setSubmitting(false);
							} else {
							  	resetForm({message: ''});
								setSubmitting(false);
							}
						});
						addMessage(filter.clean(values.message), currentChannelId, userName);
					}}
					validationSchema={validationShema}
				>
					{({ values, handleChange, isValid, handleSubmit, isSubmitting }) => (
						<div className="input-group has-validation">
							<label htmlFor='message' className="visually-hidden">{t('home.label.message')}</label>
							<input
								className={'border-0 p-0 ps-2 form-control'}
                                type={'text'}
								name={'message'}
								onChange={handleChange}
								value={values.message}
								placeholder={t('home.placeholder.message')}
							/>
							<button
                                className={'btn btn-group-vertical border-0'}
								disabled={!isValid || isSubmitting}
								onClick={handleSubmit}
								type={'submit'}
							>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
                                    <path d="M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z"/>
                                </svg>
                                <span className="visually-hidden">
                                    {t('home.label.send')}
                                </span>
                            </button>
						</div>
					)}
				</Formik>
            </form>
        </div>
	);
};

export { InputMessageFeed };


                            