import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import { getAllMagazineSections } from "../submissions";


export async function loader() {
    //get all magazine sections
    const categories = await getAllMagazineSections();
    const magazineSections = categories.filter((section) => section.title !== 'poll answer');
    console.log(magazineSections);
    return { magazineSections };
}

export default function Submit() {
    const { magazineSections } = useLoaderData();
    console.log(magazineSections);

    return (
        <main>
            <h1>Submit your work</h1>
            {magazineSections.map((section) => (
                <SectionCard key={section.id} section={section} />
            ))}
        </main>
    );
}

export function SectionCard({ section }) {
    const colors = ["#DFFF17", "#7B6EF1", "#FE37BA"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const colorStyle = {
        background: hovered ? randomColor : "#FFF",
        transition: "background-color 0.3s",
    };

    return (
        <div
            key={section.id}
            href={`submit/${section.slug}`}
            style={colorStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                <p>{section.time}</p>
            </div>
        </div>
    );
}