import axios from "axios";

const proxy = axios.create({
    baseURL: "http://localhost:5000"
})

const userAPI = {
    async signIn(email: string, password: string) {
        const response = await proxy.post('/auth', { email, password });
        return response.data;
    },
    async signUp(email: string, password: string, firstName: string, lastName: string, position: string) {
        const response = await proxy.post('/signup', { email, password, firstName, lastName, position });
        return response.data;
    }
}

export default userAPI;