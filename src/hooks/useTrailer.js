import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import movieService from "../services/movieService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function useTrailer(propMovieId) {
  const query = useQuery();
  const movieId = propMovieId || query.get("trailer");

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!movieId) return;
    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");
    const abortController = new AbortController();
    
    movieService.getMovieById(movieId)
      .then(result => {
        console.log("movieService.getMovieById result:", result);
        setMovie(result);
      })
      .catch(err => {
        setHasError(true);
        console.log("movieService.getMovieById result: Catching the error");
        setErrorMessage(err.message || "An error occurred while loading the trailer.");
      })
      .finally(() => setIsLoading(false));
      return () => {
        abortController.abort();
    }
  }, [movieId]);

  return { movie, isLoading, hasError, errorMessage, movieId };
}