import React, { useState } from 'react';
import styles from './PaymentForm.module.css';

export default function PaymentForm({ onValidationChange, forceValidation }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState(null);
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cardNameError, setCardNameError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const detectCardType = (number) => {
    if (number.match(/^4/)) {
      setCardType('visa');
    } else if (number.match(/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-2])/)) {
      setCardType('mastercard');
    } else if (number.match(/^3[47]/)) {
      setCardType('amex');
    } else {
      setCardType(null);
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setCardNumberError(''); // Clear error message when user starts typing
    if (value.length > 16) {
      value = value.substring(0, 16);
    }
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
    detectCardType(value);
  };

  const handleCardNumberBlur = () => {
    const cleanedCardNumber = cardNumber.replace(/ /g, '');
    if (cleanedCardNumber.length !== 16) {
      setCardNumberError('Card number must be 16 digits.');
    } else {
      setCardNumberError('');
    }
  };

  const handleCardNameChange = (e) => {
    setCardNameError('');
    setCardName(e.target.value);
  };

  const handleCardNameBlur = () => {
    if (cardName.trim() === '') {
      setCardNameError('Card holder name cannot be empty.');
    } else {
      setCardNameError('');
    }
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setExpiryDateError(''); // Clear error message when user starts typing
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setExpiryDate(formattedValue);
  };

  const handleExpiryDateBlur = () => {
    const cleanedExpiryDate = expiryDate.replace(/\//g, '');
    if (cleanedExpiryDate.length === 4) {
      const month = parseInt(cleanedExpiryDate.substring(0, 2), 10);
      const year = parseInt(cleanedExpiryDate.substring(2, 4), 10) + 2000; // Assuming 20xx years
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed

      if (month < 1 || month > 12) {
        setExpiryDateError('Invalid month.');
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        setExpiryDateError('Card has expired.');
      } else {
        setExpiryDateError('');
      }
    } else if (cleanedExpiryDate.length === 0) {
      setExpiryDateError('Expiry date cannot be empty.');
    } else {
      setExpiryDateError('Expiry date must be MM/YY.');
    }
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    setCvvError('');
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    setCvv(value);
  };

  const handleCvvBlur = () => {
    if (cvv.length < 3 || cvv.length > 4) {
      setCvvError('CVV must be 3 or 4 digits.');
    } else if (cvv.length === 0) {
      setCvvError('CVV cannot be empty.');
    } else {
      setCvvError('');
    }
  };

  const isFormValid = () => {
    return (
      cardNumber.replace(/ /g, '').length === 16 &&
      cardName.trim() !== '' &&
      expiryDate.replace(/\//g, '').length === 4 &&
      !expiryDateError &&
      (cvv.length === 3 || cvv.length === 4) &&
      !cardNumberError &&
      !cardNameError &&
      !cvvError
    );
  };

  React.useEffect(() => {
    onValidationChange(isFormValid());
  }, [cardNumber, cardName, expiryDate, cvv, cardNumberError, expiryDateError, cardNameError, cvvError]);

  React.useEffect(() => {
    if (forceValidation) {
      handleCardNumberBlur();
      handleCardNameBlur();
      handleExpiryDateBlur();
      handleCvvBlur();
    }
  }, [forceValidation]);

  return (
    <div className={styles.paymentFormContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          onBlur={handleCardNumberBlur}
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength="19"
        />
        {cardType && (
          <img
            src={`/images/icons/${cardType}.png`}
            alt={cardType}
            className={styles.cardIcon}
          />
        )}
        {cardNumberError && <p className={styles.errorText}>{cardNumberError}</p>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="cardName">Name on Card</label>
        <input
          type="text"
          id="cardName"
          value={cardName}
          onChange={handleCardNameChange}
          onBlur={handleCardNameBlur}
          placeholder="Full Name"
        />
        {cardNameError && <p className={styles.errorText}>{cardNameError}</p>}
      </div>
      <div className={styles.cardDetailsGroup}>
        <div className={styles.inputGroup}>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            onBlur={handleExpiryDateBlur}
            placeholder="MM/YY"
            maxLength="5"
          />
          {expiryDateError && <p className={styles.errorText}>{expiryDateError}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={handleCvvChange}
            onBlur={handleCvvBlur}
            placeholder="***"
            maxLength="4"
          />
          {cvvError && <p className={styles.errorText}>{cvvError}</p>}
        </div>
      </div>
    </div>
  );
}
