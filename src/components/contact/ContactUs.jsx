export default function ContactUs() {
    return (
        <div id="content-contact-us" className="content-section">
            <div className="line-hor"></div>
            <div className="box">
                <div className="border-right">
                <div className="border-left">
                    <div className="inner">
                    <h3>Our <span>Contacts</span></h3>
                    <div className="address">
                        <div className="fleft">
                        <span>Zip Code:</span> 1000<br/>
                        <span>Country:</span> Bulgaria<br/>
                        <span>Telephone:</span> +359 123456789<br/>
                        <span>Fax:</span> +359 123456789
                        </div>
                        <div className="extra-wrap">
                        <span>Note:</span><br/>
                        <p>Please provide us with a minimum amount of data,
                            i.e. only that which is necessary to contact us or for identification!
                        </p>
                        <p>A copy of your message will be sent to
                            the email address provided. In case you want to contact us
                            and provide us with your personal data, we inform you that your personal
                            data will be processed by Cinema Tickets,
                            in its capacity as a personal data controller, in accordance
                            with the Personal Data Protection Act. Simultaneously with
                            providing your personal data, you consent to the data specified by you
                            being used by Cinema Tickets for the provision of the ordered services or
                            products and/or for communication with you in case of necessity.
                        </p>
                        <p>The provision of personal data is voluntary.
                            When for the use of a given service or functionality the Site requires
                            the provision of personal data, Cinema Tickets clearly indicates the mandatory
                            or optional nature of the collected data.
                        </p>
                        </div>
                    </div>
                    <div className="content">
                        <h3>Contact <span>Form</span></h3>
                        <form id="contacts-form" action="#">
                        <fieldset>
                            <div className="field">
                            <label>Your Name:</label>
                            <input type="text" name="name" value=""/>
                            </div>
                            <div className="field">
                            <label>Your E-mail:</label>
                            <input type="email" name="email" value=""/>
                            </div>
                            <div className="field">
                            <label>Your Message:</label>
                            <textarea name="message" cols="30" rows="5"></textarea>
                            </div>
                            <div className="button-about-us">
                            <button type="submit" class="link2">
                                <span>Send Message</span>
                            </button>
                            </div>
                        </fieldset>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}