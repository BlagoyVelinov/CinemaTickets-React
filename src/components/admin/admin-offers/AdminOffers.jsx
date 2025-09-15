import { useEffect, useState } from 'react';

import styles from './AdminOffers.module.css';
import { useOffers } from '../../../providers/OfferProvider';
import AddOffer from './add-offer/AddOffer';
import offerService from '../../../services/offerService';
import EditOffer from './edit-offer/EditOffer';

const categoryNames = {
    businessOffers: "For Business",
    schoolOffers: "For School",
    cinemaOffers: "Cinema Offers"
  };

export default function AdminOffers() {
    const { allOffers, loadAllOffers, refreshAllOffers } = useOffers();
    const [showAddOfferForm, setShowAddOfferForm] = useState(false);
    const [showEditOfferForm, setShowEditOfferForm] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadAllOffers();
    }, [loadAllOffers]);
    

    const handleAddOffer = () => {
        setShowAddOfferForm(!showAddOfferForm);
    };

    const handleEditOffer = (offerId) => {
            setSelectedOffer(offerId);
            setShowEditOfferForm(true);
            setShowAddOfferForm(false);
            
    };

    const handleDeleteOffer = async (offerId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this offer?");
        if(!confirmDelete) return;
        
        try {
            await offerService.deleteOffer(offerId);

            await refreshAllOffers();
            console.log('Offer deleted successfully');
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    };

    const handleSubmitOffer = async (offerData) => {
      try {
        setIsLoading(true);
        await offerService.createOffer(offerData);

        setShowAddOfferForm(false);

        await refreshAllOffers();
        console.log('Offer added successfully');
      } catch (error) {
        console.error('Error adding offer:', error);
      } finally {
        setIsLoading(false);
      }  
    };

    const handleSubmitEditOffer = async (offerId, offerData) => {
        try {
            setIsLoading(true);
            await offerService.editOffer(offerId, offerData);
            
            setShowEditOfferForm(false);
            setSelectedOffer(null);
            
            await refreshAllOffers();

            console.log('Offer updated successfully!');
        } catch (error) {
            console.error('Error editing Offer: ', error);
            
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelAdd = () => {
        setShowAddOfferForm(false);
    };
    
    const handleCancelEdit = () => {
        setShowEditOfferForm(false);
        setSelectedOffer(null);
    }
    
    return (
        <div className={styles.adminContent}>
            {showEditOfferForm ? (
                <h2>Edit Offer</h2>
                ) : showAddOfferForm ? (
                <h2>Add Offer</h2>
                ) : (
                <h2>Manage Offers</h2>
                )}

            {!showEditOfferForm && 
                <div className={styles.adminControls}>
                    <button className={`${styles.btn} ${styles.adminBtnAdd}`} 
                    onClick={handleAddOffer}
                    >
                        {showAddOfferForm ? 'Show Offers' : 'Add Offer'}
                    </button>
                </div>
            }

            {showEditOfferForm ? (
                <EditOffer
                    offerId={selectedOffer}
                    onSubmit={handleSubmitEditOffer}
                    onCancel={handleCancelEdit}
                    isLoading={isLoading}
                />
            ) : showAddOfferForm ? (
                <AddOffer 
                    onSubmit={handleSubmitOffer}
                    onCancel={handleCancelAdd}
                    isLoading={isLoading}
                />
            ) : (
                <div className={styles.offersList}>
                    {allOffers && Object.keys(allOffers).length > 0 ? (
                        <div className={styles.offersGrid}>
                            {Object.entries(allOffers).map(([category, items]) => (
                                <div key={category}>
                                    <h3>{categoryNames[category]}</h3>
                                    <div className={styles.offersFlex}>
                                        {items.map((offer) => (
                                        <div key={offer.id} className={styles.offerItem}>
                                            <h4>{offer.title}</h4>
                                            <p>{offer.description}</p>
                                            <div className={styles.offerActions}>
                                            <button
                                                className={`${styles.btn} ${styles.btnEdit}`}
                                                onClick={() => handleEditOffer(offer.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={`${styles.btn} ${styles.btnDelete}`}
                                                onClick={() => handleDeleteOffer(offer.id)}
                                            >
                                                Delete
                                            </button>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h3 className={styles.noArticles}>No offers yet</h3>
                    )}
                </div>
            )}
        </div>
    );
}