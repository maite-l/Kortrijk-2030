import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function RollingCards({ allMagazineSections }) {
    const elementRef = useRef(null)

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 880); // Adjust the breakpoint as needed
        };

        // if (!isMobile) {
        //     gsap.fromTo(elementRef.current, 30, { y: 0 }, { y: -1660, ease: "power0.inOut", yoyo: true, repeat: -1 });
        // }

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <a href="/submit" className='rolling-cards__wrapper'>
            <div className="rolling-cards">
                <div ref={elementRef} className='rolling-cards__container'>
                    {allMagazineSections.map((section, index) => (
                        <RollingCard key={index} magazineSection={section} />
                    ))}
                </div>
            </div>
        </a>
    );
}


export function RollingCard({ magazineSection }) {

    return (
        <div className="rolling-card">
            <div className="rolling-card__header">
                <p className="rolling-card__title">{magazineSection.title}.</p>
                <p className="rolling-card__prompt">{magazineSection.text}</p>
            </div>
            <div className="rolling-card__submit">
                <p>Submit here</p>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.11612 12.1161C0.627961 12.6043 0.627961 13.3957 1.11612 13.8839C1.60427 14.372 2.39573 14.372 2.88388 13.8839L1.11612 12.1161ZM14.25 2C14.25 1.30964 13.6904 0.749999 13 0.749999H1.75C1.05965 0.749999 0.500001 1.30964 0.500001 2C0.500001 2.69036 1.05965 3.25 1.75 3.25H11.75V13.25C11.75 13.9404 12.3096 14.5 13 14.5C13.6904 14.5 14.25 13.9404 14.25 13.25V2ZM2.88388 13.8839L13.8839 2.88388L12.1161 1.11612L1.11612 12.1161L2.88388 13.8839Z" fill="#030027" />
                </svg>
            </div>
        </div>
    );
}