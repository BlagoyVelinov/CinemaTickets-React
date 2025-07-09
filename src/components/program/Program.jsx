import { useEffect, useState } from "react";
import { useMovies } from "../../contexts/MovieContext";
import { useOrderModal } from "../../contexts/OrderModalContext";
import Movie from "./movie/MovieProgram";
import useTrailerModal from "../../hooks/useTrailerModal";
import TrailerModal from "../trailer/TrailerModal";

export default function ProgramTab() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [filterActive, setFilterActive] = useState(false);


    const { allMovies, loadAllMovies } = useMovies();
    const { openOrderModal } = useOrderModal();

    const {
        showTrailer,
        selectedMovieId,
        openTrailer,
        closeTrailer
    } = useTrailerModal();

    useEffect(() => {
        loadAllMovies();
    }, []);

    const filteredMovies = filterActive
    ? allMovies.filter(movie => movie.bookingTimes && movie.bookingTimes.length > 0)
    : allMovies;

    return (
        <div id="content-program" className="content-section">
            <div className="line-hor"></div>
            <div className="box">
                <div className="border-right">
                    <div className="border-left">
                        <div className="inner">
                            <h3 className="title">Projections <span>Today</span></h3>
                            <div id="program-app">
                                <div className="form-row m-5">
                                    <form>
                                        <div className="col">
                                            <label htmlFor="dateInput">Date</label>
                                            <input 
                                                type="date" 
                                                name="projectionDate" 
                                                id="dateInput" 
                                                className="form-control"
                                                value={selectedDate}
                                                onChange={e => setSelectedDate(e.target.value)}
                                            />
                                            <small className="text-danger" v-show="errors.dateError" style={{display: "none"}}>Reserved date cannot be in the past</small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cityName">Select City</label>
                                            <select 
                                                className="browser-default custom-select" 
                                                id="cityName" 
                                                name="location"
                                                value={selectedCity}
                                                onChange={e => setSelectedCity(e.target.value)}
                                            >
                                                <option value="">Select City</option>
                                                <option value="Sofia">Sofia</option>
                                                <option value="Plovdiv">Plovdiv</option>
                                                <option value="Stara_Zagora">Stara Zagora</option>
                                                <option value="Ruse">Ruse</option>
                                                <option value="Burgas">Burgas</option>
                                                <option value="Varna">Varna</option>
                                            </select>
                                            <small className="text-danger" v-show="errors.cityError" style={{display: "none"}}>City Name is required</small>
                                        </div>

                                        <div className="button-holder d-flex justify-content-center">
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-lg"
                                                onClick={() => setFilterActive(true)}
                                                disabled={!selectedDate || !selectedCity}
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </form>
                                    {/* <!-- Admin button for adding a movie --> */}
                                    <div className="admin-controls mb-4">
                                        <button className="btn admin-btn-add">
                                            Add movie
                                            {/* {{ showAddMovieForm ? 'Show movies' : 'Add movie' }} */}
                                        </button>
                                    </div>
                                </div>

                                {filteredMovies.length > 0 
                                    ? filteredMovies.map(movie => (
                                        <Movie
                                            key={movie.id}
                                            {...movie}
                                            selectedDate={selectedDate}
                                            selectedCity={selectedCity}
                                            onSeeTrailer={openTrailer}
                                            onBookingClick={openOrderModal}
                                        />
                                    )) 
                                    : <h3 className="no-articles">No movies yet</h3>
                                }
                                {showTrailer && (
                                        <TrailerModal movieId={selectedMovieId} onClose={closeTrailer} />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}