import { useState } from 'react';
import { useLoaderData } from "react-router-dom";

import pdfToImgSrc from "../util/pdfToImgSrc";

import { getAllMagazinePaths } from "../magazines";

import MagazinePopUp from "../components/MagazinePopUp";

import "../css/archive.css";

export async function loader() {
    const magazines = await getAllMagazinePaths();
    const pdfPath = import.meta.env.VITE_API_MAGAZINES_URL || "https://kortrijk2030.ddev.site/files/magazines/";

    const magazinePaths = magazines.map((magazine) => {
        const path = magazine.magazine[0].path;
        return `${pdfPath}${path}`;
    });

    const magazineIssue = magazines.map((magazine) => {
        const issueNumber = magazine.issueNumber;
        return issueNumber;
    });

    const getRandomSize = (minPercentage, maxPercentage) => {
        const percentage = Math.random() * (maxPercentage - minPercentage) + minPercentage;
        return percentage / 100;
    };

    const maxIssueNumber = Math.max(...magazineIssue);

    const magazineData = await Promise.all(
        magazinePaths.map(async (magazinePath, index) => {
            const spreads = await pdfToImgSrc(magazinePath, false, 2, 4);
            const isMostRecent = magazineIssue[index] === maxIssueNumber;
            return {
                path: magazinePath,
                spreads: spreads,
                size: getRandomSize(20, 30),
                isMostRecent: isMostRecent
            };
        })
    );

    console.log(magazineData);

    return { magazineData };
}



export default function Archive() {
    const { magazineData } = useLoaderData();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMagazine, setSelectedMagazine] = useState(null);

    function handleClick(e, magazine) {
        e.preventDefault();
        setSelectedMagazine(magazine);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function getRandomAlignment() {
        const alignments = ['start', 'end', 'center'];
        const randomIndex = Math.floor(Math.random() * alignments.length);
        return alignments[randomIndex];
    }

    return (
        <main className="archive">
            <h1 className="title--style2">Archive</h1>
            <div className="archive__overview">
                {magazineData.map((magazine, magazineIndex) => (
                    <div
                        key={magazineIndex}
                        className={`archive__magazine--preview`}
                        style={{
                            justifyContent: getRandomAlignment(),
                            alignItems: getRandomAlignment(),
                        }}
                    >
                        <div>
                            {magazine.isMostRecent &&
                                <div className="most-recent-indicator">Latest Issue!</div>
                            }
                            <a href={magazine.path} onClick={(e) => handleClick(e, magazine)}>
                                {magazine.spreads.map((spread, spreadIndex) => (
                                    <img
                                        key={spreadIndex}
                                        src={spread}
                                        alt={`Spread ${spreadIndex + 1}`}
                                        className="magazine-spread"
                                        width={magazine.size * 595}
                                        height={magazine.size * 842}
                                    />
                                ))}
                            </a>
                        </div>

                    </div>
                ))}
            </div>
            {isOpen && (
                <MagazinePopUp
                    isOpen={isOpen}
                    closeModal={closeModal}
                    pdfPath={selectedMagazine.path}
                />
            )}
        </main>
    );

}
