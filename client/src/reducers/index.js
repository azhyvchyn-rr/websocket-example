import {combineReducers} from 'redux';
import messageReducer from './message.reducer';

export default combineReducers({
    messages: messageReducer,
});
