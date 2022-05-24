import {configureStore} from '@reduxjs/toolkit';
import articleReducer from './articleSlice'
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        article: articleReducer,
        auth: authReducer
    },
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;