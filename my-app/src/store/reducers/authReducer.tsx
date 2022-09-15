import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userAPI from '../../API/userAPI';

interface IUser {
    id: string | null,
    email: string | null,
    password: string | null;
    firstName: string | null;
    lastName: string | null;
    position: string | null;
}

interface IAuthState {
    user: IUser
}

const initialState: IAuthState = {
    user: {
        id: null,
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        position: null,
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    },
})

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: { email: string, password: string }, thunkAPI) => {
        const response = await userAPI.signIn(email, password);
        return response.data
    }
)

export default authSlice.reducer