/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    initializationMessages(state, action) {
      state.messages = action.payload.messages;
    },
    add(state, action) {
      state.messages.push({
        body: action.payload.body,
        channelId: action.payload.channelId,
        username: action.payload.username,
        id: action.payload.id,
      });
    },
    remove(state, action) {
      state.messages = state.messages.filter((item) => item.channelId !== action.payload.id);
    },
  },
});

export const { initializationMessages, add, remove } = messageSlice.actions;
export default messageSlice.reducer;
