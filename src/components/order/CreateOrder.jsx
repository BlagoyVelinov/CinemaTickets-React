import React, { useState, useEffect } from "react";
import orderService from "../../services/orderService";
import { Link, useLocation, useNavigate } from "react-router";
import { useMovies } from "../../contexts/MovieContext";
import { useUser } from "../../api/authApi";
import OrderDto from "../../models/orderDto";
import PaymentForm from "./payment-form/PaymentForm";

import styles from "./CreateOrder.module.css"
import { formatProjectionDate } from "../../utils/formatDate";

const TICKET_TYPES = {
  CHILDREN_UNDER_16: { value: "Children under 16", price: 10.5 },
  PUPILS_AND_STUDENTS: { value: "Pupils and Students", price: 12.5 },
  PERSONS_OVER_60: { value: "People Over 60", price: 11.5 },
  REGULAR: { value: "Regular", price: 15.5 },
};

const MAX_SELECT = 10;
const ROWS = 12;
const COLS = 20;
const wheelchairSeats = [
  { row: 12, col: 1 }, { row: 12, col: 2 }, { row: 12, col: 3 },
  { row: 12, col: 18 }, { row: 12, col: 19 }, { row: 12, col: 20 }
];
const occupiedSeats = [
  { row: 8, col: 8 }, { row: 8, col: 9 }, { row: 8, col: 10 },
  { row: 9, col: 8 }, { row: 9, col: 9 }, { row: 9, col: 10 },
  { row: 10, col: 8 }, { row: 10, col: 9 }, { row: 10, col: 10 },
];

export default function CreateOrder({ onClose, bookingTime }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatTicketTypes, setSeatTicketTypes] = useState({});
  const [showTicketTypeDialog, setShowTicketTypeDialog] = useState(false);
  const [currentSeat, setCurrentSeat] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [debugInfo, setDebugInfo] = useState("Loading...");
  const [order, setOrder] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);
  const [triggerPaymentFormValidation, setTriggerPaymentFormValidation] = useState(false);

  const accessToken = localStorage.getItem('accessToken');
  const { user: authUser } = useUser();
  const locationHook = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentMovie, refreshCurrentMovie } = useMovies();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const step = params.get("step");

    if (!step || !["seats", "tickets", "order"].includes(step)) {
      params.set("step", "seats");
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }

  }, []);


  const params = new URLSearchParams(locationHook.search);
  const step = params.get("step") || "seats";
  const goToStep = (newStep) => {
    params.set("step", newStep);
    navigate(`${locationHook.pathname}?${params.toString()}`, { replace: true });
  };

  const movieId = params.get("movieId");
  useEffect(() => {
    if (movieId) {
      refreshCurrentMovie(movieId);
    }
  }, [movieId]);

  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);
    const bookingTimeId = params.get("bookingTimeId");
    const date = params.get("date");
    const locationCity = params.get("location");
    if (!currentMovie || !bookingTimeId) return;

    const getDayOfWeek = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    setOrder({
      ...currentMovie,
      city: locationCity,
      dayOfWeek: getDayOfWeek(date),
      date: date,
      time: bookingTime?.bookingTimeValue || "",
      bookingTimeId: bookingTime?.id || ""
    });


    setIsLoading(false);
  }, [currentMovie]);
  

  useEffect(() => {
    if (authUser) {
      setUserInfo(authUser);
    }
  }, [authUser]);

  const onSeatClick = (row, col) => {
    if (
      occupiedSeats.some(s => s.row === row && s.col === col) ||
      wheelchairSeats.some(s => s.row === row && s.col === col)
    ) {
      return;
    }
    const idx = selectedSeats.findIndex(s => s.row === row && s.col === col);
    if (idx === -1) {
      if (selectedSeats.length >= MAX_SELECT) return;
      setSelectedSeats([...selectedSeats, { row, col }]);
    } else {
      setSelectedSeats(selectedSeats.filter((_, i) => i !== idx));
    }
  };

  const isSeatSelected = (row, col) =>
    selectedSeats.some(s => s.row === row && s.col === col);
  const isSeatOccupied = (row, col) =>
    occupiedSeats.some(s => s.row === row && s.col === col);
  const isWheelchairSeat = (row, col) =>
    wheelchairSeats.some(s => s.row === row && s.col === col);

  const goBack = () => {
    if (step === "order") goToStep("tickets");
    else if (step === "tickets") goToStep("seats");
    else window.history.back();
  };

  const deleteTicket = seat => {
    setSelectedSeats(selectedSeats.filter(s => !(s.row === seat.row && s.col === seat.col)));
  };

  const openTicketTypeDialog = seat => {
    setCurrentSeat(seat);
    setShowTicketTypeDialog(true);
  };

  const selectTicketType = type => {
    if (currentSeat) {
      setSeatTicketTypes({
        ...seatTicketTypes,
        [`${currentSeat.row}-${currentSeat.col}`]: type
      });
      setShowTicketTypeDialog(false);
    }
  };

  const getTicketTypeForSeat = seat =>
    seatTicketTypes[`${seat.row}-${seat.col}`] || "REGULAR";
  const getTicketPrice = seat =>
    TICKET_TYPES[getTicketTypeForSeat(seat)].price.toFixed(2);
  const getTicketTypeLabel = seat =>
    TICKET_TYPES[getTicketTypeForSeat(seat)].value;
  const getTicketCount = type =>
    selectedSeats.filter(seat => getTicketTypeForSeat(seat) === type).length;
  const getTicketTypeTotal = type =>
    (getTicketCount(type) * TICKET_TYPES[type].price).toFixed(2);
  const getOrderSummary = () => {
    return Object.keys(TICKET_TYPES)
      .map(type => ({
        type: TICKET_TYPES[type].value,
        count: getTicketCount(type),
        price: getTicketTypeTotal(type)
      }))
      .filter(item => item.count > 0);
  };
  const getTotalPrice = () => {
    return (
      selectedSeats.reduce(
        (total, seat) => total + TICKET_TYPES[getTicketTypeForSeat(seat)].price,
        0
      ) + 1.98
    ).toFixed(2);
  };

  const confirmSelection = async () => {
    if (step === "seats") {
      if (selectedSeats.length === 0) return;
      goToStep("tickets");
      return;
    }
    if (step === "tickets") {
      if (!userInfo) {
        alert("Please log in to continue with your order");
        window.location.href = "/auth";
        return;
      }
      if (showPaymentForm && !isPaymentFormValid) {
        alert("Please fill in valid payment card details.");
        setTriggerPaymentFormValidation(true); // Trigger validation on PaymentForm
        return;
      }
      goToStep("order");
      return;
    }
    if (step === "order") {
      if (!isTermsAccepted) {
        alert("Please accept the terms and conditions");
        return;
      }

      if (!showPaymentForm) {
        setShowPaymentForm(true);
        setTriggerPaymentFormValidation(true);
        return;
      }

      if (showPaymentForm && !isPaymentFormValid) {
        alert("Please fill in valid payment card details.");
        setTriggerPaymentFormValidation(true); // Re-trigger validation on PaymentForm
        return;
      }

      const orderDto = new OrderDto({
        movieId: order.id,
        movieViewName: order.name,
        bookingTimeId: order.bookingTimeId,
        projectionDate: order.date,
        location: order.city?.toUpperCase().replace(/ /g, "_"),
        bookingTime: order.time,
        childQuantity: getTicketCount("CHILDREN_UNDER_16"),
        overSixtyQuantity: getTicketCount("PERSONS_OVER_60"),
        regularQuantity: getTicketCount("REGULAR"),
        studentQuantity: getTicketCount("PUPILS_AND_STUDENTS"),
        totalPrice: parseFloat(getTotalPrice()),
        tickets: selectedSeats.map(seat => ({
          row: seat.row,
          col: seat.col,
          type: getTicketTypeForSeat(seat),
          price: TICKET_TYPES[getTicketTypeForSeat(seat)].price,
          movieName: order.name,
          projectionDate: order.date,
          bookingTime: order.time,
          city: { location: order.cinema?.toUpperCase() }
        })),
        user: userInfo,
        isFinished: false
      });
      try {
        const result = await orderService.createOrder(orderDto.toJSON());
  
        if (result) {
          alert("Order created successfully!");
          window.location.href = "/program";
        }
      } catch (error) {
        alert("Error creating order: " + error.message);
      }
    }
  };

  useEffect(() => {
    if (triggerPaymentFormValidation) {
      // Reset the trigger after it has been used
      setTriggerPaymentFormValidation(false);
    }
  }, [triggerPaymentFormValidation]);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error: {debugInfo}</div>;

  return (
    <div className="order-tickets-wrapper">
        <div className="order-tickets-content">
			{/* Breadcrumbs */}
			<div className="breadcrumbs">
				<span className={step === "seats" ? "active" : ""}>SEATS</span> &gt;{" "}
				<span className={step === "tickets" ? "active" : ""}>TICKETS</span> &gt;{" "}
				<span className={step === "order" ? "active" : ""}>ORDER</span>
			</div>
			{/* Movie Info */}
			<div className={styles.movieInfo}>
				<img src={order.imageUrl} className={styles.moviePoster} alt="Plakat" />
				<div className={styles.movieDetails}>
					<div className={styles.titleContainer}>
						<h2 className="movie-title">{currentMovie.name}</h2>
						<img src={currentMovie.movieClass.icon} alt="Rating" height="25" className="rating-icon mr-sm" />
					</div>
					<div className={styles.infoRow}>Cinema Tickets - {order.city.replace("_", " ")}</div>
					<div className={styles.infoRow}>
						<img src="/images/order-calendar.svg" alt="order-calendar" />
						<span>Projection in {order.time} on  {order.dayOfWeek} {formatProjectionDate(order.date)}</span>
					</div>
					<div className={styles.infoRow}> 
						<p className={`${styles.infoData} ${styles.infoClock}`}>
							<img src="/images/order-clock.svg" alt="" />
							<span>{currentMovie.movieLength} min.</span>
						</p>
						<p className={styles.infoData}>Audio:
							<span>{currentMovie.audio}</span>
						</p>
						<p className={styles.infoData}>Subtitles:
							<span>{currentMovie.subtitles}</span>
						</p>
					</div>
				</div>
			</div>
			{/* Seat Selection */}
			{step === "seats" && (
				<div>
				<div className={styles.maxSeatsMsg}>You can choose a maximum of 10 seats.</div>
				<div className={styles.screenLabel}>
          <img src="/images/screenSVG.svg" alt="screen-image" />
        </div>
				<div className="hall-scheme">
					<div className="seats">
					{[...Array(ROWS)].map((_, rowIdx) => (
						<div key={rowIdx + 1} className="seat-row">
						<div className="row-number">{rowIdx + 1}</div>
						{[...Array(COLS)].map((_, colIdx) => {
							const row = rowIdx + 1;
							const col = colIdx + 1;
							return (
							<div
								key={col}
								className={
								"seat" +
								(isSeatSelected(row, col) ? " selected" : "") +
								(isSeatOccupied(row, col) ? " occupied" : "") +
								(isWheelchairSeat(row, col) ? " wheelchair" : "")
								}
								onClick={() => onSeatClick(row, col)}
							>
								{col}
							</div>
							);
						})}
						</div>
					))}
					</div>
					<div className="legend">
						<p>
							<span className="legend-item legend-free"></span> free seats
						</p>
						<p>
							<span className="legend-item legend-selected"></span> your choice
						</p>
						<p>
							<span className="legend-item legend-occupied"></span> occupied seats
						</p>
						<p>
							<span className="legend-item legend-wheelchair"></span> wheelchair spaces
						</p>
					</div>
					<div className="seat-counter">
						<article className="seats-info">
							{selectedSeats.length === 0 ? (
								<span></span>
							) : (
								<span>
								{Object.entries(
									selectedSeats.reduce((acc, seat) => {
									acc[seat.row] = acc[seat.row] || [];
									acc[seat.row].push(seat.col);
									return acc;
									}, {})
								).map(([row, cols]) => (
									<span className="seats-text" key={row}>
									<span style={{ color: "#d3c9c9" }}>Row:</span>{" "} {row} {" "}
									<span style={{ color: "#d3c9c9" }}>{cols.length === 1 ? 'Place' : 'Places'}:</span>{" "}  {cols.join(",")}&nbsp;
									</span>
								))}
								</span>
							)}
						</article>
						<article className="ticket-count-icon">
							<img className="ticket-icon" src="/images/icons/ticket-100.png" alt="ticket-icon" />
							<span>{selectedSeats.length}</span>
						</article>
					</div>
					<div className="actions">
						<button className="btn-cancel" onClick={onClose}>Cancel</button>
						<button className="btn-confirm" disabled={selectedSeats.length === 0} onClick={confirmSelection}>Confirm</button>
					</div>
				</div>
				</div>
			)}
			{/* Ticket Selection */}
			{step === "tickets" && (
				<section className="change-tickets">
				<header className="title">
					<h3>Choose tickets</h3>
					<p>You have <span>{selectedSeats.length}</span> seats selected, please SELECT THE TYPE OF EACH TICKET:</p>
				</header>
				<hr />
				{selectedSeats.map(seat => (
					<section key={`${seat.row}-${seat.col}`} className="section ticket-section">
					<section className="seats-info">
						<article className="icon-and-title">
						<span>{getTicketTypeLabel(seat)}</span>
						</article>
						<article className="row-and-coll">
						<span className="row">Row: {seat.row}</span>
						<span className="coll">Place: {seat.col}</span>
						</article>
					</section>
					<section className="button-and-price">
						<button className="change-type-ticket" onClick={() => openTicketTypeDialog(seat)}>CHANGE</button>
						<span className="price-ticket">{getTicketPrice(seat)} lv.</span>
						<button className="delete-ticket" onClick={() => deleteTicket(seat)}>x</button>
					</section>
					</section>
				))}
				<hr />
				<section className="section price-section">
					<article className="price-text">
					<p className="price-description">Total (including all taxes and fees)</p>
					<p className="price-fee">Includes administrative fee (1.98 lv)</p>
					</article>
					<p className="total-price">{getTotalPrice()} lv.</p>
				</section>
				<div className="actions">
					<button className="btn-cancel" onClick={goBack}>Back</button>
					<button className="btn-confirm" onClick={confirmSelection}>Next</button>
				</div>
				</section>
			)}
			{/* Order Summary */}
			{step === "order" && (
				<section className="change-tickets">
				<header className="title">
					<h3>Order summary</h3>
				</header>
				<hr />
				<section className="section ticket-section-summary">
					{getOrderSummary().map(item => (
					<article key={item.type} className="count-tickets-summary">
						<p>{item.count} x {item.type}</p>
						<p>{item.price} lv.</p>
					</article>
					))}
					<article className="admin-fee">
					<p className="price-fee">Includes administrative fee 1.98 lv</p>
					</article>
				</section>
				<hr />
				<section className="section price-section-summary">
					<article className="price-text">
					<p className="price-description">Total (including all taxes and fees)</p>
					<p className="total-price">{getTotalPrice()} lv.</p>
					</article>
					<p className="price-info">This amount includes an administration fee.</p>
					<p className="learn-more">Read more in <Link to="">Terms of online sales</Link></p>
				</section>
				<section className="user-contacts">
					<h2 className="title-summary">Your contacts</h2>
					<p className="user-first-name">Username</p>
					<p className="text">{userInfo?.username || "N/A"}</p>
					<p className="user-last-name">Full Name</p>
					<p className="text">{userInfo?.name || "N/A"}</p>
					<p className="user-email">Email</p>
					<p className="text">{userInfo?.email || "N/A"}</p>
				</section>
				<article className="checkbox-container">
					<input type="checkbox" id="myCheck" checked={isTermsAccepted} onChange={e => setIsTermsAccepted(e.target.checked)} />
					<label htmlFor="myCheck">
					I have read and agree to the Privacy Policy and General Terms and Conditions of Cinema City, the Rules for Online Reservation and Ticket Sales, and the 4DX Rules.
					</label>
				</article>
				<section className="payment-method">
					<h2 className="title-payment">Choose a payment method</h2>
					<button className={`${styles.textAndIcon} text-and-icon`} onClick={() => setShowPaymentForm(!showPaymentForm)}>
						<img src="/images/arrow-down.svg" alt="arrow-down" />
						<span>Payment with credit card</span>
					</button>
					{showPaymentForm && <PaymentForm onValidationChange={setIsPaymentFormValid} forceValidation={triggerPaymentFormValidation} />}
					<button className={styles.paymentButton} onClick={confirmSelection}>Pay Now</button>
				</section>
				<div className="actions">
					<button className="btn-cancel" onClick={goBack}>Back</button>
				</div>
				</section>
			)}
			{/* Ticket Type Dialog */}
			{showTicketTypeDialog && (
				<div className="ticket-type-dialog-overlay">
				<div className="ticket-type-dialog">
					<h3>Select Ticket Type</h3>
					<div className="ticket-type-options">
					{Object.entries(TICKET_TYPES).map(([key, type]) => (
						<button key={key} onClick={() => selectTicketType(key)} className="ticket-type-option">
						{type.value} - {type.price.toFixed(2)} lv.
						</button>
					))}
					</div>
					<button className="btn-cancel" onClick={() => setShowTicketTypeDialog(false)}>Cancel</button>
				</div>
				</div>
			)}
        </div>
    </div>
  );
}
