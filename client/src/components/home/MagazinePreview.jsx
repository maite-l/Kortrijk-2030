import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HTMLFlipBook from 'react-pageflip';
import { saveAs } from 'file-saver';

import CustomButton from '../CustomButton';

export default function MagazinePreview({ pages, date, openModal, pdfPath }) {
    const flipbookWrapperRef = useRef(null);
    const flipbookRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 880); // Adjust the breakpoint as needed
        };

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const flipbookWrapper = flipbookWrapperRef.current;
        const flipbook = flipbookRef.current;

        ScrollTrigger.create({
            trigger: flipbookWrapper,
            start: 'top 15%',
            onEnter: function () {
                flipbook.pageFlip().flipNext();
            },
            onLeaveBack: function () {
                flipbook.pageFlip().flipPrev();
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [flipbookRef]);


    const handleDownloadClick = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(pdfPath);
            const blob = await response.blob();
            saveAs(blob, 'klinkt.pdf');
        } catch (error) {
            console.log('Error downloading PDF:', error);
        }
    }

    return (
        <div className="magazine-preview" >
            <p>Pssst... {date.split(' ')[0]}'s <span className="italic">klinkt.</span> issue is out!{' '}</p>
            <svg className="scribble" width="41" height="104" viewBox="0 0 41 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.125 3C16.5812 6.0237 19.7343 12.5333 22.6528 17.7991C26.6139 24.9462 28.5643 31.4732 28.625 39.6653C28.6693 45.6526 28.9947 51.8145 28.5556 57.7881C28.0694 64.4006 24.8128 71.1278 22.0278 77.0303C19.2251 82.9703 16.2049 88.8873 12.5139 94.3134C10.9752 96.5754 8.84561 98.7206 7.40972 100.891C7.01162 101.492 7.375 99.4448 7.375 98.7217C7.375 97.3059 6.43584 96.7018 5.98611 95.433C4.33724 90.7811 3 85.7171 3 80.7389C3 79.7622 3.4532 82.6409 3.59028 83.6077C3.96585 86.2567 5.34092 88.3832 6.40278 90.8148C6.76701 91.6489 8.40351 99.2064 10.2222 97.7071C18.2918 91.0545 30.64 89.7641 38 82.3482" stroke="#030027" strokeWidth="5" strokeLinecap="round" />
            </svg>
            {!isMobile ? (
                <div ref={flipbookWrapperRef} className="magazine-flipbook__container">
                    <div onClick={handleDownloadClick}>
                        <CustomButton href={''} text={'download as pdf'} icon={"download"} />
                    </div>
                    <div onClick={openModal}>
                        <HTMLFlipBook
                            className="magazine-flipbook"
                            ref={flipbookRef}
                            width={0.65 * 595}
                            height={0.65 * 842}
                            showCover={true}
                            maxShadowOpacity={0.4}
                            flippingTime={450}
                            useMouseEvents={false}
                        >
                            {pages.map((page, index) => (
                                <img className="magazine-page" key={index} src={page} alt="" />
                            ))}
                        </HTMLFlipBook>
                    </div>
                </div>
            ) : (
                <div className="magazine-flipbook__container--mobile">
                    <div onClick={handleDownloadClick}>
                        <img className="magazine-page--mobile" src={pages[0]} alt="" />
                    </div>
                </div>
            )}

        </div>
    );
}
