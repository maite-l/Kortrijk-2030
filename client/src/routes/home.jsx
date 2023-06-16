import { useState, useContext } from "react";
import { Form, useLoaderData } from "react-router-dom";


import { GlobalContext } from "../routes/root";


import Header from "../components/home/Header";
import FeaturedSubmissions from "../components/home/FeaturedSubmissions";
import TotalSubmissions from "../components/home/TotalSubmissions";
import Instructions from "../components/home/Instructions";
import SocialMediaSection from "../components/home/SocialMediaSection";
import MapSection from "../components/home/MapSection";
import ProgressBar from "../components/home/ProgressBar";


import {
    getCurrentPoll,
    updateVoteAmountOne,
    updateVoteAmountTwo,
} from "../polls";
import {
    newPollSubmission,
    getMagazineSectionByTitle,
    getCurrentFeaturedSubmissions,
    getApprovedSubmissions,
    getAllSubmissions,
    getAllMagazineSections,
} from "../submissions";
import { getCurrentIssue } from "../magazines";


import intializeMagazineFlipbook from "../util/magazineFlipbook";


import "../css/home.css";
import Poll from "../components/home/Poll";



let date;
let number;

export async function loader() {


    //ROLLING CARDS HEADER
    //get all magazine sections
    let allMagazineSections = await getAllMagazineSections();
    allMagazineSections = allMagazineSections.filter((section) => section.title !== 'poll answer' && section.title !== 'Reply to an article');



    //FEATURED SUBMISSIONS
    //get current issue
    const currentIssue = await getCurrentIssue();



    //EVERY SUBMISSION EVER AMOUNT
    //get amount of all submissions ever
    const allSubmissions = await getAllSubmissions();
    const allSubmissionsAmount = allSubmissions.length;



    //get current featured submissions in random order
    const currentIssueNumber = currentIssue[0].issueNumber;
    const currentFeaturedSubmissions = await getCurrentFeaturedSubmissions(currentIssueNumber);
    const shuffledFeaturedSubmissions = Object.values(currentFeaturedSubmissions);
    shuffledFeaturedSubmissions.sort(() => Math.random() - 0.5);



    //PROGRESS BAR
    //get amount of approved submissions for next issue
    // const nextIssueNumber = currentIssueNumber + 1;
    const nextIssueNumber = currentIssueNumber;
    const approvedSubmissions = await getApprovedSubmissions(nextIssueNumber);
    const approvedSubmissionsAmount = approvedSubmissions.length;

    //calculate progress bar percentage
    const maxSubmissions = 13;
    const progressBarPercentage = ((approvedSubmissionsAmount / maxSubmissions) * 100).toFixed(0);



    //POLL
    //get poll data
    const poll = await getCurrentPoll();
    //set global variables (to use in action function)
    date = poll.issueDate;
    number = poll.issueNumber;
    //check voting status
    let voted = false;
    let submissionPosted = false;
    let storedOptionVotedFor = localStorage.getItem(date);

    if (storedOptionVotedFor) {
        voted = true;
        if (storedOptionVotedFor.startsWith('poll answer, chose ')) {
            submissionPosted = true;
            storedOptionVotedFor = storedOptionVotedFor.replace('poll answer, chose ', '');
        }
    }



    //MAGAZINE FLIPBOOK

    const pdfPath = import.meta.env.VITE_API_MAGAZINES_URL || "https://kortrijk2030.ddev.site/files/magazines/";
    const currentMagazine = currentIssue[0].magazine[0].path;
    intializeMagazineFlipbook(`${pdfPath}${currentMagazine}`);



    return {
        //POLL
        optionOne: poll.pollOptions[0],
        optionTwo: poll.pollOptions[1],
        issueDate: poll.issueDate,
        pollId: poll.id,
        voted,
        submissionPosted,
        storedOptionVotedFor,

        //FEATURED SUBMISSIONS
        currentIssue,
        shuffledFeaturedSubmissions,

        //PROGRESS BAR
        progressBarPercentage,

        //EVERY SUBMISSION EVER AMOUNT
        allSubmissionsAmount,

        //ROLLING CARDS HEADER
        allMagazineSections
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
    title = `poll answer, chose ${title}`;

    //get issue number from global variable
    const issueNumber = number;

    //create submission
    const submission = await newPollSubmission(title, text, magazineSection, issueNumber);
    console.log(submission);

    //set local storage to submission posted
    localStorage.setItem(date, title);

    return (submission);
}

export default function Home() {

    //get data from loader
    const {
        //POLL
        optionOne,
        optionTwo,
        issueDate,
        pollId,
        voted,
        submissionPosted,
        storedOptionVotedFor,

        //FEATURED SUBMISSIONS
        currentIssue,
        shuffledFeaturedSubmissions: featuredSubmissions,

        //PROGRESS BAR
        progressBarPercentage,

        //EVERY SUBMISSION EVER AMOUNT
        allSubmissionsAmount,

        //ROLLING CARDS HEADER
        allMagazineSections

    } = useLoaderData();


    //POLL VOTING
    const [optionOneVotes, setOptionOneVotes] = useState(optionOne.voteAmount);
    const [optionTwoVotes, setOptionTwoVotes] = useState(optionTwo.voteAmount);
    const [totalVotes, setTotalVotes] = useState(optionOneVotes + optionTwoVotes);
    const [votedState, setVotedState] = useState(voted);
    const [optionVotedFor, setOptionVotedFor] = useState(storedOptionVotedFor);

    const handleVote = async (e) => {
        e.preventDefault();
        console.log('voting');

        //set local storage to option voted for and set state
        localStorage.setItem(issueDate, e.target.textContent);
        setOptionVotedFor(localStorage.getItem(issueDate));

        //update vote amount
        if (e.target.href.split('/').pop() === '1') {
            const newVoteAmount = optionOneVotes + 1;
            setOptionOneVotes(newVoteAmount);
            //update vote amount in database
            const vote = await updateVoteAmountOne(pollId, newVoteAmount, optionOne.id);
        }
        else {
            const newVoteAmount = optionTwoVotes + 1;
            setOptionTwoVotes(newVoteAmount);
            //update vote amount in database
            const vote = await updateVoteAmountTwo(pollId, newVoteAmount, optionTwo.id);
        }

        //update states
        setVotedState(true);
        setTotalVotes(optionOneVotes + optionTwoVotes + 1);
    }

    //SUBMITTING POLL ANSWER
    const [submissionPostedState, setSubmissionPostedState] = useState(submissionPosted);
    console.log(submissionPostedState);
    const handleSubmit = (e) => {
        console.log('submitting poll answer');
        setSubmissionPostedState(true);
    }



    //CUSTOM CURSOR
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const handleMouseMove = (event) => {
        setCursorPosition({ x: event.clientX - 20, y: event.clientY - 20 });
    };


    //IMAGE AND MAGAZINE PATHS
    //get global context variables for image and magazine path
    const { imgURL, magazineURL } = useContext(GlobalContext);
    //set current issue path
    const currentIssuePath = currentIssue[0].magazine[0].path;

    return (
        <main onMouseMove={handleMouseMove}>

            <Header allMagazineSections={allMagazineSections} />

            <FeaturedSubmissions featuredSubmissions={featuredSubmissions} issueDate={issueDate} imgURL={imgURL} />

            <TotalSubmissions allSubmissionsAmount={allSubmissionsAmount} cursorPosition={cursorPosition} />

            <Instructions />

            <ProgressBar date={date} progressBarPercentage={progressBarPercentage} />

            <Poll
                votedState={votedState}
                submissionPostedState={submissionPostedState}
                optionVotedFor={optionVotedFor}
                optionOne={optionOne}
                optionTwo={optionTwo}
                optionOneVotes={optionOneVotes}
                optionTwoVotes={optionTwoVotes}
                totalVotes={totalVotes}
                handleVote={handleVote}
                handleSubmit={handleSubmit}
            />

            {/* <div className="would-you-rather">
                <div className="would-you-rather__title">
                    <svg className="would-you-rather__title--doodle" width="347" height="332" viewBox="0 0 347 332" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_843_1198)">
                            <path d="M212.5 241.5C212.5 241.5 222.72 282.545 219.813 282.883C216.906 283.222 192.653 250.519 190.944 249.046C189.235 247.573 193.47 304.394 191.297 303.233C189.125 302.072 172.042 257.139 163.553 251.453C155.064 245.767 130.531 282.447 119.443 273.855C108.354 265.263 141.646 240.878 140.174 233.644C138.702 226.41 78.3318 261.246 72.5617 254.307C66.7916 247.367 110.619 198.969 106.685 192.138C102.752 185.307 36.9097 195.086 33.451 191.205C29.9923 187.323 79.3093 164.669 77.4406 162.456C75.5718 160.243 32.2599 162.822 32.9175 155.555C33.575 148.288 124.331 133.467 124.311 128.316C124.291 123.165 76.3386 118.143 78.1416 116.229C79.9446 114.315 138.178 112.076 137.791 110.442C137.404 108.809 105.96 72.8622 105.301 67.2539C104.643 61.6455 133.12 83.1669 140.104 85.6892C147.088 88.2115 118.921 29.3759 118.921 29.3759C121.061 22.8964 179.191 98.3396 184.934 99.4024C190.678 100.465 222.1 48.9149 230.974 52.1441C239.848 55.3733 206.673 117.165 215.609 119.956C224.545 122.748 297.671 95.6368 296.617 103.827L227.5 137" stroke="#DFFF17" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_843_1198">
                                <rect width="281.963" height="259.432" fill="white" transform="translate(77.3555) rotate(17.3477)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <h2 className="would-you-rather__title--text title--style2">Would you rather...</h2>
                </div>

                {votedState ? (
                    <div>
                        <div className="poll-options">
                            <div className={`poll-option--voted ${optionVotedFor === optionOne.optionName ? 'selected' : ''}`}>
                                <p className="poll-option__title">{optionOne.optionName}</p>
                                <p className="poll-option__votes">{(optionOneVotes / totalVotes * 100).toFixed(0)}%</p>
                            </div>
                            <div className={`poll-option--voted ${optionVotedFor === optionTwo.optionName ? 'selected' : ''}`}>
                                <p className="poll-option__title">{optionTwo.optionName}</p>
                                <p className="poll-option__votes">{(optionTwoVotes / totalVotes * 100).toFixed(0)}%</p>
                            </div>
                        </div>

                        {submissionPostedState ? (
                            <p className="poll-form__conformation">Thanks for your submission!</p>
                        ) : (
                            <div className="poll-form__wrapper">
                                <Form method="post" onSubmit={handleSubmit} className="poll-form">
                                    <label htmlFor="text">
                                        <textarea
                                            rows="4"
                                            cols="50"
                                            name="text"
                                            placeholder="Tell us why...?"
                                            required
                                            style={{ resize: "none" }}
                                        />
                                    </label>
                                    <button type="submit">Submit your answer</button>
                                </Form>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="poll-options">
                        <a href="1" onClick={handleVote} className="poll-option">
                            {optionOne.optionName}
                        </a>
                        <a href="2" onClick={handleVote} className="poll-option">
                            {optionTwo.optionName}
                        </a>
                    </div>
                )}
            </div> */}

            <div className="magazine">
                <div className="magazine-flipbook"></div>
            </div>

            <SocialMediaSection />

            <MapSection />

        </main>
    );

}







