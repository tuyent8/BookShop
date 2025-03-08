import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    isAdmin: false
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            console.log("Payload nhận được:", action.payload);
            const { _id = '', name = '', email = '', access_token = '', address = '', avatar = '', phone = '', isAdmin } = action.payload
            state.name = name;
            state.email = email;
            state.address = address;
            state.avatar = avatar;
            state.phone = phone;
            state.id = _id;
            state.access_token = access_token;
            state.isAdmin = true;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.avatar = '';
            state.phone = '';
            state.id = '';
            state.access_token = '';
            state.access_token = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer