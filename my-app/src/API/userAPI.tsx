import axios from "axios";

const proxy = axios.create({
    baseURL: "http://localhost:5000"
})

const userAPI = {
    async signIn(email: string, password: string) {
        console.log(email, password);
        const response = await proxy.post('/auth', { email, password });
        return response.data;
    }
}

export default userAPI;