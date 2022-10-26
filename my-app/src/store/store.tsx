import { configureStore } from '@reduxjs/toolkit'
import aircraftReducer from './reducers/aircraftReducer'
import apuReducer from './reducers/apuReducer'
import authReducer from './reducers/authReducer'
import engineReducer from './reducers/engineReducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        aircraft: aircraftReducer,
        engine: engineReducer,
        apu: apuReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch