import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('userData');
const tokenFromStorage = localStorage.getItem('authToken');
const user = userFromStorage ? JSON.parse(userFromStorage) : null;

const initialState = {
user,
token: tokenFromStorage || null,
isLoggedIn: !!tokenFromStorage,
isAdmin: user?.email === 'admin@gmail.com',
isBiz: user?.biz === true || user?.email === 'admin@gmail.com',
};

const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
login(state, action) {
    const { user, token } = action.payload;
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('authToken',token);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', String(user.email === 'admin@gmail.com'));
    localStorage.setItem('isBiz', String(user.biz === true || user.email === 'admin@gmail.com'));
    state.user = user;
    state.token = token;
    state.isLoggedIn = true;
    state.isAdmin = user.email === 'admin@gmail.com';
    state.isBiz = user.biz === true || user.email === 'admin@gmail.com';
},
logout(state) {
    localStorage.clear();
    state.user = null;
    state.token = null;
    state.isLoggedIn = false;
    state.isAdmin = false;
    state.isBiz = false;
},
},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
