import { createSlice } from '@reduxjs/toolkit';

export const authSlicer = createSlice({
    name: 'auth',
    initialState: {
        userName: '',
        userEmail: '',
        userId: '',
        userImg: '',
        userRole: '',
        userJWT: '',
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        updateJWT: (state, action) => {
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
            state.userId = action.payload.userId;
            state.userImg = action.payload.userImg;
            state.userRole = action.payload.userRole;
            state.userJWT = action.payload.userJWT;
        },
        updateImage: (state, action) => {
            state.userImg = action.payload.userImg;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateJWT, updateImage } = authSlicer.actions;

export default authSlicer.reducer;