import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userAPI from "../../API/userAPI";

interface IEngine {
    _id: string;
    pos: number;
    msn: string;
}

interface ILeg {
    _id: string;
    depDate: string;
    flightNumber: string;
    from: string;
    to: string;
    blockOff: string;
    takeOff: string;
    landing: string;
    blockOn: string;
    flightTime: string;
    blockTime: string;
    fh: string;
    fc: string;
}

interface IAircraft {
    _id: string;
    type: string;
    msn: string;
    FH: string;
    FC: string;
    engines: IEngine[];
    legs: ILeg[];
}

interface IAircraftState {
    aircrafts: IAircraft[];
    choosedAircraft: string;
    addAicraftMessage: string;
    addAicraftErrorMessage: string;
}

const initialState = {
    aircrafts: null,
    choosedAircraft: null,
    addAicraftMessage: '',
    addAicraftErrorMessage: '',
}

const aircraftSlice = createSlice({
    name: 'aircraft',
    initialState,
    reducers: {
        // clearSignUpMessage(state) {
        //     state.signUpMessage = '';
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(addAircraft.fulfilled, (state, action) => {

        })
        // builder.addCase(signIn.rejected, (state, action) => {
        //     state.isAuthError = true;
        // })
    },
})

export const addAircraft = createAsyncThunk(
    'aircraft/addAircraft',
    async ({ email, password }: { email: string, password: string }, thunkAPI) => {
        const response = await userAPI.signIn(email, password);
        return response.data;
    }
)

export default aircraftSlice.reducer;