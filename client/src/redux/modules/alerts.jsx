import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
    msg: '',
    type: ''
};

const alertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        showAlertMessage(state, action) {
            state.show = true;
            state.msg = action.payload.msg;
            state.type = action.payload.type;
        },
        clearAlertMessage(state) {
            state.show = false;
            state.msg = '';
            state.type = '';
        }
    }
});

export const { showAlertMessage, clearAlertMessage } = alertSlice.actions;

export default alertSlice.reducer;
