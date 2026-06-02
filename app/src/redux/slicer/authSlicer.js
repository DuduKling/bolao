import { createSlice } from '@reduxjs/toolkit';

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replaceAll('-', '+').replaceAll('_', '/');
    const jsonPayload = decodeURIComponent(globalThis.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.codePointAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const authSlicer = createSlice({
    name: 'auth',
    initialState: {
        userUuid: '',
        userName: '',
        userPhoneNumber: '',
        userRole: '',
        userJWT: '',
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        updateJWT: (state, action) => {
            let parsedJWT = { data: {} };
            if (action.payload.userJWT) {
                parsedJWT = parseJwt(action.payload.userJWT);
            }
            state.userUuid = parsedJWT.data.uuid || '';
            state.userName = parsedJWT.data.name || '';
            state.userPhoneNumber = parsedJWT.data.phoneNumber || '';
            state.userRole = parsedJWT.data.role || '';
            state.userJWT = action.payload.userJWT || '';

            if (action.payload.userJWT) {
                try {
                    localStorage.setItem('userJWT', action.payload.userJWT);
                } catch (e) {
                    console.warn('Failed to persist JWT to localStorage:', e);
                }
            } else {
                try {
                    localStorage.removeItem('userJWT');
                } catch (e) {
                    console.warn('Failed to remove JWT from localStorage:', e);
                }
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateJWT } = authSlicer.actions;

export default authSlicer.reducer;