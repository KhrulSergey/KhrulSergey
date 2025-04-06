import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box, Modal, IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../assets/styles/Certificates.scss';
import {
    bitDegreeSolidityImg,
    bitDegreeSmartContractImg,
    chainLinkBlockchainImg,
    gdprImg,
} from '../assets/assets';

interface Certificate {
    src: string;
    alt: string;
}

const certificates: Certificate[] = [
    { src: bitDegreeSolidityImg, alt: 'BitDegree Learn Solidity with Space Doggo Certificate' },
    { src: bitDegreeSmartContractImg, alt: 'BitDegree The Complete Solidity Smart Contract Certificate' },
    { src: chainLinkBlockchainImg, alt: 'ChainLink Blockchain Fundamental Certificate' },
    { src: gdprImg, alt: 'GDPR Certificate' },
];

function Certificates() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const [open, setOpen] = useState(false);

    const handleOpen = (src: string) => {
        setSelectedImage(src);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setZoomLevel(1);
    };

    const handleZoomIn = () => {
        setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2));
    };

    const handleZoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));
    };

    return (
        <div id="certificates" className="certificates-container">
            <div className="items-container">
                <h1>Certificates</h1>
                <Carousel
                    className="certificates-carousel"
                    autoPlay={false}
                    navButtonsAlwaysVisible={true}
                    indicators={false}
                    animation="slide"
                    cycleNavigation={true}
                    NextIcon={<ArrowForwardIosIcon />}
                    PrevIcon={<ArrowBackIosNewIcon />}
                >
                    {certificates.map((certificate, index) => (
                        <Paper
                            key={index}
                            className="certificate-item"
                            onClick={() => handleOpen(certificate.src)}
                        >
                            <img src={certificate.src} alt={certificate.alt} className="certificate-image" />
                        </Paper>
                    ))}
                </Carousel>
            </div>

            <Modal open={open} onClose={handleClose} className="modal-container">
                <Box className="modal-content">
                    <div className="modal-header">
                        <IconButton onClick={handleZoomIn}>
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton onClick={handleZoomOut}>
                            <ZoomOutIcon />
                        </IconButton>
                    </div>
                    <div className="modal-image-container">
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Certificate"
                                className="modal-image"
                                style={{ transform: `scale(${zoomLevel})` }}
                            />
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Certificates;