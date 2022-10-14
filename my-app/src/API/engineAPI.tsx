import axios from "axios";

const proxy = axios.create({
    baseURL: "http://localhost:5000"
})

const engineAPI = {
    async getEngine(msn: string) {
        const response = await proxy.get(`/engine?msn=${msn}`);
        return response;
    },

    async addEngine(engine: any) {
        const response = await proxy.post('/engine/add', engine);
        return response;
    },

    async updateEngine(engine: any) {
        const response = await proxy.post('/engine/update', engine);
        return response;
    },

    async delEngine(msn: string) {
        const response = await proxy.post('/engine/del', msn);
        return response;
    }
}

export default engineAPI;