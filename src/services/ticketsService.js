import request from "../api/request";


const BASE_URL = "http://localhost:8080/api/tickets";

export default {
    async getUpcomingTickets(userId) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.get(`${BASE_URL}/upcoming-tickets/user/${userId}`, null, {
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
            const result = await request.get(`${BASE_URL}/expired-tickets/user/${userId}`, null, {
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
            const result = await request.get(`${BASE_URL}/ticket/${ticketId}`, null, {
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
}