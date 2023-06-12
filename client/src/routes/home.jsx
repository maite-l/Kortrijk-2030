import { useState, useContext } from "react";
import { Form, useLoaderData } from "react-router-dom";

import "../css/home.css";

import { GlobalContext } from "../routes/root";

import { getCurrentPoll, updateVoteAmountOne, updateVoteAmountTwo } from "../polls";
import { newPollSubmission, getMagazineSectionByTitle, getCurrentFeaturedSubmissions, getApprovedSubmissions } from "../submissions";
import { getCurrentIssue } from "../magazines";

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
                    <p>We are <span className="italic-semibold">klinkt.</span></p>
                    <p>Kortrijk-based <span className="italic">digital & printed</span> youth magazine, where we value <span className="semibold">your</span> (cultural) inputs</p>
                    {/* button */}
                    <a href="">Find a printed copy of <span>klinkt.</span></a>
                </div>

            </div>

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
                {featuredSubmissions.length > 0 && (
                    <>
                        <h2>Featured Submissions</h2>
                        <FeaturedSubmissions featuredSubmissions={featuredSubmissions} imgURL={imgURL} />
                    </>
                )}
            </div>

            <div>
                <h2>Progress</h2>
                <progress value={progressBarPercentage} max="100"> {progressBarPercentage}% </progress>
            </div>

        </main>
    );

}

export function FeaturedSubmissions({ featuredSubmissions, imgURL }) {
    const charAmount = 50;

    return (
        <div>
            {featuredSubmissions.map((submission, index) => (
                <div key={index}>
                    <h2>{submission.title}</h2>
                    {submission.image.length > 0 && (
                        <img src={`${imgURL}${submission.image[0].path}`} alt="image" />
                    )}
                    {index === 0 ? <p>{submission.text.slice(0, charAmount)}{submission.text.length > charAmount ? "..." : ""}</p> : null}
                    <p>Read more on page {submission.pageNumber}!</p>
                    <br />
                </div>
            ))}
        </div>
    );
}



