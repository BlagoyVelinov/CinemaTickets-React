import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useOffers } from "../../../providers/OfferProvider";
import styles from "./ShowOffer.module.css";

export default function ShowOffer() {
    const { currentOffer, refreshCurrentOffer } = useOffers();
    const { offerId } = useParams();

    useEffect(() => {
        if (offerId) {
            refreshCurrentOffer(offerId);
        }
    }, [offerId]);
    
    if (!currentOffer) return <div>Loading...</div>;

    return (
        <div id="content-offers" className="content-section">
        <div className="line-hor"></div>
        <div className="box">
            <div className="border-right">
                <div className="border-left">
                    <div className="inner">
                        <div className="container-fluid static">

                            <div className="row mb-md">
                                <div className="col-md-12">
                                    <h3>{currentOffer.title}</h3>
                                    <div className={styles.offerContainer}>

                                        <div className={styles.offerItem}>
                                            <img src={currentOffer.imageUrl} className={styles.offerImg} alt="offer-img"/>
                                            
                                            <div className={styles.offerDescription}>{currentOffer.description}</div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-3 offer-card" data-category="cinema"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>      
    );
}