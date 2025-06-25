import { useEffect } from "react";
import { useMovies } from "../../context/MovieContext";
import Movie from "./movie/MovieProgram";
import useTrailerModal from "../../hooks/useTrailerModal";
import TrailerModal from "../trailer/TrailerModal";

export default function ProgramTab() {

    const { allMovies, loadAllMovies } = useMovies();

    const {
        showTrailer,
        selectedMovieId,
        openTrailer,
        closeTrailer
    } = useTrailerModal();

    useEffect(() => {
        loadAllMovies();
    }, []);

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
                                                v-model="selectedDate" 
                                            />
                                            <small className="text-danger" v-show="errors.dateError" style={{display: "none"}}>Reserved date cannot be in the past</small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cityName">Select City</label>
                                            <select 
                                                className="browser-default custom-select" 
                                                id="cityName" 
                                                name="location"
                                                v-model="selectedCity"
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
                                            <button type="button" className="btn btn-primary btn-lg">Continue</button>
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

                                {allMovies.length > 0 
                                    ? allMovies.map(movie => (
                                    <Movie key={movie.id}
                                     {...movie}
                                     onSeeTrailer={openTrailer}
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