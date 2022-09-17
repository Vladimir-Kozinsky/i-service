import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import aircraftAPI from "../../API/aircraftAPI";
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
            state.addAicraftMessage = action.payload;
        })
        builder.addCase(addAircraft.rejected, (state, action) => {
            state.addAicraftErrorMessage = action.payload as string;
        })

    },
})

export const addAircraft = createAsyncThunk(
    'aircraft/addAircraft',
    async (aircraftData: any, thunkAPI) => {
        try {
            const response = await aircraftAPI.addAircraft(aircraftData);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.statusText)
        }
    }
)

export default aircraftSlice.reducer;