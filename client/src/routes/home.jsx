import { useState, useContext } from "react";
import { Form, useLoaderData } from "react-router-dom";

import "../css/home.css";

import { GlobalContext } from "../routes/root";

import { getCurrentPoll, updateVoteAmountOne, updateVoteAmountTwo } from "../polls";
import { newPollSubmission, getMagazineSectionByTitle, getCurrentFeaturedSubmissions, getApprovedSubmissions } from "../submissions";
import { getCurrentIssue } from "../magazines";

import CustomButton from "../components/CustomButton";

let date;
let number;

export async function loader() {
    //get poll data
    const poll = await getCurrentPoll();
    const optionOne = poll.pollOptions[0];
    const optionTwo = poll.pollOptions[1];
    const issueDate = poll.issueDate;
    const issueNumber = poll.issueNumber;
    const pollId = poll.id;

    //check local storage to see wether user has voted and also submitted
    let voted = false;
    let submissionPosted = false;
    if (localStorage.getItem(issueDate)) {
        voted = true;
        if (localStorage.getItem(issueDate) === 'submission posted') {
            submissionPosted = true;
        }
    }

    //set global variables
    date = issueDate;
    number = issueNumber;

    //get current issue
    const currentIssue = await getCurrentIssue();
    console.log(currentIssue);

    //get current featured submissions in random order
    const currentIssueNumber = currentIssue[0].issueNumber;
    console.log(currentIssueNumber);

    const currentFeaturedSubmissions = await getCurrentFeaturedSubmissions(currentIssueNumber);
    console.log(currentFeaturedSubmissions);

    const shuffledFeaturedSubmissions = Object.values(currentFeaturedSubmissions);
    console.log(shuffledFeaturedSubmissions);

    shuffledFeaturedSubmissions.sort(() => Math.random() - 0.5);
    console.log(shuffledFeaturedSubmissions);


    //get amount of approved submissions for next issue
    // const nextIssueNumber = currentIssueNumber + 1;
    const nextIssueNumber = currentIssueNumber;
    const approvedSubmissions = await getApprovedSubmissions(nextIssueNumber);
    const approvedSubmissionsAmount = approvedSubmissions.length;
    console.log(approvedSubmissionsAmount);

    //calculate progress bar percentage
    const maxSubmissions = 20;
    const progressBarPercentage = ((approvedSubmissionsAmount / maxSubmissions) * 100).toFixed(0);
    console.log(progressBarPercentage);

    return {
        optionOne,
        optionTwo,
        issueDate,
        pollId,
        voted,
        submissionPosted,
        currentIssue,
        shuffledFeaturedSubmissions,
        progressBarPercentage
    };
}

export async function action({ request }) {
    //get magazine section
    const category = await getMagazineSectionByTitle('poll answer');
    const magazineSection = category[0].id;

    //get form data
    const formData = await request.formData();
    const { text } = Object.fromEntries(formData);

    //get title from local storage (contains poll option title)
    let title = localStorage.getItem(date);
    title = `poll answer, chose '${title}'`;

    //get issue number from global variable
    const issueNumber = number;

    console.log(title, text, magazineSection, issueNumber);

    //create submission
    const submission = await newPollSubmission(title, text, magazineSection, issueNumber);
    console.log(submission);

    //set local storage to submission posted
    localStorage.setItem(date, 'submission posted');

    return (submission);
}

export default function Home() {

    //get data from loader
    const {
        optionOne,
        optionTwo,
        issueDate,
        pollId,
        voted,
        submissionPosted,
        currentIssue,
        shuffledFeaturedSubmissions: featuredSubmissions,
        progressBarPercentage
    } = useLoaderData();

    //get global context variables
    const { imgURL, magazineURL } = useContext(GlobalContext);

    //set current issue path
    const currentIssuePath = currentIssue[0].magazine[0].path;

    //set states
    const [optionOneVotes, setOptionOneVotes] = useState(optionOne.voteAmount);
    const [optionTwoVotes, setOptionTwoVotes] = useState(optionTwo.voteAmount);
    const [totalVotes, setTotalVotes] = useState(optionOneVotes + optionTwoVotes);
    const [votedState, setVotedState] = useState(voted);
    const [submissionPostedState, setSubmissionPostedState] = useState(submissionPosted);

    //handle vote to update vote amount
    const handleVote = async (e) => {
        e.preventDefault();

        //set local storage to option voted for
        localStorage.setItem(issueDate, e.target.textContent);
        console.log(localStorage.getItem(issueDate));

        //update vote amount
        if (e.target.href.split('/').pop() === '1') {
            const newVoteAmount = optionOneVotes + 1;
            setOptionOneVotes(newVoteAmount);
            //update vote amount in database
            const vote = await updateVoteAmountOne(pollId, newVoteAmount, optionOne.id);
            console.log(vote);
        }
        else {
            const newVoteAmount = optionTwoVotes + 1;
            setOptionTwoVotes(newVoteAmount);
            //update vote amount in database
            const vote = await updateVoteAmountTwo(pollId, newVoteAmount, optionTwo.id);
            console.log(vote);
        }

        //update states
        setVotedState(true);
        setTotalVotes(optionOneVotes + optionTwoVotes + 1);
    }

    //handle submission to display correct state
    const handleSubmit = () => {
        console.log('submitted');
        setSubmissionPostedState(true);
    }

    return (
        <main>

            <div className="header">
                <div className="introduction">
                    <div>
                        <p>We are <span className="italic-semibold">klinkt.</span></p>
                        <p>Kortrijk-based <span className="italic">digital & printed</span> youth magazine, where we value <span className="semibold">your</span> (cultural) inputs</p>
                        <div className="ctas">
                            <CustomButton text={"View latest issue"} />
                            <a href="" className="printed-copy-link">Find a printed copy of <span className="italic-semibold">klinkt.</span></a>
                        </div>
                    </div>
                    <a href="" className="scroll-button">
                        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M27 0C12.0883 0 0 12.0883 0 27C0 41.9117 12.0883 54 27 54C41.9117 54 54 41.9117 54 27C54 12.0883 41.9117 0 27 0ZM28.0607 37.8596L37.6066 28.3137C38.1924 27.7279 38.1924 26.7782 37.6066 26.1924C37.0208 25.6066 36.0711 25.6066 35.4853 26.1924L28.5 33.1777V17C28.5 16.1716 27.8284 15.5 27 15.5C26.1716 15.5 25.5 16.1716 25.5 17V33.1777L18.5147 26.1924C17.9289 25.6066 16.9792 25.6066 16.3934 26.1924C15.8076 26.7782 15.8076 27.7279 16.3934 28.3137L25.9393 37.8596C26.5251 38.4454 27.4749 38.4454 28.0607 37.8596Z" fill="#030027" />
                        </svg>
                    </a>
                </div>

            </div>


            {featuredSubmissions.length > 0 && (
                <div className="featured-submissions">
                    <h2 className=""><span className="italic">Klinkt.</span> {issueDate} Featured articles</h2>
                    <div className="featured-submissions__submissions">
                        <FeaturedSubmissions featuredSubmissions={featuredSubmissions} imgURL={imgURL} />
                    </div>
                    <CustomButton className="featured-submissions__button" text={"View full issue"} />
                </div>
            )}



            <div>
                <h2>Would you rather?</h2>
                {votedState ? (
                    <div>
                        <p>
                            {optionOne.optionName} - {(optionOneVotes / totalVotes * 100).toFixed(1)}%
                        </p>
                        <p>
                            {optionTwo.optionName} - {(optionTwoVotes / totalVotes * 100).toFixed(1)}%
                        </p>

                        {submissionPostedState ? (
                            <p>Thanks for your submission!</p>
                        ) : (
                            <Form method="post" onSubmit={handleSubmit}>
                                <label htmlFor="text">
                                    <textarea
                                        rows="4"
                                        cols="50"
                                        name="text"
                                        placeholder="Let us know why...?"
                                        style={{ resize: "none" }}
                                    />
                                </label>
                                <button type="submit">Submit</button>
                            </Form>
                        )}
                    </div>
                ) : (
                    <div>
                        <a href="1" onClick={handleVote}>
                            {optionOne.optionName}
                        </a>
                        <a href="2" onClick={handleVote}>
                            {optionTwo.optionName}
                        </a>
                    </div>
                )}
            </div>

            <div>
                <h2>Latest Issue</h2>
                <object data={`${magazineURL}${currentIssuePath}`} type="application/pdf" width="100%" height="600px">
                    <p>This browser does not support PDFs. Please download the PDF to view it: <a href={`${magazineURL}${currentIssuePath}`}>Download PDF</a></p>
                </object>
            </div>



            <div>
                <h2>Progress</h2>
                <progress value={progressBarPercentage} max="100"> {progressBarPercentage}% </progress>
            </div>

        </main>
    );

}

export function FeaturedSubmissions({ featuredSubmissions, imgURL }) {
    const charAmount = 60;

    return (
        <>
            {featuredSubmissions.map((submission, index) => (
                <div key={index} className="submission">
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

                </div>
            ))}
        </>
    );
}



