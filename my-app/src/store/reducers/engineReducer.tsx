import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import engineAPI from "../../API/engineAPI"
import { FormValues } from "../../components/Aircrafts/InstallEngine/InstallEngine";
import { IEngine } from "../../types/types"

interface IEngineState {
    engines: IEngine[];
    errorMessage: string;
    isSuccessMessage: boolean;
    choosedEngine: IEngine | null;
}

const initialState: IEngineState = {
    engines: [],
    errorMessage: '',
    isSuccessMessage: false,
    choosedEngine: null,
}


const engineSlice = createSlice({
    name: 'engine',
    initialState,
    reducers: {
        hideEngineSuccessMessage(state: IEngineState) {
            state.isSuccessMessage = false;
        },
        setChoosedEngine(state, action) {
            state.choosedEngine = action.payload
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
        builder.addCase(deleteEngine.fulfilled, (state, action) => {
            state.isSuccessMessage = true;
            const engineIndex = state.engines.findIndex((engine: IEngine) => engine.msn === action.payload.msn);
            if (engineIndex >= 0) {
                state.engines.splice(engineIndex, 1);
            }
        })
        builder.addCase(deleteEngine.rejected, (state, action) => {
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

export const deleteEngine = createAsyncThunk(
    'engine/deleteEngine',
    async (engineId: string, thunkAPI) => {
        try {
            const response = await engineAPI.delEngine(engineId);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.statusText)
        }
    }
)



export const { hideEngineSuccessMessage, setChoosedEngine } = engineSlice.actions
export default engineSlice.reducer;

