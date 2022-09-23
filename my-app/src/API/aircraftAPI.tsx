import axios from "axios";
import { IAircraft } from "../store/reducers/aircraftReducer";

const proxy = axios.create({
    baseURL: "http://localhost:5000"
})

const aircraftAPI = {
    async addAircraft(aircraftData: any) {
        const response = await proxy.post('/aircraft/add', aircraftData);
        return response;
    },

    async getAircrafts() {
        const response = await proxy.get('/aircrafts');
        return response;
    },
    async updateAircraft(aircraftData: any) {
        const response = await proxy.post('/aircraft/edit', aircraftData);
        return response;
    }
}

export default aircraftAPI;