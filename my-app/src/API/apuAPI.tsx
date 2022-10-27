import axios from "axios";
import { FormValues } from "../components/Aircrafts/InstallEngine/InstallEngine";
import { RemApuFormDataType } from "../components/Aircrafts/RemovalApu/RemovalApu";
import { RemEngFormDataType } from "../components/Aircrafts/RemovalEngine/RemovalEngine";
import { IApu } from "../types/types";

const proxy = axios.create({
    baseURL: "http://localhost:5000"
})

const apuAPI = {
    async getApus() {
        const response = await proxy.get(`/apus`);
        return response;
    },
    async getAvailApus() {
        const response = await proxy.get(`/apus/available`);
        return response;
    },

    async getApu(msn: string) {
        const response = await proxy.get(`/apus?msn=${msn}`);
        return response;
    },

    async addApu(apu: IApu) {
        const response = await proxy.post('/apu/add', apu);
        return response;
    },

    async updateEngine(apu: IApu) {
        const response = await proxy.post('/apu/update', apu);
        return response;
    },

    async delEngine(msn: string) {
        const response = await proxy.post('/apu/del', msn);
        return response;
    },

    async installApu(instData: any) {
        const response = await proxy.post('/apu/install', instData);
        return response;
    },

    async removeApu(remData: RemApuFormDataType) {
        const response = await proxy.post('/apu/remove', remData);
        return response;
    }
}

export default apuAPI;