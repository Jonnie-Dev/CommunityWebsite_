import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import faq from '@/public/images/faq.png'
import { LightboxVideo } from '..';

const Accordion = ({ data }) => {
    const [lightboxVideo, setLightboxVideo] = useState(null);
    const [activeIndices, setActiveIndices] = useState([]);

    const openLightbox = (video) => {
        setLightboxVideo(video);
    };

    const closeLightbox = () => {
        setLightboxVideo(null);
    };

    const toggleAccordion = (index) => {
        setActiveIndices((prevIndices) => {
            if (prevIndices.includes(index)) {
                return prevIndices.filter((i) => i !== index);
            } else {
                return [...prevIndices, index];
            }
        });
    };

    useEffect(() => {
        activeIndices.forEach((index) => {
            const contentElement = document.getElementById(`accordion-content-${index}`);
            if (contentElement) {
                contentElement.style.maxHeight = `${contentElement.scrollHeight}px`;
            }
        });
    }, [activeIndices]);

    return (
        <div className="section-lg pt-0">
            <div className="container">
                <div className="row g-4 g-xl-5 align-items-center">
                    <div className="col-12 col-lg-6">
                        <ul className="accordion">
                            {data.accordions.map((accordion, index) => (
                                <li key={index} className={activeIndices.includes(index) ? 'active' : ''}>
                                    <div className="accordion-title" onClick={() => toggleAccordion(index)}>
                                        <h4>{accordion.question}</h4>
                                        <div className="title-arrow">
                                            <i className="fa-solid fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div
                                        id={`accordion-content-${index}`}
                                        className="accordion-content"
                                        style={activeIndices.includes(index) ? { maxHeight: '124px' } : {}}
                                    >
                                        <p>{accordion.answer}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="lightbox-video">
                            <Image src={faq} alt="FAQ" />
                            {/* video button with link */}
                            {/* <a className="button-circle button-circle-xl button-circle-style-2" onClick={() => openLightbox(data.mainData.youtubeVideoUrl)}>
                                <i className="fa-solid fa-play"></i>
                            </a> */}
                        </div>
                        {lightboxVideo && (
                            <LightboxVideo video={lightboxVideo} closeLightbox={closeLightbox} />
                        )}
                    </div>
                </div> {/* end row */}
            </div> {/* end container */}
        </div>
    );
};

export default Accordion;
