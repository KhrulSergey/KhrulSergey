import React from 'react';
import '../assets/styles/Summary.scss';
import {Button} from '@mui/material';
import {resumePdf} from '../assets/assets';
import {
    faCloudDownload,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function Summary() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = resumePdf;
        link.download = 'CV_Khrul_Sergei.pdf';
        link.click();
    };

    return (
        <div id="summary">
            <div className="items-container">
                <div className="summary-container">
                    <div className="info-container resume-container">
                        <h1>Download My Resume</h1>
                        <p>Interested in a concise view of my skills and experience? Just click!</p>
                        <Button variant="contained" className="download-button action-button"
                                onClick={handleDownload}>
                            <FontAwesomeIcon className="download-logo" icon={faCloudDownload}/>
                            <p className="button-link-text">Download CV</p>
                        </Button>
                    </div>
                    <div className="info-container contact-container">
                        <h1>Contact Me</h1>
                        <p>Interested in offering me a job or collaborating? Let's connect!</p>
                        <Button
                            variant="contained" className="telegram-button action-button"
                            href="https://t.me/khrulsa"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="telegram-logo"></span>
                            <p className="button-link-text">Text me on Telegram</p>
                        </Button>
                    </div>
          
                </div>
            </div>
        </div>
    );
}

export default Summary;
