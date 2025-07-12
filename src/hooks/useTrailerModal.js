import { useState, useEffect } from "react";

export default function useTrailerModal() {
    const [showTrailer, setShowTrailer] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const openTrailer = (id) => {
        setSelectedMovieId(id);
        setShowTrailer(true);
    };

    const closeTrailer = () => {
        setShowTrailer(false);
        setSelectedMovieId(null);
    };

    useEffect(() => {
    }, [showTrailer, selectedMovieId]);

    return {
        showTrailer,
        selectedMovieId,
        openTrailer,
        closeTrailer
    };
}