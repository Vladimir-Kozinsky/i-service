import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface authState {
    email: string | null;
    password: string | null;
}

const initialState = { email: null, password: null } as authState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signin(state, action: PayloadAction<authState>) {
            state.email = action.payload.email
            state.password = action.payload.password
        },
    },
})

export const { signin } = authSlice.actions
export default authSlice.reducer