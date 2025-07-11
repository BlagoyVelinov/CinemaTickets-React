export default function ImaxTab() {
    return (
        <div id="content-imax" className="content-section">
            <div className="line-hor"></div>
            <div className="box">
                <div className="border-right">
                <div className="border-left">
                    <div className="inner">
                    <h3>CINEMA <span>EXPERIENCE</span></h3>
                    <p><img className="imax-pic" src="/images/imax-cinema.jpeg" alt="IMAX" /></p>
                    <div className="content-imax">
                        <div>
                        <iframe 
                            width="323" 
                            height="321"
                            src="https://www.youtube.com/embed/B_UvdLYSk7Q"
                            title="What Is IMAX?" 
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />

                        <div className="col-xs-12 col-sm-4">
                            <h4>CINEMA EXPERIENCE</h4>
                            <p><strong>IMAX - BEING BIGGER IS JUST THE BEGINNING</strong></p>
                            <p>The innovative IMAX technology combines proprietary software, architecture, and equipment, that take you beyond the edge of your seat into a world beyond your wildest imagination. The best filmmakers and studios use IMAX to achieve a deeper connection with their audiences.</p>
                            <p>The network of IMAX theaters is among the most important and successful cinema platforms in the distribution of blockbusters worldwide.</p>
                            <p>IMAX is an unforgettable experience! The best way to enjoy the IMAX experience is to indulge yourself and watch:</p>
                        </div>
                        </div>

                        <div className="banner-content">
                        <div className="col-xs-12 col-sm-4">
                            <div className="imax-img">
                            <img className="img-responsive" src="/images/imax-movies.png" alt="IMAX Movies" />
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-8">
                            <p>Immerse yourself in the most immersive cinema experience.</p>

                            <p><strong>SOUND YOU CAN FEEL</strong></p>
                            <p>Huge explosion. Whisper in your ear. The booming bass you feel more than hear. The combination of the perfectly tuned 12-channel audio system and the precise positioning of the speakers ensures that you will not only be able to hear the sound of a pin falling, but also determine exactly where it has fallen.</p>

                            <p><strong>BREATHTAKING PICTURE</strong></p>
                            <p>Clarity, detail and size make IMAX movies different. Our remastering or DMR process completely transforms every frame of the film to create the best possible version of the director's vision. Two spotlights work simultaneously to deliver the perfect image with a balance of warmth and sharpness.</p>

                            <p><strong>AN IMMERSIVE EXPERIENCE</strong></p>
                            <p>The movies are to be watched. But watching a movie in IMAX® is so much more. It's called the IMAX Experience®. Every element in our IMAX is planned, designed and positioned to create the most intense experience. The hall's special geometry creates cinematic magic every time the lights go down.</p>
                        </div>
                        </div>
                        <div className="text-imax-bottom">
                        <p><strong>CINEMATOGRAPHY</strong></p>
                        <p>IMAX cameras have been on top of Mount Everest, at the bottom of the ocean, and even in space. For 40 years now, they push the boundaries of engineering and are known worldwide as the best filmmaking equipment available today.</p>

                        <p><strong>IMAX SCREEN</strong></p>
                        <p>Its height is 14 meters and its length is 24 meters. It is made of a special diffused silver vinyl, perforated with thousands of tiny holes to allow sound to pass freely, so-called "acoustic transparency". The screen is flat, but has a slight arc that's out of peripheral vision. This, combined with a 23-degree seat angle, provides full and undisturbed visibility from every seat in the cinema hall. Even if a two-meter person is sitting in front of you, you will see without any problem. The 3D effect of IMAX 3D technology is recognized as the best 3D in the world.</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}