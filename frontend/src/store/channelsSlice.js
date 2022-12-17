/* eslint-disable no-param-reassign */
import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../routes';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const { token } = JSON.parse(localStorage.getItem('userData'));
    const { data } = await getData(token);
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
      const { name: userName } = JSON.parse(localStorage.getItem('userData'));
      state.channels.push({
        id: action.payload.id,
        name: action.payload.name,
        removable: action.payload.removable,
      });
      if (!document.hidden && action.payload.author === userName) {
        state.currentChannelId = action.payload.id;
      }
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
    clearError(state) {
      state.error = null;
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
        if (action.error.code === 'ERR_BAD_REQUEST') {
          localStorage.removeItem('userData');
        }
        state.loadingStatus = false;
        state.error = action.error;
      });
  },
});

export const selectAllChannels = (state) => state.channelsInfo.channels;
export const selectLastChannels = (state) => state.channelsInfo.channels.at(-1);
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
  initialization, add, change, remove, rename, clearError,
} = ChannelSlice.actions;
export default ChannelSlice.reducer;
