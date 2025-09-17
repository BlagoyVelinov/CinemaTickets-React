import { Link } from 'react-router';
import { useMovies } from "../../contexts/MovieContext";
import TrailerModal from "../trailer/TrailerModal";
import MovieHome from './movie/MovieHome';
import { useEffect, useRef, useState } from 'react';
import useTrailerModal from '../../hooks/useTrailerModal';
import { isChangeMovie } from '../../utils/checkIsChangeMovie';
import styles from './Home.module.css';

export default function HomeTab() {
    const { premieres, loadPremieres, refreshPremieres } = useMovies();
    const prevPremieres = useRef([]);
    
    const {
        showTrailer,
        selectedMovieId,
        openTrailer,
        closeTrailer
    } = useTrailerModal();

    useEffect(() => {
        loadPremieres();
    }, [loadPremieres]);

    useEffect(() => {
        if (isChangeMovie(prevPremieres.current, premieres)) {
            refreshPremieres();
        }
        prevPremieres.current = premieres;
    }, [premieres, refreshPremieres]);

    return (
        <div id="content-home" className="content-section">
            <div id="slogan">
                <div className="image png"></div>
                <div className="inside">
                <h2>We are breaking <span>All Limitations</span></h2>
                <p id="intro-text">
                    Bulgaria manages 7 multiplexes in 6 different cities in the country – Sofia, Plovdiv, Stara Zagora, Ruse, Burgas and Varna
                </p>
                <div className="button-about-us">
                    <Link to={"/about-us"} className="link1 tab-link" data-tab="about-us"><span><span>Learn More</span></span></Link>
                </div>
                </div>
            </div>

            <div className="box">
                <div className="border-right">
                    <div className="border-left">
                        <div className="inner">
                        <h3>Welcome to <b>Cinema</b> <span>Tickets</span></h3>
                        <div className={styles.imageContainer}>
                            <img className="start-img" src="/images/avatar-3.jpg" alt="Avatar III" />
                        </div>

                            <div className="content">
                                <h3>Upcoming <span>Premieres</span></h3>
                                <div id="movie-app" className="movies-container">                   
                                    <ul className="movies">

                                        {premieres.length > 0 
                                            ? premieres.map(movie => (
                                            <MovieHome 
                                                key={movie.id}
                                                {...movie} 
                                                onSeeTrailer={openTrailer}
                                                 />
                                                )) 
                                            : <h3 className="no-articles">No Upcoming Premieres</h3>
                                        }
                                        {showTrailer && (
                                            <TrailerModal movieId={selectedMovieId} onClose={closeTrailer} />
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}