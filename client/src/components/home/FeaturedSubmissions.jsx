import CustomButton from "../CustomButton";

export function FeaturedSubmission({ submission, imgURL }) {
    const charAmount = 60;

    return (
        <>
            {submission.image.length > 0 && (
                <img className="submission--img" src={`${imgURL}${submission.image[0].path}`} alt="image" />
            )}
            <h3 className="submission--title">{submission.title}</h3>
            <p className="submission--text">{submission.text.slice(0, charAmount)}{submission.text.length > charAmount ? "..." : ""}</p>
            <div className="submission--page">
                <p>Read more on page {submission.pageNumber}</p>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.11612 12.1161C0.627961 12.6043 0.627961 13.3957 1.11612 13.8839C1.60427 14.372 2.39573 14.372 2.88388 13.8839L1.11612 12.1161ZM14.25 2C14.25 1.30964 13.6904 0.749999 13 0.749999H1.75C1.05965 0.749999 0.500001 1.30964 0.500001 2C0.500001 2.69036 1.05965 3.25 1.75 3.25H11.75V13.25C11.75 13.9404 12.3096 14.5 13 14.5C13.6904 14.5 14.25 13.9404 14.25 13.25V2ZM2.88388 13.8839L13.8839 2.88388L12.1161 1.11612L1.11612 12.1161L2.88388 13.8839Z" fill="#030027" />
                </svg>
            </div>
        </>
    );
}

export default function FeaturedSubmissions({ featuredSubmissions, issueDate, imgURL }) {

    return (

        featuredSubmissions.length > 0 ? (
            <div className="featured-submissions">
                <h2 className="title--style1"><span className="italic">Klinkt.</span> {issueDate} Featured submissions</h2>
                <div className="featured-submissions__submissions">
                    {featuredSubmissions.map((submission, index) => (
                        <div key={index} className="submission">
                            <FeaturedSubmission submission={submission} imgURL={imgURL} />
                        </div>
                    ))}
                </div>
                <CustomButton className="featured-submissions__button" text={"View full issue"} icon={"arrow"} />
            </div >
        )
            : null
    );
}