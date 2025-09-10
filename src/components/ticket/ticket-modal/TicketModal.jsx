import { useTicketModal } from "../../../contexts/TicketModalContext";
import Ticket from "../Ticket";
import styles from "./TicketModal.module.css";

export default function TicketModal() {
    const { showTicketModal, selectedTicket, closeTicketModal } = useTicketModal();

    if (!showTicketModal || !selectedTicket) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={closeTicketModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeTicketModal}>&times;</button>
                <Ticket ticket={selectedTicket} />
            </div>
        </div>
    );
}
