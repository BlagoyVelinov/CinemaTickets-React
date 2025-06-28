import request from "../api/request";


const BASE_URL = "http://localhost:8080";

export default {
    async getAll() {
        try {
            const result = await request.get(`${BASE_URL}/api/program`);
            const movies = Object.values(result);
            return movies;
        } catch (error) {
            console.error('Error fetching all movies:', error);
            throw error;
        }
    },

    async getUpcomingPremiers() {
        try {
            const result = await request.get(`${BASE_URL}/movies/upcoming`);
            const movies = Object.values(result);
            return movies;
        } catch (error) {
            console.error('Error fetching upcoming premieres:', error);
            throw error;
        }
    },

    async getMovieById(id) {
        try {
            const result = await request.get(`${BASE_URL}/movies/${id}`);
            return result;
        } catch (error) {
            console.error(`Error fetching movie with id ${id}:`, error);
            throw error;
        }
    }
}