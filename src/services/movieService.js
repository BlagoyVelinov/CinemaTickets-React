import request from "../api/request";


const BASE_URL = "http://localhost:8081/api/movies";

export default {
    async getAll() {
        try {
            const result = await request.get(`${BASE_URL}`);
            const movies = Object.values(result);
            return movies;
        } catch (error) {
            console.error('Error fetching all movies:', error);
            throw error;
        }
    },

    async getUpcomingPremiers() {
        try {
            const result = await request.get(`${BASE_URL}/upcoming`);
            const movies = Object.values(result);
            return movies;
        } catch (error) {
            console.error('Error fetching upcoming premieres:', error);
            throw error;
        }
    },

    async getMovieById(id) {
        try {
            const result = await request.get(`${BASE_URL}/movie/${id}`);
            return result;
        } catch (error) {
            console.error(`Error fetching movie with id ${id}:`, error);
            throw error;
        }
    }
}