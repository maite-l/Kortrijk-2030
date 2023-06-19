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
            <svg className="scribble scribble1" width="69" height="70" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 64.6173C16.9989 64.6173 29.8496 65.9254 41.6995 63.7049C42.7546 63.5072 35.99 60.1607 35.3547 59.8274C28.5303 56.2476 21.7407 52.6692 14.8139 49.2898C13.8169 48.8033 10.9489 48.5855 11.8013 47.8756C12.6219 47.1922 16.5336 47.9097 17.3244 47.9669C29.6757 48.8592 42.0068 50.1418 54.3891 50.5671C57.2185 50.6642 60.0488 50.6583 62.8792 50.6583C63.5017 50.6583 64.6904 50.8815 63.4726 50.4758C55.4819 47.8139 49.2554 40.0179 44.1872 33.7114C43.6692 33.0669 36.4522 22.4618 36.5871 22.4438C38.1901 22.2302 41.156 23.4956 42.6352 23.8124C46.8032 24.7049 50.9545 25.6674 55.1194 26.5722C57.6493 27.1219 64.9971 29.1531 62.788 27.8039C59.7771 25.9651 56.9645 23.6511 54.6401 20.9841C51.3607 17.2211 60.5241 20.1724 59.8666 19.2962C57.037 15.5257 54.0352 12.1409 52.3122 7.66376C50.8213 3.7899 53.572 5.19324 56.7627 5.49693" stroke="#FF5714" strokeWidth="10" strokeLinecap="round" />
            </svg>
            <svg className="scribble scribble2" width="266" height="159" viewBox="0 0 266 159" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M260.92 130.886C259.018 126.769 259.027 121.639 257.785 117.272C255.515 109.296 251.089 102.272 246.841 95.2194C240.881 85.3247 233.821 75.9155 222.343 72.3603C207.926 67.8952 194.086 73.8345 184.249 84.5489C172.545 97.2966 164.786 114.269 157.53 129.854C155.613 133.973 148.014 146.616 151.047 151.775C154.895 158.317 174.217 140.578 176.388 137.259C183.363 126.599 180.068 118.906 169.159 113.519C145.795 101.979 122.154 94.9936 96.0498 96.225C81.4047 96.9159 67.1704 99.0208 52.799 101.785C43.5003 103.573 32.1626 107.579 22.5324 105.506C16.3558 104.176 12.4562 97.4882 9.86651 92.2508C5.66959 83.7629 4.9446 75.0598 5.16551 65.6441C5.65027 44.9823 10.2432 25.8968 13.9777 5.80467" stroke="#FF5714" strokeWidth="10" strokeLinecap="round" />
            </svg>

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
