import { useLoaderData } from "react-router-dom";

import pdfToImgSrc from "../util/pdfToImgSrc";

import { getAllMagazinePaths } from "../magazines";

import "../css/archive.css";

export async function loader() {
    const magazines = await getAllMagazinePaths();
    const pdfPath = import.meta.env.VITE_API_MAGAZINES_URL || "https://kortrijk2030.ddev.site/files/magazines/";

    const magazinePaths = magazines.map((magazine) => {
        const path = magazine.magazine[0].path;
        return `${pdfPath}${path}`;
    });

    const getRandomSize = (minPercentage, maxPercentage) => {
        const percentage = Math.random() * (maxPercentage - minPercentage) + minPercentage;
        return percentage / 100;
    };


    const magazineData = await Promise.all(
        magazinePaths.map(async (magazinePath) => {
            const spreads = await pdfToImgSrc(magazinePath, false, 2, 4);
            return {
                path: magazinePath,
                spreads: spreads,
                size: getRandomSize(20, 30)
            };
        })
    );

    console.log(magazineData);

    return { magazineData };

}
export default function Archive() {
    const { magazineData } = useLoaderData();

    function getRandomAlignment() {
        const alignments = ["start", "end", "center"];
        const randomIndex = Math.floor(Math.random() * alignments.length);
        return alignments[randomIndex];
    }

    // function handleClick(e) {
    //     e.preventDefault();
    // }

    return (
        <main className="archive">
            <h1 className="title--style2">Archive</h1>
            <div className="archive__overview">
                {magazineData.map((magazine, magazineIndex) => (
                    <div
                        key={magazineIndex}
                        className="archive__magazine--preview"
                        style={{
                            justifyContent: getRandomAlignment(),
                            alignItems: getRandomAlignment()
                        }}>
                        <a
                            href={magazine.path}
                            // onClick={handleClick}
                        >
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
                ))}
            </div>
        </main>
    );




}
