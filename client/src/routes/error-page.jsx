import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();
    console.error(error);

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <main className="error-page">
            <h1>Oops!</h1>
            <div>
                <p>Sorry, an unexpected error has occurred.</p>
                <p className="error__message">
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
            <button onClick={handleBackClick}>back</button>
        </main>
    );
}
