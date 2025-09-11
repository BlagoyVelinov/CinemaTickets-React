import React, { useState } from "react";
import request from "../../api/request";

const BASE_URL = import.meta.env.VITE_CINEMA_BASE_URL;

export default function ContactUs() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await request.post(`${BASE_URL}/contact`, {
                from: email,
                subject: `New message from ${name}`,
                message: message,
            });

            if (response) {
                alert("Message sent successfully!");
                setName("");
                setEmail("");
                setMessage("");
            } else {
                alert(`Failed to send message.`);
            }
        } catch (error) {
            alert("Error sending message: " + error.message);
        }
    };

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
                        <form id="contacts-form" action="#" onSubmit={handleSubmit}>
                        <fieldset>
                            <div className="field">
                            <label>Your Name:</label>
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="field">
                            <label>Your E-mail:</label>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="field">
                            <label>Your Message:</label>
                            <textarea name="message" cols="30" rows="5" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>
                            <div className="button-about-us">
                            <button type="submit" className="link2">
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