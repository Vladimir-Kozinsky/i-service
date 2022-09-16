import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import userAPI from '../../API/userAPI';
import { ISignUpValues } from '../../components/SignUp/SignUp';

interface IUser {
    _id: string | null,
    email: string | null,
    password: string | null;
    firstName: string | null;
    lastName: string | null;
    position: string | null;
}

interface IAuthState {
    user: IUser;
    isAuth: boolean;
    isAuthError: boolean;
    signUpMessage: string;
    isSignUpError: boolean;
}

const initialState: IAuthState = {
    user: {
        _id: null,
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        position: null,
    },
    isAuth: false,
    isAuthError: false,
    signUpMessage: '',
    isSignUpError: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuth = true;
            state.isAuthError = false;
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.isAuthError = true;
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.signUpMessage = action.payload;
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.isSignUpError = true;
        })
    },
})

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: { email: string, password: string }, thunkAPI) => {
        const response = await userAPI.signIn(email, password);
        return response.data;
    }
)

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password, firstName, lastName, position }: ISignUpValues, thunkAPI) => {
        const response = await userAPI.signUp(email, password, firstName, lastName, position);
        return response.data.message
    }
)

export default authSlice.reducer;