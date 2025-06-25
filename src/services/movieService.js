import request from "../api/request";


const BASE_URL = "http://localhost:8080";

export default {
    async getAll() {
        const result = await request.get(`${BASE_URL}/api/program`);

        const movies = Object.values(result);

        return movies;
    },

    async getUpcomingPremiers() {
        const result = await request.get(`${BASE_URL}/movies/upcoming`);

        const movies = Object.values(result);

        return movies;
    },

    async getMovieById(id) {
        const result = await request.get(`${BASE_URL}/movies/${id}`);
        return result;
    }
}