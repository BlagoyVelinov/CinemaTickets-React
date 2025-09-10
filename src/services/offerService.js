import request from "../api/request";


const BASE_URL = import.meta.env.VITE_CINEMA_BASE_URL;

export default {
    async createOffer(offerData) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.post(`${BASE_URL}/offers/add-offer`, offerData, {
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
            const result = await request.delete(`${BASE_URL}/offers/delete-offer/${offerId}`, null, {
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
            const result = await request.put(`${BASE_URL}/offers/edit-offer/${offerId}`, offerData, {
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
            const result = await request.get(`${BASE_URL}/offers`);
            return result;
        } catch (error) {
            console.error('Error fetching all offers:', error);
            throw error;
        }
    },

    async getOfferById(id) {
        try {
            const result = await request.get(`${BASE_URL}/offers/offer/${id}`);
            return result;
        } catch (error) {
            console.error(`Error fetching offer with id ${id}:`, error);
            throw error;
        }
    },
}