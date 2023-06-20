import {
    Outlet,
    useLoaderData
} from "react-router-dom";
import { createContext } from 'react';



// components
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// global context
export const GlobalContext = createContext();
const IMG_URL = import.meta.env.VITE_API_IMAGES_URL || "https://kortrijk2030.ddev.site/files/images/";
const MAGAZINES_URL = import.meta.env.VITE_API_MAGAZINES_URL || "https://kortrijk2030.ddev.site/files/magazines/";

const maxImgCount = 5;
const maxImgSizeInMb = 16; //https://craftcms.stackexchange.com/questions/492/when-uploading-assets-what-determines-the-maximum-file-size



export async function loader() {
    console.log("Loading root");

    let loggedIn = false;
    if (localStorage.getItem("jwt")) {
        loggedIn = true;
    }
    return { loggedIn };
}

export default function Root() {

    const { loggedIn } = useLoaderData();

    return (
        <GlobalContext.Provider value={{ imgURL: IMG_URL, magazineURL: MAGAZINES_URL, maxImgCount, maxImgSizeInMb }}>
            <NavBar loggedIn={loggedIn}/>
            <Outlet />

            {/* example of how to display image and pdf */}
            {/* <img src={`${IMG_URL}${image}`} alt="image" />
            <object data={`${MAGAZINES_URL}${magazine}`} type="application/pdf" width="100%" height="600px">
                <p>This browser does not support PDFs. Please download the PDF to view it: <a href={`${MAGAZINES_URL}${magazine}`}>Download PDF</a></p>
            </object> */}

            <Footer />

        </GlobalContext.Provider>
    );
}
