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
}) {
  return (
    <li className="movieList">
        <img src={imageUrl} alt={name} width="204" height="219" />
        <section className="movie-details">
            <a href={`/?trailer=${id}`} className="title-movie">{name}</a>

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

            <div className="qb-movie-info-column">
                <div className="movie-info-column-item">
                    <span className="movie-info-column-value">{audio}.</span>
                    <span className="movie-info-column-label">-(SUB:</span>
                    <span className="movie-info-column-value">{subtitles}.)</span>
                </div>
            </div>
            <section className="movie-info-program">
                <div className="info-booking-times">
                    {bookingTimes?.length > 0 ? (
                        bookingTimes.map((time) => (
                        <a key={time.id} className="btn btn-primary btn-lg">
                            {time.bookingTime}
                        </a>
                        ))
                    ) : (
                        <a className="h4">Coming soon</a>
                    )}
                </div>
            </section>
        </section>
        
    </li>
  );
}