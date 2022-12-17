import { createContext } from 'react';
import { io } from 'socket.io-client';
import store from './store';
import { add, remove, rename } from './store/channelsSlice';
import { add as addMessage } from './store/messagesInfoSlice';

const initializationsSocket = () => {
  const socket = io();
  socket.on('newChannel', (payload) => store.dispatch(add(payload)));
  socket.on('newMessage', (payload) => store.dispatch(addMessage(payload)));
  socket.on('renameChannel', (payload) => store.dispatch(rename(payload)));
  socket.on('removeChannel', (payload) => store.dispatch(remove(payload)));
  const addChannel = (channel, author, resolve, reject) => socket.timeout(5000).emit('newChannel', { name: channel, author }, (err) => {
    if (err) {
      reject();
    } else {
      resolve();
    }
  });
  const removeChanell = (id, resolve, reject) => socket.timeout(5000).emit('removeChannel', id, (err) => {
    if (err) {
      reject();
    } else {
      resolve();
    }
  });
  const renameChanell = (id, name, resolve, reject) => socket.timeout(5000).emit('renameChannel', { id, name }, (err) => {
    if (err) {
      reject();
    } else {
      resolve();
    }
  });
  const addNewMessage = (message, channelId, username, resolve, reject) => socket.timeout(5000).emit('newMessage', { body: message, channelId, username }, (err) => {
    if (err) {
      reject();
    } else {
      resolve();
    }
  });
  return {
    addChannel, removeChanell, renameChanell, addNewMessage,
  };
};
export const SocketContext = createContext();

export default initializationsSocket;
