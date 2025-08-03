import { useEffect, useState } from "react";
import movieService from "../../../../services/movieService";
;

export default function EditMovie({ movieId, onCancel }) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const movieData = await movieService.getMovieById(movieId);
                setMovie(movieData);
            
            } catch (error) {
                console.error('Error fetching movie:', error);

            } finally {
                setLoading(false);
            }
        }
        fetchMovie();
    }, [movieId]);

    if (loading) return <div>Loading...</div>;
    if (!movie) return <div>Movie not found</div>;

    return (
        <div>
            <h1>Edit Movie</h1>
            <p>{movie.name}</p>

            <button onClick={onCancel}>Cancel</button>
            {/* <button onClick={handleSave}>Save</button> */}
        </div>
    );
}