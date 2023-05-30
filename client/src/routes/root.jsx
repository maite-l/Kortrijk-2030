import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getSubmissions } from "../submissions";

export async function loader() {
    console.log("Loading root");
    const submissions = await getSubmissions();
    console.log(submissions);
    return { submissions };
}

export default function Root() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}