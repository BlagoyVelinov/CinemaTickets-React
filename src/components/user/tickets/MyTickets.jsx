import { useEffect, useState } from "react";
import Ticket from "../../ticket/Ticket";
import styles from "./MyTickets.module.css"
import ticketsService from "../../../services/ticketsService";
import { useUser } from "../../../api/authApi";

export default function MyTickets() {
    const { user } = useUser();
    const [upcomingTickets, setUpcomingTickets] = useState([]);
    const [expiredTickets, setExpiredTickets] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');

    useEffect(() => {
        const fetchUpcomingTickets = async () => {
            console.log("User ID: " + user?.id);
            if (user?.id) {
                const ticketsList = await ticketsService.getUpcomingTickets(user.id);
                setUpcomingTickets(ticketsList);
                console.log("Upcoming Tickets Length: " + ticketsList.length);
            }
        }
        fetchUpcomingTickets();
    }, [user?.id]);

    useEffect(() => {
        const fetchExpiredTickets = async () => {
            console.log("User ID: " + user?.id);
            if (user?.id) {
                const ticketsList = await ticketsService.getExpiredTickets(user.id);
                setExpiredTickets(ticketsList);
                console.log("Expired Tickets Length: " + ticketsList.length);
            }
        }
        fetchExpiredTickets();
    }, [user?.id]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return(
        <div className={styles.container}>
            <h1>My Tickets</h1>

            <div className={styles.navTickets}>
                <button 
                    className={`${styles.btnUp} ${styles.btn} ${activeTab === 'upcoming' ? styles.active : ''}`}
                    onClick={() => handleTabChange('upcoming')}
                >
                    Upcoming
                </button>
                <button 
                    className={`${styles.btnEx} ${styles.btn} ${activeTab === 'expired' ? styles.active : ''}`}
                    onClick={() => handleTabChange('expired')}
                >
                    Expired
                </button>
            </div>

            <div className={styles.ticketsContent}>
                <ul className={`${styles.ticketsList} ${activeTab === 'upcoming' ? styles.activeList : styles.hiddenList}`}>
                    {upcomingTickets.length > 0 
                        ? upcomingTickets.map((upTicket) => (
                            <li key={upTicket.id}>
                                <Ticket ticket={upTicket}/>
                            </li>
                    )) : <h1>No upcoming tickets yet</h1>
                }
                </ul>
                <ul className={`${styles.ticketsList} ${activeTab === 'expired' ? styles.activeList : styles.hiddenList}`}>
                    {expiredTickets.length > 0 
                        ? expiredTickets.map((exTicket) => (
                            <li key={exTicket.id}>
                                <Ticket ticket={exTicket}/>
                            </li>
                    )) : <h1>No expired tickets yet</h1>
                }
                </ul>
            </div>
        </div>
    );
}