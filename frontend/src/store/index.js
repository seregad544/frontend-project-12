import { configureStore } from '@reduxjs/toolkit';
import chanelInfoReducer from './channelsSlice';
import messagesReducer from './messagesInfoSlice';
import modalReducer from './modalSlice';

export default configureStore({
  reducer: {
    channelsInfo: chanelInfoReducer,
    messagesInfo: messagesReducer,
    modalInfo: modalReducer,
  },
});
