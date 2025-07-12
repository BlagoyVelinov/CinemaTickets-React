import { createContext, useCallback, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CreateOrder from "../components/order/CreateOrder";

const OrderModalContext = createContext();

export function useOrderModal() {
    return useContext(OrderModalContext);
}

export function OrderModalProvider({ children }) {
    const [orderModalData, setOrderModalData] = useState(null);
    const navigate = useNavigate();
    const location  = useLocation();

    const params = new URLSearchParams(location.search);
    const shouldShowOrderModal = params.get("movieId") && params.get("bookingTimeId");

    const openOrderModal = useCallback((id, name, time, selectedDate, selectedCity) => {
        sessionStorage.setItem('bookingTimeData', JSON.stringify(time));
        const params = new URLSearchParams({
            movieId: id,
            bookingTimeId: time.id,
            movieName: name,
            date: selectedDate,
            location: selectedCity
        });
        navigate(`/program/order?${params.toString()}`, { replace: true });
        setOrderModalData({ id, name, time, selectedDate, selectedCity });
    }, [navigate]);
    
    const closeOrderModal = useCallback(() => {
        setOrderModalData(null);
        const params = new URLSearchParams(location.search);

        const date = params.get("date");
        const locationCity = params.get("location");

        let programUrl = '/program';
        const query = [];
        if (date) query.push(`date=${encodeURIComponent(date)}`);
        if (locationCity) query.push(`location=${encodeURIComponent(locationCity)}`);
        if (query.length > 0) programUrl += `?${query.join('&')}`;
        navigate(programUrl, { replace: true });
    }, [navigate, location]);

    return (
        <OrderModalContext.Provider value={{ showOrderModal: shouldShowOrderModal, orderModalData, openOrderModal, closeOrderModal }}>
            {children}
            {shouldShowOrderModal && (
                <div className="modal-overlay">
                    <div
                        className="modal-content"
                        onClick={e => e.stopPropagation()}
                        >
                        <CreateOrder 
                            onClose={closeOrderModal} 
                        />
                    </div>
                </div>
            )}
        </OrderModalContext.Provider>
    );
}