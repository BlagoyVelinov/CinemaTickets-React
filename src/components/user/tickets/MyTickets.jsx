import { useEffect, useState } from "react";
import Ticket from "../../ticket/Ticket";
import styles from "./MyTickets.module.css"
import ticketsService from "../../../services/ticketsService";
import { useUser } from "../../../api/authApi";
import { Link } from "react-router";
import { useTicketModal } from "../../../contexts/TicketModalContext";

export default function MyTickets() {
    const { user } = useUser();
    const [upcomingTickets, setUpcomingTickets] = useState([]);
    const [expiredTickets, setExpiredTickets] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
    const [currentPageExpired, setCurrentPageExpired] = useState(1);
    const ticketsPerPage = 3;

    const { openTicketModal } = useTicketModal();

    useEffect(() => {
        const fetchUpcomingTickets = async () => {
            console.log("User ID: " + user?.id);
            if (user?.id) {
                const ticketsList = await ticketsService.getUpcomingTickets(user.id);
                setUpcomingTickets(ticketsList);
                console.log("Upcoming Tickets Length: " + ticketsList.length);
                console.log("Total Upcoming Pages: " + Math.ceil(ticketsList.length / ticketsPerPage));
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
                console.log("Total Expired Pages: " + Math.ceil(ticketsList.length / ticketsPerPage));
            }
        }
        fetchExpiredTickets();
    }, [user?.id]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const indexOfLastUpcomingTicket = currentPageUpcoming * ticketsPerPage;
    const indexOfFirstUpcomingTicket = indexOfLastUpcomingTicket - ticketsPerPage;
    const currentUpcomingTickets = upcomingTickets.slice(indexOfFirstUpcomingTicket, indexOfLastUpcomingTicket);

    const indexOfLastExpiredTicket = currentPageExpired * ticketsPerPage;
    const indexOfFirstExpiredTicket = indexOfLastExpiredTicket - ticketsPerPage;
    const currentExpiredTickets = expiredTickets.slice(indexOfFirstExpiredTicket, indexOfLastExpiredTicket);

    const paginateUpcoming = (pageNumber) => setCurrentPageUpcoming(pageNumber);
    const paginateExpired = (pageNumber) => setCurrentPageExpired(pageNumber);

    const totalUpcomingPages = Math.ceil(upcomingTickets.length / ticketsPerPage);
    const totalExpiredPages = Math.ceil(expiredTickets.length / ticketsPerPage);

    const renderPaginationButtons = (totalPages, currentPage, paginate) => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return (
            <div className={styles.pagination}>
                {pageNumbers.map(number => (
                    <button 
                        key={number} 
                        onClick={() => paginate(number)} 
                        className={`${styles.pageButton} ${currentPage === number ? styles.activePage : ''}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        );
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
                    {currentUpcomingTickets.length > 0 
                        ? currentUpcomingTickets.map((upTicket) => (
                            <li key={upTicket.id} onClick={() => openTicketModal(upTicket)}>
                                <Link>
                                    <Ticket ticket={upTicket}/>
                                </Link>
                            </li>
                    )) : <h1>No upcoming tickets yet</h1>
                }
                </ul>
                <ul className={`${styles.ticketsList} ${activeTab === 'expired' ? styles.activeList : styles.hiddenList}`}>
                    {currentExpiredTickets.length > 0 
                        ? currentExpiredTickets.map((exTicket) => (
                            <li key={exTicket.id} onClick={() => openTicketModal(exTicket)}>
                                <Link>
                                    <Ticket ticket={exTicket}/>
                                </Link>
                            </li>
                    )) : <h1>No expired tickets yet</h1>
                }
                </ul>
            </div>
            {activeTab === 'upcoming' && renderPaginationButtons(totalUpcomingPages, currentPageUpcoming, paginateUpcoming)}
            {activeTab === 'expired' && renderPaginationButtons(totalExpiredPages, currentPageExpired, paginateExpired)}
        </div>
    );
}