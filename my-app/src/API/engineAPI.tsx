import axios from "axios";
import { FormValues } from "../components/Aircrafts/InstallEngine/InstallEngine";
import { RemEngFormDataType } from "../components/Aircrafts/RemovalEngine/RemovalEngine";

const proxy = axios.create({
    baseURL: "http://localhost:5000"
})

const engineAPI = {
    async getEngines() {
        const response = await proxy.get(`/engines`);
        return response;
    },
    async getAvailEngines() {
        const response = await proxy.get(`/engines/available`);
        return response;
    },

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
    },

    async installEngine(instData: FormValues) {
        const response = await proxy.post('/engine/install', instData);
        return response;
    },

    async removeEngine(remData: RemEngFormDataType) {
        const response = await proxy.post('/engine/remove', remData);
        return response;
    }
}

export default engineAPI;