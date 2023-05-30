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
                    <NavLink to="submit-overview">Submit Your Work</NavLink>
                </li>
                <li>
                    <NavLink to="profile">My Profile</NavLink>
                </li>
            </ul>
        </div>
    );
}