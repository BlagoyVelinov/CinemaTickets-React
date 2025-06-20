import request from "../api/request";


const BASE_URL = "http://localhost:8080";

export default {
    async getAll() {
        const result = await request.get(`${BASE_URL}/api/program`);

        console.log(result);
        

        const movies = Object.values(result);

        return movies;
    }
}