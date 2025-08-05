import React from "react";
import styles from "./RegistrationSuccessModal.module.css";

const RegistrationSuccessModal = ({ open, onClose }) => {
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close">&times;</button>
        <div className={styles.container}>
          <h2>Congratulation!</h2>
          <h3>Successfully registration in Cinema Tickets!</h3>
          <p>Check your mailbox to activate your profile!</p>
          <a href="/" onClick={onClose}>Go back home page</a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;