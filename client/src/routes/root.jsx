// 
import {
    Outlet,
    // useLoaderData
} from "react-router-dom";
import { createContext } from 'react';

// components
import NavBar from "../components/NavBar";

// data
import { getSubmissions } from "../submissions";
import { getMagazines } from "../submissions";

// global context
const IMG_URL = import.meta.env.VITE_API_IMAGES_URL || "https://kortrijk2030.ddev.site/files/images/";
const MAGAZINES_URL = import.meta.env.VITE_API_MAGAZINES_URL || "https://kortrijk2030.ddev.site/files/magazines/";
const GlobalContext = createContext({ imgURL: IMG_URL, magazineURL: MAGAZINES_URL });

export async function loader() {
    console.log("Loading root");

    // const submissions = await getSubmissions();
    // const image = submissions[0].image[0].path;


    // const magazines = await getMagazines();
    // const magazine = magazines[1].magazine[0].path;

    // console.log(image, magazine);
    // return { image, magazine };
    return {};

}

export default function Root() {



    return (
        <GlobalContext.Provider value={{ imgURL: IMG_URL, magazineURL: MAGAZINES_URL }}>
            <NavBar />
            <Outlet />

            {/* example of how to display image and pdf */}
            {/* <img src={`${IMG_URL}${image}`} alt="image" />
            <object data={`${MAGAZINES_URL}${magazine}`} type="application/pdf" width="100%" height="600px">
                <p>This browser does not support PDFs. Please download the PDF to view it: <a href={`${MAGAZINES_URL}${magazine}`}>Download PDF</a></p>
            </object> */}

        </GlobalContext.Provider>
    );
}
