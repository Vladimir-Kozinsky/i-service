import axios from "axios";

const proxy = axios.create({
    baseURL: "http://localhost:5000"
})

const aircraftAPI = {
    async addAircraft(aircraftData: any) {
        console.log(aircraftData)
        // const response = await proxy.post('/aircraft/add', aircraftData);
        // return response;
        return { data: 'succes aded' }
    },
}

export default aircraftAPI;