import { io } from 'socket.io-client';
import { add, remove, rename } from './store/channelsSlice';
import store from './store/index';
import { add as addMessage } from './store/messagesInfoSlice';

const socket = io();
const addWatchers = () => {
  const addNewChannel = (channel) => store.dispatch(add(channel));
  const renameChanell = (channel) => store.dispatch(rename(channel));
  const removeChanell = (id) => store.dispatch(remove(id));
  const addNewMessage = (message) => store.dispatch(addMessage(message));
  socket.on('newChannel', (payload) => addNewChannel(payload));
  socket.on('newMessage', (payload) => addNewMessage(payload));
  socket.on('renameChannel', (payload) => renameChanell(payload));
  socket.on('removeChannel', (payload) => removeChanell(payload));
};
addWatchers();

export default socket;
