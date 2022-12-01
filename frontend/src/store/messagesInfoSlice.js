/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchData, remove } from './channelsSlice';

const messageSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    add(state, action) {
      state.messages.push({
        body: action.payload.body,
        channelId: action.payload.channelId,
        username: action.payload.username,
        id: action.payload.id,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        state.messages = messages;
      })
      .addCase(remove, (state, action) => {
        const { id } = action.payload;
        state.messages = state.messages.filter((item) => item.channelId !== id);
      });
  },
});

export const selectAllMessages = (state) => state.messagesInfo.messages;
export const selectNumberOfMessages = createSelector(
  selectAllMessages,
  (state) => state.channelsInfo.currentChannelId,
  (messages, currentChannelId) => messages
    .filter((item) => item.channelId === currentChannelId).length,
);

export const { add } = messageSlice.actions;
export default messageSlice.reducer;
