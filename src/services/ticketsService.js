import request from "../api/request";


const BASE_URL = import.meta.env.VITE_CINEMA_AZURE_BASE_URL || import.meta.env.VITE_CINEMA_BASE_URL;

export default {
    async getUpcomingTickets(userId) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.get(`${BASE_URL}/tickets/upcoming-tickets/user/${userId}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
            });
            const tickets = Object.values(result);
            return tickets;
        } catch (error) {
            console.error('Error fetching upcoming tickets:', error);
            throw error;
        }
    },

    async getExpiredTickets(userId) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.get(`${BASE_URL}/tickets/expired-tickets/user/${userId}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
            });
            const tickets = Object.values(result);
            return tickets;
        } catch (error) {
            console.error('Error fetching expired tickets: ', error);
            throw error;
        }
    },

    async getTicketById(ticketId) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.get(`${BASE_URL}/tickets/ticket/${ticketId}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
            });
            return result;
        } catch (error) {
            console.error(`Error fetching ticket with id ${ticketId}:`, error);
            throw error;
        }
    },

    async deleteExpiredTicketById(ticketId) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.delete(`${BASE_URL}/tickets/ticket-delete/${ticketId}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
            });
            return result;
        } catch (error) {
            console.error(`Error deleting ticket with id ${ticketId}:`, error);
            throw error;
        }
    },
}