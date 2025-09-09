import request from "../api/request";


const BASE_URL = "http://localhost:8080/api/tickets";

export default {
    async getUpcomingTickets() {
        try {
            const result = await request.get(`${BASE_URL}/upcoming-tickets/user/${id}`);
            const movies = Object.values(result);
            return movies;
        } catch (error) {
            console.error('Error fetching upcoming tickets:', error);
            throw error;
        }
    },

    async getExpiredTickets() {
        try {
            const result = await request.get(`${BASE_URL}/expired-tickets/user/${id}`);
            const tickets = Object.values(result);
            return tickets;
        } catch (error) {
            console.error('Error fetching expired tickets: ', error);
            throw error;
        }
    },

    async getTicketById(id) {
        try {
            const result = await request.get(`${BASE_URL}/ticket/${id}`);
            return result;
        } catch (error) {
            console.error(`Error fetching ticket with id ${id}:`, error);
            throw error;
        }
    },
}