import { createSlice } from '@reduxjs/toolkit';

const ChannelSlice = createSlice({
    name: 'channelsInfo',
    initialState: {
        channels: [],
        currentChannelId: 1
    },
    reducers: {
        initialization(state, action) {
            state.currentChannelId = 1;
            state.channels = action.payload.channels;
        },
        add(state, action) {
            state.channels.push({
                id: action.payload.id,
                name: action.payload.name,
                removable: action.payload.removable
            });
            state.currentChannelId = action.payload.id;
        },
        remove(state, action) {
            state.channels = state.channels.filter((item) => item.id !== action.payload.id)
            if (state.currentChannelId === action.payload.id) {
                state.currentChannelId = 1;
            }
        },
        change(state, action) {
            state.currentChannelId = action.payload.id;
        },
        rename(state, action) {
            state.channels = [...state.channels.filter((item) => item.id !== action.payload.id), action.payload]
        },
    },
});

export const { initialization, add, change, remove, rename } = ChannelSlice.actions;
export default ChannelSlice.reducer;