import { useState, useEffect } from "react";
import RollingCards from "./RollingCards";
import CustomButton from "../CustomButton";

export default function Header({ allMagazineSections, openModal }) {

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
        <div className="header">
            <div className="introduction">
                <div>
                    <p>We are <span className="italic-semibold">klinkt.</span></p>
                    <p>Kortrijk-based <span className="italic">digital & printed</span> youth magazine, where we value <span className="semibold">your</span> (cultural) inputs</p>
                    <div className="ctas">
                        <div onClick={openModal}>
                            <CustomButton text={"View latest issue"} icon={"arrow"} />
                        </div>
                        <a href="#map" className="printed-copy-link">Find a printed copy of <span className="italic-semibold">klinkt.</span></a>
                    </div>
                    <svg className="scribbles scribble1" width="213" height="263" viewBox="0 0 213 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M46.575 5C45.5995 5.08102 44.6433 5.41941 43.7747 5.86262C37.3494 9.14124 31.7543 14.5251 26.5402 19.3854C17.2839 28.0134 7.63522 38.053 5.5379 51.0231C3.88093 61.2699 5.89441 69.695 13.7861 76.8508C25.4176 87.3978 42.903 89.5021 57.929 86.9485C75.4313 83.974 92.4432 74.6114 107.774 66.0427C113.925 62.6048 121.935 58.9634 124.831 52.0379C125.629 50.1288 127.074 44.4444 125.085 42.7267C121.457 39.5932 114.385 46.211 112.306 48.283C106.126 54.4413 102.463 61.8528 99.2716 69.8484C96.5066 76.7756 94.0058 84.0981 94.842 91.6675C96.5822 107.421 113.966 119.487 126.154 127.187C143.704 138.273 163.099 145.1 182.873 151.036C189.179 152.929 197.224 153.785 202.17 158.647C205.557 161.977 207.147 166.419 207.618 171.028C209.091 185.44 206.41 201.159 197.791 213.093C190.119 223.717 179.555 232.608 168.617 239.707C155.45 248.254 141.392 252.733 126.765 258" stroke="#DFFF17" strokeWidth="10" strokeLinecap="round" />
                    </svg>
                    <svg className="scribbles scribble2" width="69" height="70" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 64.6173C16.9989 64.6173 29.8496 65.9254 41.6995 63.7049C42.7546 63.5072 35.99 60.1607 35.3547 59.8274C28.5303 56.2476 21.7407 52.6692 14.8139 49.2898C13.8169 48.8033 10.9489 48.5855 11.8013 47.8756C12.6219 47.1922 16.5336 47.9097 17.3244 47.9669C29.6757 48.8592 42.0068 50.1418 54.3891 50.5671C57.2185 50.6642 60.0488 50.6583 62.8792 50.6583C63.5017 50.6583 64.6904 50.8815 63.4726 50.4758C55.4819 47.8139 49.2554 40.0179 44.1872 33.7114C43.6692 33.0669 36.4522 22.4618 36.5871 22.4438C38.1901 22.2302 41.156 23.4956 42.6352 23.8124C46.8032 24.7049 50.9545 25.6674 55.1194 26.5722C57.6493 27.1219 64.9971 29.1531 62.788 27.8039C59.7771 25.9651 56.9645 23.6511 54.6401 20.9841C51.3607 17.2211 60.5241 20.1724 59.8666 19.2962C57.037 15.5257 54.0352 12.1409 52.3122 7.66376C50.8213 3.7899 53.572 5.19324 56.7627 5.49693" stroke="#DFFF17" strokeWidth="10" strokeLinecap="round" />
                    </svg>
                    <svg className="scribbles scribble3" width="199" height="230" viewBox="0 0 199 230" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M45.6645 133.489C44.8811 132.64 40.4905 139.771 40.4473 139.838C30.3283 155.467 22.0962 172.636 15.0682 189.862C14.6602 190.862 1.77129 224.222 6.70077 224.209C10.7998 224.199 17.3574 217.058 19.7534 214.796C41.6508 194.124 58.4079 168.613 74.1219 143.113C87.2207 121.856 99.3618 99.9957 113.157 79.1756C116.876 73.5635 120.815 66.1305 126.632 62.3282C128.412 61.1648 128.205 61.9622 127.46 63.5603C123.087 72.9393 117.969 81.8309 114.103 91.4882C110.643 100.135 107.106 109.436 106.626 118.853C106.55 120.34 106.406 128.14 109.143 128.24C110.44 128.288 112.148 126.996 113.099 126.379C117.096 123.787 120.896 120.859 124.57 117.834C140.312 104.872 154.998 89.8456 166.973 73.3067C181.442 53.3227 191.965 29.8741 193.423 4.9993" stroke="#DFFF17" strokeWidth="10" strokeLinecap="round" />
                    </svg>

                </div>
                {!isMobile ? (
                    <a href="#featured-submissions" className="scroll-button">
                        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M27 0C12.0883 0 0 12.0883 0 27C0 41.9117 12.0883 54 27 54C41.9117 54 54 41.9117 54 27C54 12.0883 41.9117 0 27 0ZM28.0607 37.8596L37.6066 28.3137C38.1924 27.7279 38.1924 26.7782 37.6066 26.1924C37.0208 25.6066 36.0711 25.6066 35.4853 26.1924L28.5 33.1777V17C28.5 16.1716 27.8284 15.5 27 15.5C26.1716 15.5 25.5 16.1716 25.5 17V33.1777L18.5147 26.1924C17.9289 25.6066 16.9792 25.6066 16.3934 26.1924C15.8076 26.7782 15.8076 27.7279 16.3934 28.3137L25.9393 37.8596C26.5251 38.4454 27.4749 38.4454 28.0607 37.8596Z" fill="#030027" />
                        </svg>
                    </a>
                ) : (
                    null
                )}
            </div>
            <RollingCards allMagazineSections={allMagazineSections} />
            {/* {!isMobile ? (
                <a href="#featured-submissions" className="scroll-button--mobile">
                    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M27 0C12.0883 0 0 12.0883 0 27C0 41.9117 12.0883 54 27 54C41.9117 54 54 41.9117 54 27C54 12.0883 41.9117 0 27 0ZM28.0607 37.8596L37.6066 28.3137C38.1924 27.7279 38.1924 26.7782 37.6066 26.1924C37.0208 25.6066 36.0711 25.6066 35.4853 26.1924L28.5 33.1777V17C28.5 16.1716 27.8284 15.5 27 15.5C26.1716 15.5 25.5 16.1716 25.5 17V33.1777L18.5147 26.1924C17.9289 25.6066 16.9792 25.6066 16.3934 26.1924C15.8076 26.7782 15.8076 27.7279 16.3934 28.3137L25.9393 37.8596C26.5251 38.4454 27.4749 38.4454 28.0607 37.8596Z" fill="#030027" />
                    </svg>
                </a>
            ) : (
                null
            )} */}
        </div>
    );
}

