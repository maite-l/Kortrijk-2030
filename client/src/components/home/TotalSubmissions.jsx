import { useState, useEffect } from 'react';

export default function TotalSubmissions({ allSubmissionsAmount, cursorPosition }) {

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

    return (
        <>
            <a className="total-submissions" href="/submit">
                {!isMobile ? (
                    <svg width="105" height="148" viewBox="0 0 105 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.9688 5C27.1116 5.35714 29.1123 6.72917 30.92 7.82431C41.474 14.2183 51.4832 21.5015 61.6343 28.5023C73.1514 36.4451 84.8272 44.5876 97.5938 50.3906" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                        <path d="M5 78.5327H99.4125" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                        <path d="M22.25 142.08C35.3878 136.368 48.9397 131.262 62.1938 125.739" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                    </svg>
                ) : (null)}

                <div>
                    <p className="total-submissions__title">Total number of voices heard in <span className="italic">klinkt.</span></p>
                    <p className="total-submissions__number">{allSubmissionsAmount}</p>
                </div>
                {!isMobile ? (
                        <svg width="93" height="165" viewBox="0 0 93 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 60.395C24.7981 41.4218 45.5291 22.3641 66.7518 5" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                            <path d="M6.8125 90.3623H87.6347" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                            <path d="M5.90625 130.319C16.5451 136.122 26.4183 143.37 36.8831 149.491C43.1955 153.183 50.3114 158.153 57.6688 159.379" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                        </svg>
                    ) : (null)}

            </a>
            <div
                className="cursor-content"
                style={{ left: cursorPosition.x, top: cursorPosition.y }}>
                <div className="cursor-content__text">
                    Submit
                </div>
                <div className="cursor-content__bg"></div>
            </div>
        </>
    );
}