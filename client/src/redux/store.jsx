// redux store, I am using redux version 4
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules/';
// Correct way to import thunk from redux-thunk

const store = configureStore({
    reducer: rootReducer,
    preloadedState: {}, // This is how you would pass initial state
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
});


export default store