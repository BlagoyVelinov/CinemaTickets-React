import { Link } from "react-router";
import { useState } from "react";
import { formatBookingTime } from "../../../utils/formatBookingTimes";
import styles from './MovieProgram.module.css'

export default function Movie({
  id,
  name,
  imageUrl,
  movieClass:{icon},
  genreCategories,
  movieLength,
  audio,
  subtitles,
  projectionFormat,
  bookingTimes,
  onSeeTrailer,
  onBookingClick,
  selectedDate,
  selectedCity,
}) {
  const [errorMsg, setErrorMsg] = useState("");

  const handleBookingClick = (time) => {
    const authDataRaw = localStorage.getItem("authData");
    let accessToken = null;
    if (authDataRaw) {
      try {
        const authData = JSON.parse(authDataRaw);
        accessToken = authData && authData.accessToken;
      } catch (e) {
        accessToken = null;
      }
    }
    if (!accessToken) {
      setErrorMsg("Should to be logged in for book this movie.");
      return;
    }
    setErrorMsg("");
    onBookingClick(id, name, time, selectedDate, selectedCity);
  };

  useState(() => {
    console.log(bookingTimes);
    
  })

  return (
    <li className="movieList">
      <Link to={`/program/?trailer=${id}`} onClick={() => onSeeTrailer(id)}>
        <article className={styles.movieImage}>
          <img src={imageUrl} 
              alt={name} width="204" height="219" />
        </article>
      </Link>
      
        <section className="movie-details">
            <Link to={""} className="title-movie">{name}</Link>

            <span className="qb-movie-rating-info">
                <img src={icon} alt="Rating" height="30" className="rating-icon mr-sm" />
                <div className="qb-movie-info-wrapper">
                <div className="pt-xs">
                    <span className="mr-sm">{genreCategories.join(', ')}</span>
                    <span className="ml-xs">|</span>
                    <span className="mr-xs">{movieLength} min.</span>
                </div>
                </div>
            </span>
            <div className="screening-type">{projectionFormat ? projectionFormat.slice(2) : '2D'}</div>

            <section className="movie-info-program">
                <div className="info-booking-times">
                    {bookingTimes?.length > 0 ? (
                        bookingTimes.map((time) => (
                            <button className={styles.bookingTimeBtn}
                                key={time} 
                                onClick={() => handleBookingClick(time)}
                                >
                                {time}
                            </button>
                        ))
                    ) : (
                        <span className="no-times">Coming Soon</span>
                    )}
                </div>
                {errorMsg && (
                  <div className="booking-error-msg" style={{color: 'red', marginTop: 8}}>{errorMsg}</div>
                )}
            </section>

            <div className="qb-movie-info-column">
                <div className="movie-info-column-item">
                    <span className="movie-info-column-value">{audio}.</span>
                    <span className="movie-info-column-label">-(SUB:</span>
                    <span className="movie-info-column-value">{subtitles}.)</span>
                </div>
            </div>
        </section>
        
    </li>
  );
}