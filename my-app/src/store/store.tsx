import { configureStore } from '@reduxjs/toolkit'
import aircraftReducer from './reducers/aircraftReducer'
import authReducer from './reducers/authReducer'
import engineReducer from './reducers/engineReducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        aircraft: aircraftReducer,
        engine: engineReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch