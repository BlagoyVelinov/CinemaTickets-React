import request from "../api/request";


const BASE_URL = "http://localhost:8080/api/offers";

export default {
    async createOffer(offerData) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.post(`${BASE_URL}/add-offer`, offerData, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
            return result;
        } catch (error) {
            console.error('Error creating offer:', error);
            throw error;
        }
    },

    async deleteOffer(offerId) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.delete(`${BASE_URL}/delete-offer/${offerId}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return result;
        } catch (error) {
            console.error('Error deleting offer:', error);
            throw error;
        }
    },

    async editOffer(offerId, offerData) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.put(`${BASE_URL}/edit-offer/${offerId}`, offerData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return result;
        } catch (error) {
            console.error('Error editing the offer:', error);
            throw error;
        }
    },

    async getAllOffers() {
        try {
            const result = await request.get(`${BASE_URL}`);
            return result;
        } catch (error) {
            console.error('Error fetching all offers:', error);
            throw error;
        }
    },

    async getOfferById(id) {
        try {
            const result = await request.get(`${BASE_URL}/offer/${id}`);
            return result;
        } catch (error) {
            console.error(`Error fetching offer with id ${id}:`, error);
            throw error;
        }
    },
}