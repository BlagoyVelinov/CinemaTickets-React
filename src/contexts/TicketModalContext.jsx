import { createContext, useCallback, useContext, useState } from "react";

const TicketModalContext = createContext();

export function useTicketModal() {
    return useContext(TicketModalContext);
}

export function TicketModalProvider({ children }) {
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const openTicketModal = useCallback((ticket) => {
        setSelectedTicket(ticket);
        setShowTicketModal(true);
    }, []);

    const closeTicketModal = useCallback(() => {
        setSelectedTicket(null);
        setShowTicketModal(false);
    }, []);

    return (
        <TicketModalContext.Provider value={{ showTicketModal, selectedTicket, openTicketModal, closeTicketModal }}>
            {children}
        </TicketModalContext.Provider>
    );
}
