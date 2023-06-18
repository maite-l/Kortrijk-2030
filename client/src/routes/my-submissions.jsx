import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../routes/root";
import { getSubmissonsByUserId, getOpenIssue } from "../submissions";
import { getUserInfoByUserId } from "../auth";

import "../css/my-submissions.css";

export async function loader() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userInfo = await getUserInfoByUserId(user.id);
    const submissions = await getSubmissonsByUserId(user.id);
    const amountOfSubmissions = submissions.length;
    const openIssue = await getOpenIssue();
    const openIssueDate = openIssue.issueDate;
    const openIssueSubmissions = submissions.filter(
        (submission) => submission.issueNumber === openIssue.issueNumber
    );
    const pastSubmissions = submissions.filter(
        (submission) => submission.issueNumber !== openIssue.issueNumber
    );
    return {
        userInfo,
        amountOfSubmissions,
        openIssueSubmissions,
        pastSubmissions,
        openIssueDate,
    };
}

export default function MySubmissions() {
    const {
        userInfo,
        amountOfSubmissions,
        openIssueSubmissions,
        pastSubmissions,
        openIssueDate,
    } = useLoaderData();

    const [currentTab, setCurrentTab] = useState("current");

    const handleTabClick = (tab) => {
        setCurrentTab(tab);
    };

    let userLevel;
    if (amountOfSubmissions > 10) {
        userLevel = "Expert Voice";
    } else if (amountOfSubmissions >= 5 && amountOfSubmissions <= 10) {
        userLevel = "Active Contributor";
    } else {
        userLevel = "Promising Beginner";
    }

    return (
        <main className="my-submissions-page">
            <a className="profile" href="/my-account">
                <p className="profile__name">{userInfo.fullName}</p>
                <p className="profile__level">{userLevel}</p>
            </a>
            <h1>My submissions</h1>
            <div className="tabs">
                <p
                    className={`tab ${currentTab === "current" ? "selected" : ""}`}
                    onClick={() => handleTabClick("current")}
                >
                    Current issue ({openIssueDate})
                </p>
                <p
                    className={`tab ${currentTab === "past" ? "selected" : ""}`}
                    onClick={() => handleTabClick("past")}
                >
                    Past issues
                </p>
            </div>
            <div className="my-submissions">
                {currentTab === "current" ? (
                    openIssueSubmissions.length > 0 ? (
                        openIssueSubmissions.map((submission) => (
                            <Submission key={submission.id} submission={submission} />
                        ))
                    ) : (
                        <p>You haven't submitted anything for the current magazine yet.</p>
                    )
                ) : pastSubmissions.length > 0 ? (
                    pastSubmissions.map((submission) => (
                        <Submission key={submission.id} submission={submission} />
                    ))
                ) : (
                    <p>You have no past submissions.</p>
                )}
            </div>
        </main>
    );
}


export function Submission({ submission }) {

    const { imgURL } = useContext(GlobalContext);

    return (
        <div className="my-submission">
            <div className="my-submisson__info">
                <div className="my-submission__title-section">
                    <h2 className="my-submission__title">{submission.title}</h2>
                    <p className="my-submission__section">{submission.magazineSection[0].title}</p>
                </div>
                <p className="my-submission__date">{new Date(submission.dateCreated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            <div className="my-submission__content">
                {submission.image && submission.image.length > 0 && (
                    <div className="my-submission__images">
                        {submission.image.map((image) => (
                            <img
                                className="my-submission__image"
                                key={image.id}
                                src={`${imgURL}${image.path}`}
                                alt=""
                            />
                        ))}
                    </div>
                )}
                {submission.text && (
                    <p className="my-submission__text">{submission.text.slice(0, 200)}{submission.text.length > 200 ? "..." : ""}</p>
                )}
            </div>


            <p className="my-submission__status">{submission.approvalStatus}</p>

        </div>
    );
}