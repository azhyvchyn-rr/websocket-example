import {createSlice} from '@reduxjs/toolkit';

const REDUCER_NAME = 'messages';

const messageSlice = createSlice({
    name: REDUCER_NAME,
    initialState: {
        list: []
    },
    reducers: {
        addMessage: (state, action) => {
            state.list.push(action.payload);
        }
    }
});

const messageReducer = messageSlice.reducer;
const {addMessage} = messageSlice.actions;

const messagesListSelector = (state) => state.messages.list;

export {addMessage};
export {messagesListSelector};
export default messageReducer;
