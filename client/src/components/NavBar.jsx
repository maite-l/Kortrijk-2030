import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";
import CustomButton from "./CustomButton";

export default function NavBar({ loggedIn }) {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth >= 860); // Adjust the breakpoint as needed
        };

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            {isMobile ? (
                <nav>
                    <ul>
                        <li className="logo-link">
                            <NavLink to="/">klinkt.</NavLink>
                        </li>
                        <div>
                            <li>
                                <NavLink to="/archive">Archive</NavLink>
                            </li>
                            {loggedIn ? (
                                <li>
                                    <NavLink to="/my-submissions">My Submissions</NavLink>
                                </li>
                            ) : (null)}
                            <li>
                                <NavLink to="/submit">Submit your input</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={loggedIn ? "/my-account" : "/login"}
                                    className="login-link">
                                    {loggedIn ? (
                                        'My Account'
                                    ) : 'Log in'}
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16 0C7.168 0 0 7.168 0 16C0 24.832 7.168 32 16 32C24.832 32 32 24.832 32 16C32 7.168 24.832 0 16 0ZM16 6.4C19.088 6.4 21.6 8.912 21.6 12C21.6 15.088 19.088 17.6 16 17.6C12.912 17.6 10.4 15.088 10.4 12C10.4 8.912 12.912 6.4 16 6.4ZM16 28.8C12.752 28.8 8.912 27.488 6.176 24.192C8.97857 21.9932 12.4378 20.7981 16 20.7981C19.5622 20.7981 23.0214 21.9932 25.824 24.192C23.088 27.488 19.248 28.8 16 28.8Z"
                                            fill="#030027"
                                        />
                                    </svg>
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                </nav>
            ) : (
                null
            )}
        </>
    );
}
