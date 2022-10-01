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
    async getAircraft(msn: string) {
        const response = await proxy.get('/aircraft');
        return response;
    },
    async updateAircraft(aircraftData: any) {
        const response = await proxy.post('/aircraft/edit', aircraftData);
        return response;
    },
    async getLegs(msn: string, from: string, to: string, page: number) {
        const response = await proxy.get(`/aircraft/legs?msn=${msn}&from=${from}&to=${to}&page=${page}`);
        return response;
    },
    async addLeg(leg: any, msn: string) {
        const response = await proxy.post('/aircraft/legs/add', { leg, msn });
        return response;
    },
}

export default aircraftAPI;