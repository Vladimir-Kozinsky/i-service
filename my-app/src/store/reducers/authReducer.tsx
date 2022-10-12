import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import userAPI from '../../API/userAPI';
import { ISignUpValues } from '../../components/SignUp/SignUp';
import { IAuthState, IUser } from '../../types/types';

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
    isSuccessMessage: false,
    isSignUpError: false,
    signUpErrorMessage: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        hideAuthSuccessMessage(state: IAuthState) {
            state.isSuccessMessage = false;
        },
        clearSignUpErrorMessage(state: IAuthState) {
            state.signUpErrorMessage = '';
            state.isSignUpError = false;
        },
        signOut(state: IAuthState) {
            state.isAuth = false;
            state.user = {
                _id: null,
                email: null,
                password: null,
                firstName: null,
                lastName: null,
                position: null,
            }
            window.localStorage.removeItem("user-id");
            window.localStorage.removeItem("user-email");
            window.localStorage.removeItem("user-firstName");
            window.localStorage.removeItem("user-lastName");
            window.localStorage.removeItem("user-position");
        },
        setUser(state: IAuthState) {
            const userId: string | null = window.localStorage.getItem("user-id");
            if (userId?.length) state.user._id = userId;
            const email: string | null = window.localStorage.getItem("user-email");
            if (email?.length) state.user.email = email;
            const firstName: string | null = window.localStorage.getItem("user-firstName");
            if (firstName?.length) state.user.firstName = firstName;
            const lastName: string | null = window.localStorage.getItem("user-lastName");
            if (lastName?.length) state.user.lastName = lastName;
            const position: string | null = window.localStorage.getItem("user-position");
            if (position?.length) state.user.position = position;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state: IAuthState, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuth = true;
            state.isAuthError = false;
            if (action.payload._id) window.localStorage.setItem("user-id", action.payload._id)
            if (action.payload.email) window.localStorage.setItem("user-email", action.payload.email)
            if (action.payload.firstName) window.localStorage.setItem("user-firstName", action.payload.firstName)
            if (action.payload.lastName) window.localStorage.setItem("user-lastName", action.payload.lastName)
            if (action.payload.position) window.localStorage.setItem("user-position", action.payload.position)
        })
        builder.addCase(signIn.rejected, (state: IAuthState) => {
            state.isAuthError = true;
        })
        builder.addCase(signUp.fulfilled, (state: IAuthState) => {
            state.isSuccessMessage = true;
        })
        builder.addCase(signUp.rejected, (state: IAuthState, action: PayloadAction<any>) => {
            state.isSignUpError = true;
            state.signUpErrorMessage = action.payload
        })
        builder.addCase(checkAuth.fulfilled, (state: IAuthState, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        })
    },
})

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: { email: string, password: string }, thunkAPI) => {
        const response = await userAPI.signIn(email, password);
        return response.data.user;
    }
)

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password, firstName, lastName, position }: ISignUpValues, thunkAPI) => {
        try {
            const response = await userAPI.signUp(email, password, firstName, lastName, position);
            return response.data.message
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.statusText)
            }
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (id: string) => {
        const response = await userAPI.isAuth(id);
        return response.data.isAuth
    }
)

export const { hideAuthSuccessMessage, clearSignUpErrorMessage, signOut, setUser } = authSlice.actions
export default authSlice.reducer;