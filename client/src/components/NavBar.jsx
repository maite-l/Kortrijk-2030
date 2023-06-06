import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="archive">Archive</NavLink>
                </li>
                <li>
                    <NavLink to="submit">Submit Your Work</NavLink>
                </li>
                <li>
                    <NavLink to="my-submissions">My Submissions</NavLink>
                </li>
            </ul>
        </div>
    );
}