import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import aircraftAPI from "../../API/aircraftAPI";
import apuAPI from "../../API/apuAPI";
import engineAPI from "../../API/engineAPI";
import { IAircraftFormValues } from "../../components/Aircrafts/AircraftForm/AircraftForm";
import { ApuInstallValues } from "../../components/Aircrafts/InstallApu/InstallApu";
import { FormValues } from "../../components/Aircrafts/InstallEngine/InstallEngine";
import { RemApuFormDataType } from "../../components/Aircrafts/RemovalApu/RemovalApu";
import { RemEngFormDataType } from "../../components/Aircrafts/RemovalEngine/RemovalEngine";
import { IApu } from "../../types/types";

export interface IInstEngine {
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
    manufDate: string;
    regNum: string;
    initFh: string;
    initFc: string;
    fh: string;
    fc: string;
    overhaulNum: number;
    lastOverhaulDate: string;
    tsnAtlastOverhaul: string;
    csnAtlastOverhaul: string;
    tlp: string;
    tlt: string;
    tlc: string;
    pbo: string;
    tbo: string;
    cbo: string;
    engines: IInstEngine[];
    apu?: IApu;
    legs?: ILeg[];
}

export interface IAircraftState {
    aircrafts: IAircraft[];
    choosedAircraft: IAircraft;
    addAicraftMessage: string;
    addAicraftErrorMessage: string;
    isSuccessMessage: boolean;
    errorMessage: string;
}

const initialState = {
    aircrafts: [] as IAircraft[],
    choosedAircraft: {} as IAircraft,
    addAicraftMessage: '',
    addAicraftErrorMessage: '',
    isSuccessMessage: false,
    legsTotalPages: 1,
    legsCurrentPage: 1,
    errorMessage: ''
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
            if (state.choosedAircraft && state.choosedAircraft.legs) {
                const newLegs = state.choosedAircraft.legs.filter((leg: ILeg) => leg._id !== action.payload.legId)
                state.choosedAircraft.legs = newLegs;
            }
            state.isSuccessMessage = true
        })
        builder.addCase(editLeg.fulfilled, (state, action) => {
            if (state.choosedAircraft) {
                state.choosedAircraft.fh = action.payload.fh;
                state.choosedAircraft.fc = action.payload.fc;
            }
            state.addAicraftMessage = action.payload;
            state.isSuccessMessage = true;
            const aircraft = state.aircrafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn) as IAircraft | undefined;
            if (aircraft) {
                aircraft.fh = action.payload.fh;
                aircraft.fc = action.payload.fc;

                const legIndex = state.choosedAircraft.legs?.findIndex((leg) => {
                    return leg._id === action.payload.updatedLeg._id
                });
                if (legIndex !== undefined && legIndex >= 0 && state.choosedAircraft.legs)
                    state.choosedAircraft.legs[legIndex] = action.payload.updatedLeg;
            }
        })
        builder.addCase(installEngine.fulfilled, (state: IAircraftState, action: PayloadAction<IInstEngine>) => {
            const udatedEng: IInstEngine = action.payload;
            const index = state.choosedAircraft.engines.findIndex((eng) => {
                return eng.msn === udatedEng.msn || eng.pos === udatedEng.pos
            });
            if (index >= 0) {
                state.choosedAircraft.engines.splice(index, 1, udatedEng)
            } else {
                state.choosedAircraft.engines.push(udatedEng);
            }
            const aircraft: IAircraft | undefined = state.aircrafts.find((a: IAircraft) => a.msn === state.choosedAircraft.msn);
            if (aircraft) {
                const i = aircraft.engines.findIndex((eng) => {
                    return eng.msn === udatedEng.msn || eng.pos === udatedEng.pos
                })
                if (i >= 0) {
                    aircraft.engines.splice(i, 1, udatedEng)
                } else {
                    aircraft.engines.push(udatedEng);
                }
            }
            state.isSuccessMessage = true;
        })
        builder.addCase(installEngine.rejected, (state: IAircraftState, action) => {
            state.errorMessage = action.payload as string;
        })
        builder.addCase(removeEngine.fulfilled, (state: IAircraftState, action: PayloadAction<IInstEngine>) => {
            const udatedEng: IInstEngine = action.payload;
            const index = state.choosedAircraft.engines.findIndex((eng) => {
                return eng.msn === udatedEng.msn || eng.pos === udatedEng.pos
            });
            if (index >= 0) state.choosedAircraft.engines.splice(index, 1)

            const aircraft: IAircraft | undefined = state.aircrafts.find((a: IAircraft) => a.msn === state.choosedAircraft.msn);
            if (aircraft) {
                const i = aircraft.engines.findIndex((eng) => {
                    return eng.msn === udatedEng.msn || eng.pos === udatedEng.pos
                })
                if (i >= 0) aircraft.engines.splice(i, 1, udatedEng)
            }
            state.isSuccessMessage = true;
        })
        builder.addCase(removeEngine.rejected, (state: IAircraftState, action) => {
            state.errorMessage = action.payload as string;
        })
        builder.addCase(installApu.fulfilled, (state: IAircraftState, action: PayloadAction<IApu>) => {
            const udatedApu: IApu = action.payload;
            state.choosedAircraft.apu = udatedApu;
            const aircraft: IAircraft | undefined = state.aircrafts.find((a: IAircraft) => a.msn === state.choosedAircraft.msn);
            if (aircraft) {
                aircraft.apu = udatedApu;
            }
            state.isSuccessMessage = true;
        })
        builder.addCase(installApu.rejected, (state: IAircraftState, action) => {
            state.errorMessage = action.payload as string;
        })

        builder.addCase(removeApu.fulfilled, (state: IAircraftState, action: PayloadAction<IApu>) => {
            state.choosedAircraft.apu = {
                type: '',
                msn: '',
                manufDate: '',
                tsn: '',
                csn: '',
                onAircraft: '',
                installDate: '',
                aircraftTsn: '',
                aircraftCsn: '',
                engTsn: '',
                engCsn: '',
                overhaulNum: 0,
                lastOverhaulDate: '',
                tsnAtlastOverhaul: '',
                csnAtlastOverhaul: '',
                tlp: '',
                tlt: '',
                tlc: '',
                pbo: '',
                tbo: '',
                cbo: '',
            }

            const aircraft: IAircraft | undefined = state.aircrafts.find((a: IAircraft) => a.msn === state.choosedAircraft.msn);
            if (aircraft) {
                aircraft.apu = {
                    type: '',
                    msn: '',
                    manufDate: '',
                    tsn: '',
                    csn: '',
                    onAircraft: '',
                    installDate: '',
                    aircraftTsn: '',
                    aircraftCsn: '',
                    engTsn: '',
                    engCsn: '',
                    overhaulNum: 0,
                    lastOverhaulDate: '',
                    tsnAtlastOverhaul: '',
                    csnAtlastOverhaul: '',
                    tlp: '',
                    tlt: '',
                    tlc: '',
                    pbo: '',
                    tbo: '',
                    cbo: '',
                }
                state.isSuccessMessage = true;
            }
        })
    },
})

export const addAircraft = createAsyncThunk(
    'aircraft/addAircraft',
    async (aircraftData: IAircraftFormValues, thunkAPI) => {
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
    async ({ msn, legId }: any) => {
        try {
            const response = await aircraftAPI.delLeg(msn, legId);
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
)
export const editLeg = createAsyncThunk(
    'aircraft/editLeg',
    async ({ msn, legId, updatedLeg }: any) => {
        try {
            const response = await aircraftAPI.editLeg(msn, legId, updatedLeg);
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
)

export const installEngine = createAsyncThunk(
    'aircraft/installEngine',
    async (instData: FormValues) => {
        const response = await engineAPI.installEngine(instData);
        return response.data
    }
)

export const removeEngine = createAsyncThunk(
    'aircraft/removeEngine',
    async (removalData: RemEngFormDataType) => {
        const response = await engineAPI.removeEngine(removalData);
        return response.data
    }
)


export const installApu = createAsyncThunk(
    'aircraft/installApu',
    async (instData: ApuInstallValues) => {
        const response = await apuAPI.installApu(instData);
        return response.data
    }
)

export const removeApu = createAsyncThunk(
    'aircraft/removeApu',
    async (removalData: RemApuFormDataType) => {
        const response = await apuAPI.removeApu(removalData);
        return response.data
    }
)

export const { hideSuccessMessage, setChoosedAircraft, setLegsTotalPages, setLegsCurrentPage } = aircraftSlice.actions
export default aircraftSlice.reducer;