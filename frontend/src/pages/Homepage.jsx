import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useCallback } from "react";
import { useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity'
import axios from 'axios';
import { AuthorizationContext } from "../AuthorizationContext";
import { add, initialization, remove, rename } from '../store/channelsSlice'
import { add as addMessage, remove as removeMessage, initializationMessages } from "../store/messagesInfoSlice";
import { Sidebar } from "../components/Sidebar";
import { MessageFeed } from "../components/MessageFeed";
import socket from "../socket";


const Home = () => {
	const { authorization } = useContext(AuthorizationContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	
	const notifyErrorNetwork = useCallback(
		() => toast(t('notifications.errorConnect'), {
			hideProgressBar: true,
			theme: "dark"
		}),
		[t],
	);

	useEffect(() => {
		if (authorization.status !== true) {
			navigate('/login');
		}
	});

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get('/api/v1/data', {
				headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
			}).catch(() => notifyErrorNetwork());
			const { channels, currentChannelId, messages } = data;
			dispatch(initialization({channels, currentChannelId}));
			dispatch(initializationMessages({messages}));
		};
		const addWatchers = () =>{
			const addNewChannel = (channel) => dispatch(add(channel));
			const renameChanell = (channel) => dispatch(rename(channel));
			const removeChanell = (id) => dispatch(remove(id));
			const addNewMessage = (message) => dispatch(addMessage(message));
			const removeMessageChanell = (id) => dispatch(removeMessage(id));
			socket.on('newChannel', (payload) => addNewChannel(payload));
			socket.on('newMessage', (payload) => addNewMessage(payload));
			socket.on('renameChannel', (payload) => renameChanell(payload));
			socket.on('removeChannel', (payload) => {
				removeChanell(payload);
				removeMessageChanell(payload);
			});
		};
		if (authorization.status === true) {
			fetchData();
			addWatchers();
			filter.loadDictionary('ru');
		}
		return () => socket.removeAllListeners();
	}, [dispatch, notifyErrorNetwork, authorization]);
	
	return (
		<div className="container h-95 my-4 overflow-hidden rounded shadow">
			<div className="row h-100 bg-white flex-md-row">
				<Sidebar/>
				<MessageFeed></MessageFeed>
			</div>
		</div>
	);
};

export { Home };
