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
    },

    async addMovie(movieData) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.post(`${BASE_URL}/add-movie`, movieData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return result;
        } catch (error) {
            console.error('Error adding movie:', error);
            throw error;
        }
    },

    async deleteMovie(movieId) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.delete(`${BASE_URL}/delete-movie/${movieId}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return result;
        } catch (error) {
            console.error('Error deleting movie:', error);
            throw error;
        }
    },

    async editMovie(movieId, movieData) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.put(`${BASE_URL}/update-movie/${movieId}`, movieData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return result;
        } catch (error) {
            console.error('Error editing the movie:', error);
            throw error;
        }
    }
}