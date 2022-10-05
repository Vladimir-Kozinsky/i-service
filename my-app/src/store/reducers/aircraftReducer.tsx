import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import aircraftAPI from "../../API/aircraftAPI";

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
    initFh: string;
    initFc: string;
    fh: string;
    fc: string;
    engines: IEngine[];
    apu: string;
    legs?: ILeg[];
}

export interface IAircraftState {
    aircrafts: IAircraft[];
    choosedAircraft: IAircraft;
    addAicraftMessage: string;
    addAicraftErrorMessage: string;
    isSuccessMessage: boolean;
}

const initialState = {
    aircrafts: [] as IAircraft[],
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
            state.aircrafts.push(action.payload);
        })
        builder.addCase(addAircraft.rejected, (state, action) => {
            state.addAicraftErrorMessage = action.payload as string;
        })
        builder.addCase(getAircrafts.fulfilled, (state, action) => {
            state.aircrafts = action.payload;
        })
        builder.addCase(updateAircraft.fulfilled, (state, action) => {
            const aircraft = state.aircrafts.find((aircraft: IAircraft) => aircraft.msn === action.payload.msn) as IAircraft | undefined;
            if (aircraft) {
                aircraft.msn = action.payload.msn;
                aircraft._id = action.payload._id;
                aircraft.type = action.payload.type;
                aircraft.regNum = action.payload.regNum;
                aircraft.initFh = action.payload.initFh;
                aircraft.initFc = action.payload.initFc;
                aircraft.fh = action.payload.fh;
                aircraft.fc = action.payload.fc;
                aircraft.engines = action.payload.engines;
                aircraft.apu = action.payload.apu;
            }
            state.isSuccessMessage = true;
        })
        builder.addCase(getLegs.fulfilled, (state, action) => {
            state.choosedAircraft.legs = action.payload.legs
            state.legsTotalPages = +action.payload.totalPages ? +action.payload.totalPages : 1;
            state.legsCurrentPage = +action.payload.currentPage
        })
        builder.addCase(addLeg.fulfilled, (state, action) => {
            if (state.choosedAircraft) {
                //state.choosedAircraft.legs.unshift(action.payload.addedLeg);
                state.choosedAircraft.fh = action.payload.fh;
                state.choosedAircraft.fc = action.payload.fc;
            }
            state.addAicraftMessage = action.payload;
            state.isSuccessMessage = true;
            const aircraft = state.aircrafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn) as IAircraft | undefined;
            if (aircraft) {
                aircraft.fh = action.payload.fh;
                aircraft.fc = action.payload.fc;
            }
        })
        builder.addCase(delLeg.fulfilled, (state, action) => {
            state.isSuccessMessage = true
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
export const delLeg = createAsyncThunk(
    'aircraft/delLeg',
    async (legId: string) => {
        try {
            const response = await aircraftAPI.delLeg(legId);
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
)

export const { hideSuccessMessage, setChoosedAircraft, setLegsTotalPages, setLegsCurrentPage } = aircraftSlice.actions
export default aircraftSlice.reducer;