import { useEffect } from "react";
import { Link } from "react-router";

import { useOffers } from "../../providers/OfferProvider";
import styles from "./Offers.module.css";

export default function OffersTab() {
    const { allOffers, loadAllOffers } = useOffers();

    useEffect(() => {
        loadAllOffers();
    }, [loadAllOffers]);

    const cinemaOffers = allOffers.cinemaOffers || [];
    const schoolOffers = allOffers.schoolOffers || [];
    const businessOffers = allOffers.businessOffers || [];
    
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
                                        <h3>Cinema <span>Offers</span></h3>
                                        <div className={styles.offerContainer}>
                                            {cinemaOffers.map(offer => (
                                                <Link 
                                                    to={`/offers/offer/${offer.id}`}
                                                    key={offer.id} 
                                                    className={styles.offerItem}
                                                >
                                                    <img src={offer.imageUrl} className={styles.offerImg} alt="offer-img"/>
                                                    <h4 className={styles.offerTitle}>{offer.title}</h4>
                                                </Link>
                                            ))}
                                        </div>
                                       
                                    </div>
                                    <div className="col-md-3 offer-card" data-category="cinema">
                                    </div>
                                </div>
                                
                                <div className="row mb-md">
                                    <div className="col-md-12">
                                        <h3>For the <span>Schools</span></h3>
                                        <div className={styles.offerContainer}>
                                            {schoolOffers.map(offer => (
                                                <Link 
                                                    to={`/offers/offer/${offer.id}`}
                                                    key={offer.id} 
                                                    className={styles.offerItem}
                                                >
                                                    <img src={offer.imageUrl} className={styles.offerImg} alt="offer-img"/>
                                                    <h4 className={styles.offerTitle}>{offer.title}</h4>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 offer-card" data-category="school">
                                </div>

                                <div className="row mb-md">
                                    <div className="col-md-12">
                                        <h3>For the <span>Business</span></h3>
                                        <div className={styles.offerContainer}>
                                            {businessOffers.map(offer => (
                                                <Link 
                                                    to={`/offers/offer/${offer.id}`}
                                                    key={offer.id} 
                                                    className={styles.offerItem}
                                                >
                                                    <img src={offer.imageUrl} className={styles.offerImg} alt="offer-img"/>
                                                    <h4 className={styles.offerTitle}>{offer.title}</h4>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 offer-card" data-category="business">
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}