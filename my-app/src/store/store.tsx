import { configureStore } from '@reduxjs/toolkit'
import aircraftReducer from './reducers/aircraftReducer'
import authReducer from './reducers/authReducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        aircraft: aircraftReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch