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
    regNum: string;
    fh: string;
    fc: string;
    engines: IEngine[];
    apu: string;
    legs?: any
}

export interface IAircraftState {
    aircrafts: IAircraft[];
    choosedAircraft: IAircraft;
    addAicraftMessage: string;
    addAicraftErrorMessage: string;
    isSuccessMessage: boolean;
}

const initialState = {
    aircrafts: [],
    choosedAircraft: {} as IAircraft,
    addAicraftMessage: '',
    addAicraftErrorMessage: '',
    isSuccessMessage: false,
    legsTotalPages: 1,
    legsCurrentPage: 1
}

const aircraftSlice = createSlice({
    name: 'aircraft',
    initialState,
    reducers: {
        hideSuccessMessage(state) {
            state.isSuccessMessage = false;
        },
        setChoosedAircraft(state, action) {
            state.choosedAircraft = action.payload
        },
        setLegsTotalPages(state, action) {
            state.legsTotalPages = action.payload
        },
        setLegsCurrentPage(state, action) {
            state.legsCurrentPage = action.payload
        }
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
        builder.addCase(updateAircraft.fulfilled, (state, action) => {
            console.log("aircraft updated")
        })
        builder.addCase(getLegs.fulfilled, (state, action) => {
            state.choosedAircraft.legs = action.payload.legs
            state.legsTotalPages = +action.payload.totalPages
            state.legsCurrentPage = +action.payload.currentPage
        })
        builder.addCase(addLeg.fulfilled, (state, action) => {
            if (state.choosedAircraft) {
                state.choosedAircraft.legs.push(action.payload)
            }
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
export const updateAircraft = createAsyncThunk(
    'aircraft/updateAircraft',
    async (aircraftData: any) => {
        try {
            const response = await aircraftAPI.updateAircraft(aircraftData);
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
)

export const getLegs = createAsyncThunk(
    'aircraft/getLegs',
    async ({ msn, from, to, page }: any) => {
        try {
            const response = await aircraftAPI.getLegs(msn, from, to, page);
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
)

export const addLeg = createAsyncThunk(
    'aircraft/addLeg',
    async ({ leg, msn }: any) => {
        try {
            const response = await aircraftAPI.addLeg(leg, msn);
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
)

export const { hideSuccessMessage, setChoosedAircraft, setLegsTotalPages, setLegsCurrentPage } = aircraftSlice.actions
export default aircraftSlice.reducer;