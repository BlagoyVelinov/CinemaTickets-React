import { createContext, useContext, useState } from 'react';
import movieService from '../services/movieService';

const MovieContext = createContext();

export function MovieProvider({ children }) {
    const [allMovies, setAllMovies] = useState([]);
    const [premieres, setPremieres] = useState([]);
    const [loadedAll, setLoadedAll] = useState(false);
    const [loadedPremieres, setLoadedPremieres] = useState(false);
    const [loadedCurrentMovie, setLoadedCurrentMovie] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);

    const loadAllMovies = async () => {
        if (!loadedAll) {
            const data = await movieService.getAll();
            setAllMovies(data);
            setLoadedAll(true);
        }
    };

    const loadPremieres = async () => {
        if (!loadedPremieres) {
            const data = await movieService.getUpcomingPremiers();
            setPremieres(data);
            setLoadedPremieres(true);
        }
    };

    const refreshAllMovies = async () => {
        const data = await movieService.getAll();
        setAllMovies(data);
        setLoadedAll(true);
    };

    const refreshPremieres = async () => {
        const data = await movieService.getUpcomingPremiers();
        setPremieres(data);
        setLoadedPremieres(true);
    };

    const loadCurrentMovie = async (id) => {
        if (!loadedCurrentMovie) {
            const data = await movieService.getMovieById(id);
            setCurrentMovie(data);
            setLoadedCurrentMovie(true);
        }
    };

    const refreshCurrentMovie = async (id) => {
        const data = await movieService.getMovieById(id);
        setCurrentMovie(data);
        setLoadedCurrentMovie(true);
    };

    return (
        <MovieContext.Provider value={{
            allMovies,
            premieres,
            currentMovie,
            loadAllMovies,
            refreshAllMovies,
            loadPremieres,
            refreshPremieres,
            loadCurrentMovie,
            refreshCurrentMovie,
        }}>
            {children}
        </MovieContext.Provider>
    );
}

export function useMovies() {
    return useContext(MovieContext);
}