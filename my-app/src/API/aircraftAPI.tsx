import axios from "axios";

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
    async updateAircraft() {
        const response = await proxy.get('/aircraft/edit');
        return response;
    }
}

export default aircraftAPI;