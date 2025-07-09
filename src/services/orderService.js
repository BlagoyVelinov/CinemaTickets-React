import request from "../api/request";


const BASE_URL = "http://localhost:8080/api/order";

export default {
    async createOrder(orderData) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.post(BASE_URL, orderData, {
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