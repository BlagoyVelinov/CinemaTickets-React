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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadAllMovies = async () => {
        if (!loadedAll) {
            try {
                setLoading(true);
                setError(null);
                const data = await movieService.getAll();
                setAllMovies(data);
                setLoadedAll(true);
            } catch (err) {
                console.error('Failed to load movies:', err);
                setError(err.message);
                setAllMovies([]);
            } finally {
                setLoading(false);
            }
        }
    };

    const loadPremieres = async () => {
        if (!loadedPremieres) {
            try {
                setLoading(true);
                setError(null);
                const data = await movieService.getUpcomingPremiers();
                setPremieres(data);
                setLoadedPremieres(true);
            } catch (err) {
                console.error('Failed to load premieres:', err);
                setError(err.message);
                setPremieres([]);
            } finally {
                setLoading(false);
            }
        }
    };

    const refreshAllMovies = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await movieService.getAll();
            setAllMovies(data);
            setLoadedAll(true);
        } catch (err) {
            console.error('Failed to refresh movies:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const refreshPremieres = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await movieService.getUpcomingPremiers();
            setPremieres(data);
            setLoadedPremieres(true);
        } catch (err) {
            console.error('Failed to refresh premieres:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadCurrentMovie = async (id) => {
        if (!loadedCurrentMovie) {
            try {
                setLoading(true);
                setError(null);
                const data = await movieService.getMovieById(id);
                setCurrentMovie(data);
                setLoadedCurrentMovie(true);
            } catch (err) {
                console.error('Failed to load current movie:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const refreshCurrentMovie = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const data = await movieService.getMovieById(id);
            setCurrentMovie(data);
            setLoadedCurrentMovie(true);
        } catch (err) {
            console.error('Failed to refresh current movie:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MovieContext.Provider value={{
            allMovies,
            premieres,
            currentMovie,
            error,
            loading,
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