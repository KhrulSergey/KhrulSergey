import React from 'react';
import '../assets/styles/Contact.scss';

function Contact() {
    return (
        <div id="contact">
            <div className="items-container">
                <div className="contact_wrapper">
                    <h1>Contact Me</h1>
                    <p>Interested in offering me a job or collaborating? Let's connect!</p>
                    <a href="https://t.me/khrulsa" className="telegram-link-container" target="_blank" rel="noopener noreferrer"> {/* Added rel attribute */}
                        <span className="telegram-logo"></span>
                        <p className="telegram-link-text">Message me on Telegram</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Contact;