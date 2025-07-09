import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router";
import CreateOrder from "../components/order/CreateOrder";

const OrderModalContext = createContext();

export function useOrderModal() {
    return useContext(OrderModalContext);
}

export function OrderModalProvider({ children }) {
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [orderModalData, setOrderModalData] = useState(null);
    const navigate = useNavigate();

    const openOrderModal = useCallback((id, name, time, selectedDate, selectedCity) => {
        sessionStorage.setItem('bookingTimeData', JSON.stringify(time));
        const params = new URLSearchParams({
            movieId: id,
            bookingTimeValue: time.bookingTime,
            movieName: name,
            date: selectedDate,
            location: selectedCity
        });
        window.history.pushState({}, '', `?${params.toString()}`);
        setOrderModalData({ id, name, time, selectedDate, selectedCity });
        setShowOrderModal(true);
    }, []);
    
    const closeOrderModal = useCallback(() => {
        setShowOrderModal(false);
        setOrderModalData(null);
        navigate(-1);
    }, [navigate]);

    return (
        <OrderModalContext.Provider value={{ showOrderModal, orderModalData, openOrderModal, closeOrderModal }}>
            {children}
            {showOrderModal && (
                <div className="modal-overlay">
                    <div
                        className="modal-content"
                        onClick={e => e.stopPropagation()}
                    >
                        <CreateOrder onClose={closeOrderModal} />
                    </div>
                </div>
            )}
        </OrderModalContext.Provider>
    );
}