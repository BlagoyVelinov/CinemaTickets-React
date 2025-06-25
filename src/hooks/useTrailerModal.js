import { useState, useEffect } from "react";

export default function useTrailerModal() {
    const [showTrailer, setShowTrailer] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const openTrailer = (id) => {
        console.log("openTrailer called with id:", id);
        setSelectedMovieId(id);
        setShowTrailer(true);
    };

    const closeTrailer = () => {
        console.log("closeTrailer called");
        setShowTrailer(false);
        setSelectedMovieId(null);
    };

    useEffect(() => {
        console.log("showTrailer:", showTrailer, "selectedMovieId:", selectedMovieId);
    }, [showTrailer, selectedMovieId]);

    return {
        showTrailer,
        selectedMovieId,
        openTrailer,
        closeTrailer
    };
}