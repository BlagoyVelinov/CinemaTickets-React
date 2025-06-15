export default function FourDxTab() {
    return (
        <div id="content-4dx" className="content-section" >
            <div className="line-hor"></div>
            <div className="box">
                <div className="border-right">
                    <div className="border-left">
                        <div className="inner">
                            <h3>CINEMA <span>EXPERIENCE</span></h3>
                            <p>
                                <img className="_4-dx-pic" src="/images/_4DX_new.jpg" alt="4-DX-Picture" />
                            </p>

                            <div className="content">
                                <div>
                                    <iframe 
                                        width="323" 
                                        height="321"
                                        src="https://www.youtube.com/embed/nkpP024OUeM"
                                        title="4DX Showreal" 
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />

                                    <div className="col-xs-12 col-sm-4">
                                        <h4>CINEMA EXPERIENCE</h4>
                                        <p><strong>4DX - ENTER THE MOVIE</strong></p>
                                        <p>
                                        4DX® is the movie industry's biggest and newest superhero
                                        for a fully immersive cinematic experience.
                                        </p>
                                        <p>
                                        The four-dimensional technology was created in South Korea in 2009,
                                        and entered Europe in 2013. With it, the effects stimulate the viewers'
                                        senses far beyond the limits of the audiovisual experience in standard
                                        movie theaters. Each film title comes to the screen with a unique choreography
                                        and mixture of air, water, aroma, movement, vibrations, that happen in sync
                                        with the action on the screen. The experienced team of 4DX® experts will
                                        make you a part of every movie, without violating the natural boundaries of
                                        your comfort zone. Break free from limitations and enjoy the ultimate 4DX® experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}