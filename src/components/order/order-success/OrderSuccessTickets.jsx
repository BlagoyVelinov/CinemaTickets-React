import React from 'react';
import { useLocation } from 'react-router';
import Ticket from '../../ticket/Ticket';
import styles from './OrderSuccessTickets.module.css';

export default function OrderSuccessTickets() {
    const location = useLocation();
    const { orderedTickets } = location.state || {};

    if (!orderedTickets || orderedTickets.length === 0) {
        return (
            <div className={styles.container}>
                <h1>No tickets found for this order.</h1>
                <p>Please go back to the program page.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>Your Order is Complete!</h1>
            <h2>Here are your tickets:</h2>
            <div className={styles.ticketsList}>
                {orderedTickets.map((ticketData, index) => {
                    const currTicket = {
                        id: ticketData.id || `${ticketData.row}-${ticketData.col}-${ticketData.bookingTime}-${index}`,
                        movieName: ticketData.movieName,
                        cityName: ticketData.location,
                        numberOfSeat: ticketData.col,
                        numberOfRow: ticketData.row,
                        projectionDate: ticketData.projectionDate,
                        bookingTime: ticketData.bookingTime,
                        price: ticketData.price,
                    };
                    return (
                        <div key={currTicket.id} className={styles.ticketItem}>
                            <Ticket ticket={currTicket} isExpired={false} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
