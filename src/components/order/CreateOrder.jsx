import React, { useState, useEffect, useContext } from "react";
import orderService from "../../services/orderService";
import { UserContext } from "../../contexts/UserContext";
import { useLocation } from "react-router";

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

export default function CreateOrder() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatTicketTypes, setSeatTicketTypes] = useState({});
  const [showTicketSelection, setShowTicketSelection] = useState(false);
  const [showOrderTab, setShowOrderTab] = useState(false);
  const [showTicketTypeDialog, setShowTicketTypeDialog] = useState(false);
  const [currentSeat, setCurrentSeat] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [debugInfo, setDebugInfo] = useState("Loading...");
  const [order, setOrder] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const { user, accessToken } = useContext(UserContext) || {};
  const locationHook = useLocation();


  useEffect(() => {
    
    const params = new URLSearchParams(locationHook.search);
    const movieId = params.get("movieId");
    const bookingTimeValue = params.get("bookingTimeValue");
    const movieName = params.get("movieName");
    const date = params.get("date");
    const locationCity = params.get("location");
  
    // 2. Вземи bookingTimeData от sessionStorage
    const bookingTimeDataStr = sessionStorage.getItem("bookingTimeData");
    let bookingTimeData = null;
    if (bookingTimeDataStr) {
      bookingTimeData = JSON.parse(bookingTimeDataStr);
    }
  
    // 3. Зареди order info 
    setOrder({
      id: movieId,
      name: movieName,
      imageUrl: "/public/images/insideout.png", // или от бекенда
      cinema: locationCity,
      dayOfWeek: "", // можеш да го изчислиш по date
      date: date,
      time: bookingTimeValue,
      duration: "",
      audio: "",
      language: "",
      premiere: "",
      bookingTimeId: bookingTimeData?.id || ""
    });
  
    // ... userInfo както досега
    setUserInfo({
      firstName: user?.username || "Ivan",
      lastName: user?.name || "Ivanov",
      email: user?.email || "ivan@example.com"
    });
    setIsLoading(false);
  }, [user, locationHook]);

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
    if (showOrderTab) setShowOrderTab(false);
    else if (showTicketSelection) setShowTicketSelection(false);
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
    if (!showTicketSelection) {
      setShowTicketSelection(true);
      return;
    }
    if (!showOrderTab) {
      if (!userInfo) {
        alert("Please log in to continue with your order");
        window.location.href = "/auth";
        return;
      }
      setShowOrderTab(true);
      return;
    }
    if (!isTermsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
    const orderDto = {
      movieId: order.id,
      movieViewName: order.name,
      bookingTimeId: order.bookingTimeId,
      projectionDate: order.date,
      location: order.cinema.toUpperCase(),
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
        city: { location: order.cinema.toUpperCase() }
      })),
      user: userInfo,
      isFinished: false
    };
    try {
      const result = await orderService.createOrder(orderDto);
      if (result) {
        alert("Order created successfully!");
        window.location.href = "/orders";
      }
    } catch (error) {
      alert("Error creating order: " + error.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error: {debugInfo}</div>;

  return (
    <div className="order-tickets-wrapper">
      <div className="order-tickets-content">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <span className={!showTicketSelection && !showOrderTab ? "active" : ""}>SEATS</span> &gt;{" "}
          <span className={showTicketSelection && !showOrderTab ? "active" : ""}>TICKETS</span> &gt;{" "}
          <span className={showOrderTab ? "active" : ""}>ORDER</span>
        </div>
        {/* Movie Info */}
        <div className="movie-info">
          <img src={order.imageUrl} className="movie-poster" alt="Plakat" />
          <div className="movie-details">
            <h2 className="movie-title">{order.name}</h2>
            <div className="info-row">{order.cinema}</div>
            <div className="info-row">
              <span>Projection in {order.dayOfWeek} {order.date} {order.time}</span>
            </div>
            <div className="info-row">
              <span>{order.duration}</span>
              <span>{order.audio} / {order.language}</span>
              <span>{order.premiere}</span>
            </div>
          </div>
        </div>
        {/* Seat Selection */}
        {!showTicketSelection && (
          <div>
            <div className="max-seats-msg">You can choose a maximum of 10 seats.</div>
            <div className="screen-label">IMAX</div>
            <div className="hall-scheme">
              <div className="seats">
                {[...Array(ROWS)].map((_, rowIdx) => (
                  <div key={rowIdx + 1} className="seat-row">
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
                <span className="legend-item legend-free"></span> free seats
                <span className="legend-item legend-selected"></span> your choice
                <span className="legend-item legend-occupied"></span> occupied seats
                <span className="legend-item legend-wheelchair"></span> wheelchair spaces
              </div>
              <div className="seat-counter">
                <span>{selectedSeats.length}</span>
              </div>
              <div className="actions">
                <button className="btn-cancel" onClick={goBack}>Cancel</button>
                <button className="btn-confirm" disabled={selectedSeats.length === 0} onClick={confirmSelection}>Confirm</button>
              </div>
            </div>
          </div>
        )}
        {/* Ticket Selection */}
        {showTicketSelection && !showOrderTab && (
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
        {showOrderTab && (
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
              <p className="learn-more">Read more in <a href="/">Terms of online sales</a></p>
            </section>
            <section className="user-contacts">
              <h2 className="title-summary">Your contacts</h2>
              <p className="user-first-name">Username</p>
              <p className="text">{userInfo?.firstName || "N/A"}</p>
              <p className="user-last-name">Full Name</p>
              <p className="text">{userInfo?.lastName || "N/A"}</p>
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
              <button className="text-and-icon">
                <span>Payment with credit card</span>
              </button>
              <button className="payment-button" onClick={confirmSelection}>Pay Now</button>
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
