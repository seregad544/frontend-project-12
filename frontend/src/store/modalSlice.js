import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modalInfo',
    initialState: {
      isOpened: false,
      type: null,
      extra: null
    },
    reducers: {
      addChanel(state, action) {
        state.isOpened = true;
        state.type = "addChannel";
      },
      removeChanel(state, action) {
        state.isOpened = true;
        state.type = "removeChanel";
        console.log(action.payload)
        state.extra = action.payload;
      },
      renameChanel(state, action) {
        state.isOpened = true;
        state.type = "renameChanel";
        state.extra = action.payload;
      },
      closeModal(state, action) {
        state.isOpened = false;
        state.type = null;
        state.extra = null;
      }
    }
});

export const { addChanel, closeModal, removeChanel, renameChanel } = modalSlice.actions;
export default modalSlice.reducer;