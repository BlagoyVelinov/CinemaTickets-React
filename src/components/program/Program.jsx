import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useMovies } from "../../contexts/MovieContext";
import { useOrderModal } from "../../contexts/OrderModalContext";
import Movie from "./movie/MovieProgram";
import useTrailerModal from "../../hooks/useTrailerModal";
import TrailerModal from "../trailer/TrailerModal";

function getTodayISO() {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split('T')[0];
}

export default function ProgramTab() {
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const initialDate = params.get("date") || getTodayISO();
    const initialCity = params.get("location") || "Sofia";

    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [selectedCity, setSelectedCity] = useState(initialCity);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSelectedDate(params.get("date") || getTodayISO());
        setSelectedCity(params.get("location") || "Sofia");
    }, [location.search]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let changed = false;
        if (selectedDate !== (params.get("date") || getTodayISO())) {
            params.set("date", selectedDate);
            changed = true;
        }
        if (selectedCity !== (params.get("location") || "Sofia")) {
            params.set("location", selectedCity);
            changed = true;
        }
        if (changed) {
            navigate(`?${params.toString()}`, { replace: true });
        }
        // eslint-disable-next-line
    }, [selectedDate, selectedCity]);

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
    }, [loadAllMovies]);

    const filteredMovies = allMovies.filter(movie => {
        if (!movie.bookingTimes || movie.bookingTimes.length === 0) return false;
        return true;
    });

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
                                                <option value="Sofia">Sofia</option>
                                                <option value="Plovdiv">Plovdiv</option>
                                                <option value="Stara_Zagora">Stara Zagora</option>
                                                <option value="Ruse">Ruse</option>
                                                <option value="Burgas">Burgas</option>
                                                <option value="Varna">Varna</option>
                                            </select>
                                            <small className="text-danger" v-show="errors.cityError" style={{display: "none"}}>City Name is required</small>
                                        </div>
                                    </form>
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