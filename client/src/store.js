import {configureStore} from '@reduxjs/toolkit';
import rootReducer from 'reducers';

const createStore = () => configureStore({
    reducer: rootReducer,
    devTools: true
});

export default createStore();
