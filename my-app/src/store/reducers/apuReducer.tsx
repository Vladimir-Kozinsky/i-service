import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import apuAPI from "../../API/apuAPI";
import { IApu } from "../../types/types"

interface IApuState {
    apus: IApu[];
    errorMessage: string;
    isSuccessMessage: boolean;
}

const initialState = {
    apus: [],
    errorMessage: '',
    isSuccessMessage: false
} as IApuState


const apuSlice = createSlice({
    name: 'apu',
    initialState,
    reducers: {
        hideEngineSuccessMessage(state: IApuState) {
            state.isSuccessMessage = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getApus.fulfilled, (state: IApuState, action: PayloadAction<IApu[]>) => {
            state.apus = action.payload;
        })
        builder.addCase(getApus.rejected, (state: IApuState, action) => {
            state.errorMessage = action.payload as string;
        })

        builder.addCase(addApu.fulfilled, (state: IApuState, action: PayloadAction<IApu>) => {
            state.apus.push(action.payload)
            state.isSuccessMessage = true;
        })

        builder.addCase(addApu.rejected, (state: IApuState, action) => {
            state.errorMessage = action.payload as string;
        })

    },
})


export const getApus = createAsyncThunk(
    'apu/getApus',
    async () => {
        const response = await apuAPI.getApus();
        return response.data
    }
)

export const addApu = createAsyncThunk(
    'apu/addApu',
    async (apu: IApu) => {
        const response = await apuAPI.addApu(apu);
        return response.data
    }
)



export const { hideEngineSuccessMessage } = apuSlice.actions
export default apuSlice.reducer;

