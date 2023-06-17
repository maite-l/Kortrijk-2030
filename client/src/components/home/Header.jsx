import RollingCards from "./RollingCards";
import CustomButton from "../CustomButton";

export default function Header({ allMagazineSections }) {
    return (
        <div className="header">
            <div className="introduction">
                <div>
                    <p>We are <span className="italic-semibold">klinkt.</span></p>
                    <p>Kortrijk-based <span className="italic">digital & printed</span> youth magazine, where we value <span className="semibold">your</span> (cultural) inputs</p>
                    <div className="ctas">
                        <CustomButton text={"View latest issue"} icon={"arrow"}/>
                        <a href="" className="printed-copy-link">Find a printed copy of <span className="italic-semibold">klinkt.</span></a>
                    </div>
                </div>
                <a href="" className="scroll-button">
                    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M27 0C12.0883 0 0 12.0883 0 27C0 41.9117 12.0883 54 27 54C41.9117 54 54 41.9117 54 27C54 12.0883 41.9117 0 27 0ZM28.0607 37.8596L37.6066 28.3137C38.1924 27.7279 38.1924 26.7782 37.6066 26.1924C37.0208 25.6066 36.0711 25.6066 35.4853 26.1924L28.5 33.1777V17C28.5 16.1716 27.8284 15.5 27 15.5C26.1716 15.5 25.5 16.1716 25.5 17V33.1777L18.5147 26.1924C17.9289 25.6066 16.9792 25.6066 16.3934 26.1924C15.8076 26.7782 15.8076 27.7279 16.3934 28.3137L25.9393 37.8596C26.5251 38.4454 27.4749 38.4454 28.0607 37.8596Z" fill="#030027" />
                    </svg>
                </a>
            </div>
            <RollingCards allMagazineSections={allMagazineSections} />
        </div>
    );
}

