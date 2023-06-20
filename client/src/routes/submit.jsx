import { useLoaderData } from "react-router-dom";

import { getAllMagazineSections } from "../submissions";

import "../css/submit.css";


export async function loader() {
    //get all magazine sections
    const categories = await getAllMagazineSections();
    const shortFunSections = categories.filter((section) => section.sectionGroup === 'Short & Fun');
    const meaningfulSections = categories.filter((section) => section.sectionGroup === 'Meaningful & Impactful');
    const creativeSections = categories.filter((section) => section.sectionGroup === 'Creative & Promo');
    const specialSections = categories.filter((section) => section.sectionGroup === 'Special');
    return { shortFunSections, meaningfulSections, creativeSections, specialSections };
}

export default function Submit() {
    const { shortFunSections, meaningfulSections, creativeSections, specialSections } = useLoaderData();

    return (
        <main className="submit-main">
            <div className="submit">
                <div className="submit-sections__header">
                    <h1 className="title--style1">Submit your input</h1>
                    <p>
                        At <span className="italic">klinkt.</span> we really value your input - choose a category below and submit it now!
                        <br />
                        Want to submit but need inspiration? <a href="">View out latest issue</a> or <a href="">visit the magazine archive</a> for great examples of work that has already been published and appreciated by our readers!
                    </p>
                </div>
                <div className="sections">

                    <SectionGroup sectionClass="short" title="Short & Fun" sections={shortFunSections} />
                    <SectionGroup sectionClass="meaningful" title="Meaningful & Impactful" sections={meaningfulSections} />
                    <SectionGroup sectionClass="creative" title="Creative & Promo" sections={creativeSections} />
                    <SectionGroup sectionClass="special" title="Special" sections={specialSections} />

                </div>
            </div>
        </main>
    );
}

export function SectionCard({ section }) {

    return (
        <a className="section-card"
            key={section.id}
            href={`submit/${section.slug}`}
        >
            <div>
                <div className="section__info">
                    <h2 className="section__title">{section.title}.</h2>
                    <p className="section__prompt">{section.text}</p>
                </div>
                <div className="section__time">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4948 0.0830078C9.12686 0.0830078 7.77231 0.352443 6.50851 0.875929C5.2447 1.39942 4.09637 2.1667 3.1291 3.13398C1.17559 5.08748 0.078125 7.737 0.078125 10.4997C0.078125 13.2623 1.17559 15.9119 3.1291 17.8654C4.09637 18.8326 5.2447 19.5999 6.50851 20.1234C7.77231 20.6469 9.12686 20.9163 10.4948 20.9163C13.2575 20.9163 15.907 19.8189 17.8605 17.8654C19.814 15.9119 20.9115 13.2623 20.9115 10.4997C20.9115 9.13174 20.642 7.7772 20.1185 6.51339C19.5951 5.24958 18.8278 4.10126 17.8605 3.13398C16.8932 2.1667 15.7449 1.39942 14.4811 0.875929C13.2173 0.352443 11.8627 0.0830078 10.4948 0.0830078ZM14.8698 14.8747L9.45313 11.5413V5.29134H11.0156V10.708L15.7031 13.5205L14.8698 14.8747Z" fill="#030027" />
                    </svg>
                    <p>{section.time}</p>
                </div>
            </div>
            <div className="section__submit-cta">
                <p>Submit here</p>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.11612 12.1161C0.627961 12.6043 0.627961 13.3957 1.11612 13.8839C1.60427 14.372 2.39573 14.372 2.88388 13.8839L1.11612 12.1161ZM14.25 2C14.25 1.30964 13.6904 0.749999 13 0.749999H1.75C1.05965 0.749999 0.500001 1.30964 0.500001 2C0.500001 2.69036 1.05965 3.25 1.75 3.25H11.75V13.25C11.75 13.9404 12.3096 14.5 13 14.5C13.6904 14.5 14.25 13.9404 14.25 13.25V2ZM2.88388 13.8839L13.8839 2.88388L12.1161 1.11612L1.11612 12.1161L2.88388 13.8839Z" fill="#030027" />
                </svg>
            </div>

        </a>
    );
}

export function SectionGroup({ title, sections, sectionClass }) {
    return (
        <div className={`section-group ${sectionClass}`}>
            <h2 className="section-group__title">{title}</h2>
            <div className="section-cards">
                {sections.map((section) => (
                    <SectionCard key={section.id} section={section} />
                ))}
            </div>
        </div>
    );
}
