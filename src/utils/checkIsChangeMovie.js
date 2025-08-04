export function isChangeMovie(oldPremieres, newPremieres) {
    if (!Array.isArray(oldPremieres) || !Array.isArray(newPremieres)) return true;
    if (oldPremieres.length !== newPremieres.length) return true;

    const oldSorted = [...oldPremieres].sort((a, b) => a.id - b.id);
    const newSorted = [...newPremieres].sort((a, b) => a.id - b.id);

    for (let i = 0; i < oldSorted.length; i++) {
        const oldMovie = oldSorted[i];
        const newMovie = newSorted[i];

        if(oldMovie.id !== newMovie.id) return true;

        const oldTimes = Array.isArray(oldMovie.bookingTimes) ? oldMovie.bookingTimes.slice().sort() : [];
        const newTimes = Array.isArray(newMovie.bookingTimes) ? newMovie.bookingTimes.slice().sort() : [];

        if(oldTimes.length !== newTimes.length) return true;

        for (let j = 0; j < oldTimes.length; j++) {
            if (oldTimes[j] !== newTimes[j]) return true;
        }
        return false;
    }
}