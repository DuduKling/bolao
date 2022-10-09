import { configureStore } from '@reduxjs/toolkit';
import authSlicerReducer from './slicer/authSlicer';

export default configureStore({
    reducer: {
        auth: authSlicerReducer,
    },
});
