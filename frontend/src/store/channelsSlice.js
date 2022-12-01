/* eslint-disable no-param-reassign */
import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const { data } = await axios.get('/api/v1/data', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return data;
  },
);

const ChannelSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
    loadingStatus: true,
    error: null,
  },
  reducers: {
    add(state, action) {
      state.channels.push({
        id: action.payload.id,
        name: action.payload.name,
        removable: action.payload.removable,
      });
      state.currentChannelId = action.payload.id;
    },
    remove(state, action) {
      state.channels = state.channels.filter((item) => item.id !== action.payload.id);
      if (state.currentChannelId === action.payload.id) {
        state.currentChannelId = 1;
      }
    },
    change(state, action) {
      state.currentChannelId = action.payload.id;
    },
    rename(state, action) {
      state.channels = [
        ...state.channels.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loadingStatus = false;
        const { channels } = action.payload;
        state.currentChannelId = 1;
        state.channels = channels;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      });
  },
});

export const selectAllChannels = (state) => state.channelsInfo.channels;
export const selectCurrentChannelId = (state) => state.channelsInfo.currentChannelId;
export const selectLoadingStatus = (state) => state.channelsInfo.loadingStatus;
export const selectError = (state) => state.channelsInfo.error;
export const selectCurrentChannelName = createSelector(
  selectAllChannels,
  selectCurrentChannelId,
  (channels, currentChannelId) => channels
    .filter((item) => item.id === currentChannelId)
    .map((item) => item.name),
);
export const selectNamesChannels = createSelector(
  selectAllChannels,
  (channels) => channels.map((chanel) => chanel.name),
);

export const {
  initialization, add, change, remove, rename,
} = ChannelSlice.actions;
export default ChannelSlice.reducer;
