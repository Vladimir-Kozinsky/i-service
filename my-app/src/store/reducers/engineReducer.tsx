import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import engineAPI from "../../API/engineAPI"
import { FormValues } from "../../components/Aircrafts/InstallEngine/InstallEngine";
import { IEngine } from "../../types/types"

interface IEngineState {
    engines: IEngine[];
    errorMessage: string;
    isSuccessMessage: boolean;
}

const initialState = {
    engines: [],
    errorMessage: '',
    isSuccessMessage: false
    // type: null,
    // msn: null,
    // manufDate: null,
    // hsn: null,
    // csn: null,
    // overhaulNum: null,
    // lastOverhaulDate: null,
    // totalLifeTime: null,
    // totalLifeHours: null,
    // totalLifeCycles: null,
    // tbo: null,
    // hbo: null,
    // cbo: null,
    // tso: null,
    // hso: null,
    // cso: null,
} as IEngineState


const engineSlice = createSlice({
    name: 'engine',
    initialState,
    reducers: {
        hideEngineSuccessMessage(state: IEngineState) {
            state.isSuccessMessage = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEngines.fulfilled, (state: IEngineState, action: PayloadAction<IEngine[]>) => {
            state.engines = action.payload;
        })
        builder.addCase(getEngines.rejected, (state: IEngineState, action) => {
            state.errorMessage = action.payload as string;
        })

        builder.addCase(addEngine.fulfilled, (state: IEngineState, action: PayloadAction<IEngine>) => {
            state.engines.push(action.payload)
            state.isSuccessMessage = true;
        })

        builder.addCase(addEngine.rejected, (state: IEngineState, action) => {
            state.errorMessage = action.payload as string;
        })
        
    },
})


export const getEngines = createAsyncThunk(
    'engine/getEngines',
    async () => {
        const response = await engineAPI.getEngines();
        return response.data
    }
)

export const addEngine = createAsyncThunk(
    'engine/addEngine',
    async (engine: IEngine) => {
        const response = await engineAPI.addEngine(engine);
        return response.data
    }
)



export const { hideEngineSuccessMessage } = engineSlice.actions
export default engineSlice.reducer;

