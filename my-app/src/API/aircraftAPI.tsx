import axios from "axios";

const proxy = axios.create({
    baseURL: "https://i-service-backend.herokuapp.com"
    // baseURL: "http://localhost:5000"
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
    async getPrintLegs(msn: string, from: string, to: string) {
        const response = await proxy.get(`/aircraft/legs/print?msn=${msn}&from=${from}&to=${to}`);
        return response;
    },

    async addLeg(leg: any, msn: string) {
        const response = await proxy.post('/aircraft/legs/add', { leg, msn });
        return response;
    },
    async delLeg(msn: string, legId: string) {
        const response = await proxy.post('/aircraft/legs/del', { msn, legId });
        return response;
    },
    async editLeg(msn: string, legId: string, leg: any) {
        const response = await proxy.post('/aircraft/legs/edit', { msn, legId, leg });
        return response;
    },
}

export default aircraftAPI;