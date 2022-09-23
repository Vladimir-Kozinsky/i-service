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

export interface IAuthState {
    user: IUser;
    isAuth: boolean;
    isAuthError: boolean;
    isSuccessMessage: boolean;
    isSignUpError: boolean;
    signUpErrorMessage: string;
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
    isSuccessMessage: false,
    isSignUpError: false,
    signUpErrorMessage: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        hideAuthSuccessMessage(state) {
            state.isSuccessMessage = false;
        },
        clearSignUpErrorMessage(state) {
            state.signUpErrorMessage = '';
            state.isSignUpError = false;
        },
        signOut(state) {
            state.isAuth = false;
            state.user = {
                _id: null,
                email: null,
                password: null,
                firstName: null,
                lastName: null,
                position: null,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state: IAuthState, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuth = true;
            state.isAuthError = false;
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.isAuthError = true;
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isSuccessMessage = true;
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.isSignUpError = true;
            state.signUpErrorMessage = action.payload as string
        })
        builder.addCase(checkAuth.fulfilled, (state, action) => {
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
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.statusText)
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

export const { hideAuthSuccessMessage, clearSignUpErrorMessage, signOut } = authSlice.actions
export default authSlice.reducer;