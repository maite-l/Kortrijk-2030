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
                        <>
                            {openIssueSubmissions.map((submission) => (
                                <Submission key={submission.id} submission={submission} />
                            ))}
                            <svg className="scribble scribble1" width="85" height="57" viewBox="0 0 85 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.18741 34.1666C15.6867 39.975 26.2982 47.3404 37.742 51.1337C38.761 51.4714 34.4617 45.2686 34.0671 44.6694C29.8285 38.2334 25.6197 31.8155 21.1945 25.5053C20.5576 24.5971 18.1536 23.0181 19.243 22.8096C20.2919 22.6088 23.3673 25.1302 24.0317 25.5631C34.4074 32.3228 44.5765 39.4144 55.2055 45.7805C57.6342 47.2352 60.1137 48.6001 62.5904 49.9702C63.135 50.2715 64.0672 51.0423 63.198 50.0978C57.4945 43.9005 55.82 34.0646 54.438 26.0928C54.2968 25.2782 53.1155 12.5049 53.2422 12.5544C54.7482 13.1435 56.7309 15.6864 57.8719 16.6797C61.0869 19.4783 64.2535 22.33 67.4599 25.138C69.4076 26.8436 74.8538 32.1779 73.5739 29.9279C71.8294 26.8614 70.4885 23.4751 69.7456 20.0162C68.6976 15.136 75.2872 22.1543 75.136 21.0693C74.4852 16.4003 73.4971 11.9854 74.1567 7.23368C74.7274 3.12225 76.455 5.68176 79.0999 7.49204" stroke="#FF5714" stroke-width="10" stroke-linecap="round" />
                            </svg>

                            <svg className="scribble scribble2" width="202" height="58" viewBox="0 0 202 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M70.6084 6.49468C70.8009 5.74534 65.1971 5.8744 65.1439 5.87442C52.6825 5.87804 40.0418 7.50247 27.8066 9.82443C27.0962 9.95924 3.66445 14.861 5.46368 17.6263C6.95978 19.9258 13.3567 21.011 15.4989 21.5338C35.0765 26.3127 55.5044 26.4416 75.5469 25.9884C92.2538 25.6106 108.952 24.4746 125.667 24.6469C130.173 24.6934 135.782 24.2008 140.034 26.0856C141.334 26.6623 140.811 26.8363 139.642 26.9994C132.782 27.9564 125.924 28.3172 119.092 29.6609C112.975 30.864 106.463 32.2628 100.997 35.4211C100.133 35.9201 95.6983 38.6784 96.6366 40.2526C97.0814 40.9989 98.4286 41.4884 99.1212 41.7984C102.031 43.1005 105.058 44.1696 108.093 45.1329C121.1 49.26 134.883 52.0417 148.531 52.7497C165.021 53.6053 182.024 50.9822 196.532 42.7461" stroke="#FF5714" stroke-width="10" stroke-linecap="round" />
                            </svg>

                        </>
                    ) : (
                        <p>You haven't submitted anything for the current magazine yet.</p>
                    )
                ) : pastSubmissions.length > 0 ? (
                    <>
                        {pastSubmissions.map((submission) => (
                            <Submission key={submission.id} submission={submission} />
                        ))}
                        <svg className="scribble scribble1" width="81" height="191" viewBox="0 0 81 191" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M33.6915 132.929C32.9414 133.118 35.7343 137.978 35.7597 138.025C41.7216 148.967 49.1926 159.292 57.0824 168.928C57.5405 169.487 73.0499 187.723 74.6183 184.82C75.9224 182.407 73.8167 176.27 73.2516 174.138C68.0873 154.659 58.4325 136.656 48.4508 119.27C40.1303 104.778 31.1479 90.6551 23.3066 75.8924C21.193 71.913 18.0783 67.2225 17.7007 62.587C17.5851 61.1687 17.9881 61.5451 18.6903 62.4938C22.8113 68.0613 26.4071 73.9115 30.8541 79.2694C34.8357 84.0665 39.1781 89.1169 44.5659 92.4077C45.417 92.9276 49.9603 95.5038 50.8942 93.927C51.3369 93.1794 51.1226 91.7621 51.0637 91.0057C50.8162 87.8278 50.3076 84.6579 49.702 81.5311C47.1074 68.1343 42.9597 54.6989 37.0557 42.3741C29.922 27.4821 19.4881 13.8037 5.31733 4.99986" stroke="#FF5714" stroke-width="10" stroke-linecap="round" />
                        </svg>
                        <svg className="scribble scribble2" width="85" height="57" viewBox="0 0 85 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.18741 34.1666C15.6867 39.975 26.2982 47.3404 37.742 51.1337C38.761 51.4714 34.4617 45.2686 34.0671 44.6694C29.8285 38.2334 25.6197 31.8155 21.1945 25.5053C20.5576 24.5971 18.1536 23.0181 19.243 22.8096C20.2919 22.6088 23.3673 25.1302 24.0317 25.5631C34.4074 32.3228 44.5765 39.4144 55.2055 45.7805C57.6342 47.2352 60.1137 48.6001 62.5904 49.9702C63.135 50.2715 64.0672 51.0423 63.198 50.0978C57.4945 43.9005 55.82 34.0646 54.438 26.0928C54.2968 25.2782 53.1155 12.5049 53.2422 12.5544C54.7482 13.1435 56.7309 15.6864 57.8719 16.6797C61.0869 19.4783 64.2535 22.33 67.4599 25.138C69.4076 26.8436 74.8538 32.1779 73.5739 29.9279C71.8294 26.8614 70.4885 23.4751 69.7456 20.0162C68.6976 15.136 75.2872 22.1543 75.136 21.0693C74.4852 16.4003 73.4971 11.9854 74.1567 7.23368C74.7274 3.12225 76.455 5.68176 79.0999 7.49204" stroke="#FF5714" stroke-width="10" stroke-linecap="round" />
                        </svg>

                    </>
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