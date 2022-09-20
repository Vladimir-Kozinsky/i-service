import axios from "axios";

const proxy = axios.create({
    baseURL: "http://localhost:5000"
})

const aircraftAPI = {
    async addAircraft(aircraftData: any) {
        const response = await proxy.post('/aircraft/add', aircraftData);
        return response;
    },
}

export default aircraftAPI;