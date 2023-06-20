import { useState, useEffect } from 'react';

export default function Confirmation({ typeOfSubmission, openIssueDate }) {

    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 860;
    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);


    return (
        <div className='confirmation'>
            <div style={{ width: '480px' }}>
                <iframe
                    allow="fullscreen"
                    height="320"
                    src="https://giphy.com/embed/0j1lyc4cqsnfZTXcIR/video"
                    width="480"
                ></iframe>
            </div>
            <h1>Yipeee! Your {typeOfSubmission} has been submitted! 🥳</h1>
            <div className="confirmation__info--wrapper">
                {width > breakpoint ? (
                    <svg width="105" height="147" viewBox="0 0 105 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.9688 5C27.1116 5.35714 29.1123 6.72917 30.92 7.82431C41.474 14.2183 51.4832 21.5015 61.6343 28.5023C73.1514 36.4451 84.8272 44.5876 97.5938 50.3906" stroke="#547AA5" strokeWidth="10" strokeLinecap="round" />
                        <path d="M5 78.5332H99.4125" stroke="#547AA5" strokeWidth="10" strokeLinecap="round" />
                        <path d="M22 142C44.3658 131.863 67.4364 122.801 90 113" stroke="#547AA5" strokeWidth="10" strokeLinecap="round" />
                    </svg>) : (null)
                }

                <div>
                    <div className='confirmation__info'>
                        <p>What now?</p>
                        <ol>
                            <li>Did you make an account? Check your inbox - we sent you an email confirming your submission.</li>
                            <li>We will update you through email when your submission gets approved or rejected. You can also check your profile for any updates (if you have one).</li>
                            <li>If it gets approved, you’ll see it published in the next <span className='italic'>klinkt.</span> issue in the beginning of {openIssueDate}!</li>
                        </ol>
                    </div>
                    <a className="new-input__button" href="/submit">Submit new input</a>
                </div>

                {width > breakpoint ? (
                    <svg width="93" height="165" viewBox="0 0 93 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 60.395C24.7981 41.4218 45.5291 22.3641 66.7518 5" stroke="#547AA5" strokeWidth="10" strokeLinecap="round" />
                        <path d="M6.8125 90.3623H87.6347" stroke="#547AA5" strokeWidth="10" strokeLinecap="round" />
                        <path d="M5.90625 130.319C16.5451 136.122 26.4183 143.37 36.8831 149.491C43.1955 153.183 50.3114 158.153 57.6688 159.379" stroke="#547AA5" strokeWidth="10" strokeLinecap="round" />
                    </svg>
                ) : (null)
                }
            </div>





        </div >
    );
}