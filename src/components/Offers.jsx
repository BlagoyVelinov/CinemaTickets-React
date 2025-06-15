export default function OffersTab() {
    return (
        <div id="content-offers" className="content-section">
            <div className="line-hor"></div>
            <div className="box">
                <div className="border-right">
                    <div className="border-left">
                        <div className="inner">
                        
                            <div className="admin-only">
                                <a href="/offers/add-offer" className="admin-btn admin-btn-add">
                                <i className='bx bx-plus'></i>
                                Add Offer
                                </a>
                            </div>
                        
                            <div className="container-fluid static">
                                <div className="row mb-md">
                                    <div className="col-md-12">
                                        <h3>Cinema <span>Offers</span></h3>
                                        <img src="./images/company-vouchers.jpg" className="img-responsive visible-xs" alt="offer-img"/>
                                    </div>
                                    <div className="col-md-3 offer-card" data-category="cinema">
                                    </div>
                                </div>
                                
                                <div className="row mb-md">
                                    <div className="col-md-12">
                                        <h3>For the <span>Schools</span></h3>
                                        <img src="./images/company-vouchers.jpg" className="img-responsive visible-xs" alt="offer-img"/>
                                    </div>
                                </div>
                                <div className="col-md-3 offer-card" data-category="school">
                                </div>
                            </div>

                            <div className="row mb-md">
                                <div className="col-md-12">
                                    <h3>For the <span>Business</span></h3>
                                    <img src="./images/company-vouchers.jpg" className="img-responsive visible-xs" alt="offer-img"/>
                                </div>
                            </div>
                            <div className="col-md-3 offer-card" data-category="business">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}