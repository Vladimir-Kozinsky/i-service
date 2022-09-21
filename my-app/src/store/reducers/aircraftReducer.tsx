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

export interface IAircraft {
    _id: string;
    type: string;
    msn: string;
    FH: string;
    FC: string;
    engines: IEngine[];
    apu: string;
}

export interface IAircraftState {
    aircrafts: IAircraft[];
    choosedAircraft: string;
    addAicraftMessage: string;
    addAicraftErrorMessage: string;
    isSuccessMessage: boolean;
}

const initialState = {
    aircrafts: null,
    choosedAircraft: null,
    addAicraftMessage: '',
    addAicraftErrorMessage: '',
    isSuccessMessage: false,
}

const aircraftSlice = createSlice({
    name: 'aircraft',
    initialState,
    reducers: {
        hideSuccessMessage(state) {
            state.isSuccessMessage = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addAircraft.fulfilled, (state, action) => {
            state.addAicraftMessage = action.payload;
            state.isSuccessMessage = true;
        })
        builder.addCase(addAircraft.rejected, (state, action) => {
            state.addAicraftErrorMessage = action.payload as string;
        })
        builder.addCase(getAircrafts.fulfilled, (state, action) => {
            state.aircrafts = action.payload;
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

export const getAircrafts = createAsyncThunk(
    'aircraft/getAircrafts',
    async () => {
        try {
            const response = await aircraftAPI.getAircrafts();
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
)

export const { hideSuccessMessage } = aircraftSlice.actions
export default aircraftSlice.reducer;