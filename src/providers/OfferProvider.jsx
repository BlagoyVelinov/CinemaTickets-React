import { createContext, useContext, useState } from 'react';
import offerService from '../services/offerService';

const OfferContext = createContext();

export function OfferProvider({ children }) {
    const [allOffers, setAllOffers] = useState([]);
    const [loadedAll, setLoadedAll] = useState(false);
    const [loadedCurrentOffer, setLoadedCurrentOffer] = useState(false);
    const [currentOffer, setCurrentOffer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadAllOffers = async () => {
        if (!loadedAll) {
            try {
                setLoading(true);
                setError(null);
                const data = await offerService.getAllOffers();
                setAllOffers(data);
                setLoadedAll(true);
            } catch (err) {
                console.error('Failed to load offers:', err);
                setError(err.message);
                setAllOffers([]);
            } finally {
                setLoading(false);
            }
        }
    };

    const refreshAllOffers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await offerService.getAllOffers();
            setAllOffers(data);
            setLoadedAll(true);
        } catch (err) {
            console.error('Failed to refresh offers:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadCurrentOffer = async (id) => {
        if (!loadedCurrentOffer) {
            try {
                setLoading(true);
                setError(null);
                const data = await offerService.getOfferById(id);
                setCurrentOffer(data);
                setLoadedCurrentOffer(true);
            } catch (err) {
                console.error('Failed to load current offer:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const refreshCurrentOffer = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const data = await offerService.getOfferById(id);
            setCurrentOffer(data);
            setLoadedCurrentOffer(true);
        } catch (err) {
            console.error('Failed to load current offer:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <OfferContext.Provider value={{
            allOffers,
            currentOffer,
            error,
            loading,
            loadAllOffers,
            refreshAllOffers,
            loadCurrentOffer,
            refreshCurrentOffer,
        }}>
            {children}
        </OfferContext.Provider>
    );
}

export function useOffers() {
    return useContext(OfferContext);
}