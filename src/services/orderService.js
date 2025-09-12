import request from "../api/request";


const BASE_URL = import.meta.env.VITE_CINEMA_AZURE_BASE_URL || import.meta.env.VITE_CINEMA_BASE_URL;

export default {
    async createOrder(orderData) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.post(`${BASE_URL}/order`, orderData, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
            return result;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
}