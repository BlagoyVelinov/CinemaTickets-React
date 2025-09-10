import { formatDateOnTicket } from '../../utils/formatDate';
import styles from './Ticket.module.css';

export default function Ticket({ ticket, isExpired }) {
    
    return(
        <div className={styles.ticketContainer}>
            <div className={styles.ticketMain}>
                <div className={styles.ticketHeader}>
                    <span>CINEMA TICKET</span>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.ticketTitle}>{ticket.movieName}</div>
                    <div className={styles.ticketDetails}>
                        <div className={styles.detailItem}>
                            <p>Theater</p>
                            <span>{ticket.cityName}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <p>Seat</p>
                            <span>{ticket.numberOfSeat}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <p>Row</p>
                            <span>{ticket.numberOfRow}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <p>Date</p>
                            <span>{formatDateOnTicket(ticket.projectionDate)}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <p>Time</p>
                            <span>{ticket.bookingTime}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <p>Price</p>
                            <span>€{ticket.price / 2}</span>
                        </div>
                        
                        
                    </div>
                    <div className={styles.barcodeContainer}>
                        <div className={styles.ticketBarcode}>
                            <img src="/images/barcode.png" alt="barcode" />
                            <p>NO. {ticket.id}</p>
                        </div>
                        <div className={styles.admitOne}>Admit One</div>
                    </div>
                    <div className={styles.filmStripImg}>
                        <img src="/images/film-strip.png" alt="film strip" />
                    </div>
                </div>
            </div>
            <div className={styles.ticketSeparator}></div>
            <div className={styles.ticketStub}>

                <div className={styles.stubHeader}>
                    <span>TICKET</span>
                </div>
                <div className={styles.stubDetails}>
                    <div className={styles.ticketTitle}>{ticket.movieName}</div>
                    <p>Theater <span>{ticket.cityName}</span></p>
                    <p>Seat <span>{ticket.numberOfSeat}</span></p>
                    <p>Price <span>€{ticket.price / 2}</span></p>
                    <p>Time <span>{ticket.bookingTime}</span></p>
                    <p>Date <span>{formatDateOnTicket(ticket.projectionDate)}</span></p>
                    <div className={styles.ticketNumber}>
                        <p>NO. {ticket.id}</p>
                    </div>
                </div>
            </div>
            {isExpired && <div className={styles.expiredStamp}>EXPIRED</div>}
        </div>
    );
}