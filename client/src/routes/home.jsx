import { useState, useContext } from "react";
import { Form, useLoaderData } from "react-router-dom";

import "../css/home.css";

import { GlobalContext } from "../routes/root";

import {
    getCurrentPoll,
    updateVoteAmountOne,
    updateVoteAmountTwo
} from "../polls";
import {
    newPollSubmission,
    getMagazineSectionByTitle,
    getCurrentFeaturedSubmissions,
    getApprovedSubmissions,
    getAllSubmissions
} from "../submissions";
import { getCurrentIssue } from "../magazines";

import CustomButton from "../components/CustomButton";

import insta1 from "../assets/img/insta/insta1.png";
import insta2 from "../assets/img/insta/insta2.png";
import insta3 from "../assets/img/insta/insta3.png";
import insta4 from "../assets/img/insta/insta4.png";
import insta5 from "../assets/img/insta/insta5.png";
import insta6 from "../assets/img/insta/insta6.png";
import insta7 from "../assets/img/insta/insta7.png";
import insta8 from "../assets/img/insta/insta8.png";

let date;
let number;

export async function loader() {
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


    //FEATURED SUBMISSIONS
    //get current issue
    const currentIssue = await getCurrentIssue();

    //get current featured submissions in random order
    const currentIssueNumber = currentIssue[0].issueNumber;
    const currentFeaturedSubmissions = await getCurrentFeaturedSubmissions(currentIssueNumber);
    const shuffledFeaturedSubmissions = Object.values(currentFeaturedSubmissions);
    shuffledFeaturedSubmissions.sort(() => Math.random() - 0.5);

    //EVERY SUBMISSION EVER AMOUNT
    //get amount of all submissions ever
    const allSubmissions = await getAllSubmissions();
    const allSubmissionsAmount = allSubmissions.length;



    //PROGRESS BAR
    //get amount of approved submissions for next issue
    // const nextIssueNumber = currentIssueNumber + 1;
    const nextIssueNumber = currentIssueNumber;
    const approvedSubmissions = await getApprovedSubmissions(nextIssueNumber);
    const approvedSubmissionsAmount = approvedSubmissions.length;

    //calculate progress bar percentage
    const maxSubmissions = 20;
    const progressBarPercentage = ((approvedSubmissionsAmount / maxSubmissions) * 100).toFixed(0);



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
        allSubmissionsAmount
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
        allSubmissionsAmount

    } = useLoaderData();


    //POLL VOTING
    const [optionOneVotes, setOptionOneVotes] = useState(optionOne.voteAmount);
    const [optionTwoVotes, setOptionTwoVotes] = useState(optionTwo.voteAmount);
    const [totalVotes, setTotalVotes] = useState(optionOneVotes + optionTwoVotes);
    const [votedState, setVotedState] = useState(voted);
    const [optionVotedFor, setOptionVotedFor] = useState(storedOptionVotedFor);

    const handleVote = async (e) => {
        e.preventDefault();

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
    const handleSubmit = () => {
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


    //INSTA FEED IMG PATHS
    const instaFeedImgPaths = [
        insta1,
        insta2,
        insta3,
        insta4,
        insta5,
        insta6,
        insta7,
        insta8,
    ];


    return (
        <main onMouseMove={handleMouseMove}>
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
                {/* insert rolling cards */}
            </div>


            {featuredSubmissions.length > 0 && (
                <div className="featured-submissions">
                    <h2 className="style1"><span className="italic">Klinkt.</span> {issueDate} Featured submissions</h2>
                    <div className="featured-submissions__submissions">
                        <FeaturedSubmissions featuredSubmissions={featuredSubmissions} imgURL={imgURL} />
                    </div>
                    <CustomButton className="featured-submissions__button" text={"View full issue"} />
                </div>
            )}


            <div className="total-submissions">
                <svg width="105" height="148" viewBox="0 0 105 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.9688 5C27.1116 5.35714 29.1123 6.72917 30.92 7.82431C41.474 14.2183 51.4832 21.5015 61.6343 28.5023C73.1514 36.4451 84.8272 44.5876 97.5938 50.3906" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                    <path d="M5 78.5327H99.4125" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                    <path d="M22.25 142.08C35.3878 136.368 48.9397 131.262 62.1938 125.739" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                </svg>
                <div>
                    <p className="total-submissions__title">Total number of voices heard in <span className="italic">klinkt.</span></p>
                    <p className="total-submissions__number">{allSubmissionsAmount}</p>
                </div>
                <svg width="93" height="165" viewBox="0 0 93 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 60.395C24.7981 41.4218 45.5291 22.3641 66.7518 5" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                    <path d="M6.8125 90.3623H87.6347" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                    <path d="M5.90625 130.319C16.5451 136.122 26.4183 143.37 36.8831 149.491C43.1955 153.183 50.3114 158.153 57.6688 159.379" stroke="#E55934" strokeWidth="10" strokeLinecap="round" />
                </svg>
            </div>
            <div
                className="cursor-content"
                style={{ left: cursorPosition.x, top: cursorPosition.y }}>
                <div className="cursor-content__text">
                    Submit
                </div>
                <div className="cursor-content__bg"></div>
            </div>


            {/* insert instruction section */}

            <ProgressBar date={date} progressBarPercentage={progressBarPercentage} />


            <div className="would-you-rather">
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
                    <h2 className="would-you-rather__title--text style2">Would you rather...</h2>
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
            </div>

            {/* 
            <div>
                <h2>Latest Issue</h2>
                <object data={`${magazineURL}${currentIssuePath}`} type="application/pdf" width="100%" height="600px">
                    <p>This browser does not support PDFs. Please download the PDF to view it: <a href={`${magazineURL}${currentIssuePath}`}>Download PDF</a></p>
                </object>
            </div> */}


            <div className="social-media">
                <div className="instagram">
                    <h2>Tag us on Instagram</h2>
                    <p className="hashtag">#klinktkortrijk</p>
                    <div className="instagram-content">
                        {instaFeedImgPaths.map((imgPath, index) => (
                            <img key={index} src={imgPath} alt={`Instagram Post ${index + 1}`} />
                        ))}
                    </div>
                </div>

                <div className="tiktok">
                    <div className="tiktok-title">
                        <h2 className="style2 tiktok-title__1">Find us on Tiktok</h2>
                        <h2 className="style2 tiktok-title__2">Find us on Tiktok</h2>
                        <h2 className="style2 tiktok-title__3">Find us on Tiktok</h2>
                    </div>
                    <img className="tiktok-gif" src="../src/assets/img/tiktok.png" alt="Tiktok Post" />
                </div>
            </div>

            <div className="map-wrapper">
                <div className="map">
                    <h2 className="style1">Find a printed copy of <span className="italic">Klinkt.</span> here</h2>
                    <div className="map-content">
                        <iframe
                            src="https://www.google.com/maps/d/u/2/embed?mid=1NtMn2L0b-GGkcNJczUkwSPbhsgOInvk&ehbc=2E312F"
                            width="640"
                            height="480"
                            className="my-map">
                        </iframe>
                        <div className="map-info">
                            <div className="place">
                                <p className="place__name">The Penta</p>
                                <p className="place__specification">Howest Campus Kortrijk Weide</p>
                            </div>
                            <p className="address">Sint-Martens-Latemlaan 1B, 8500 Kortrijk</p>
                            <div className="opening-hours">
                                <div className="opening-hours__day">
                                    <p>Monday</p>
                                    <p>8am - 6pm</p>
                                </div>
                                <div className="opening-hours__day">
                                    <p>Tuesday</p>
                                    <p>8am - 6pm</p>
                                </div>
                                <div className="opening-hours__day">
                                    <p>Wednesday</p>
                                    <p>8am - 6pm</p>
                                </div>
                                <div className="opening-hours__day">
                                    <p>Thursday</p>
                                    <p>8am - 6pm</p>
                                </div>
                                <div className="opening-hours__day">
                                    <p>Friday</p>
                                    <p>8am - 6pm</p>
                                </div>
                                <div className="opening-hours__day">
                                    <p>Saturday</p>
                                    <p>Closed</p>
                                </div>
                                <div className="opening-hours__day">
                                    <p>Sunday</p>
                                    <p>Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
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

export function ProgressBar({ date, progressBarPercentage }) {

    let progressBar;

    if (progressBarPercentage >= 0 && progressBarPercentage < 15) {
        progressBar = (
            <div className="progress">
                <div className="progress-bar">
                    <div className="progress-bar__bar--wrapper">
                        <div className="progress-bar__bar" style={{ width: `${progressBarPercentage}%` }}></div>
                        <div className="progress-bar__info small">
                            <div className="progress-bar__info--wrapper">
                                <div className="progress-bar__percentage">{progressBarPercentage}%</div>
                                <div className="progress-bar__text">completed</div>
                            </div>
                        </div>
                    </div>
                    <div className="progress-bar__cta">
                        <div className="progress-bar__cta--wrapper">
                            <p className="progress-bar__issue">{date.split(' ')[0]} <span className="italic-semibold">klinkt.</span> issue</p>
                            <a className="progress-bar__contribute" href="">contribute now</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (progressBarPercentage >= 15 && progressBarPercentage <= 80) {
        progressBar = (
            <div className="progress">
                <div className="progress-bar">
                    <div className="progress-bar__cta">
                        <div className="progress-bar__cta--wrapper">
                            <p className="progress-bar__issue">{date.split(' ')[0]} <span className="italic-semibold">klinkt.</span> issue</p>
                            <a className="progress-bar__contribute" href="">contribute now</a>
                        </div>
                    </div>
                    <div className="progress-bar__bar" style={{ width: `${progressBarPercentage}%` }}>
                        <div className="progress-bar__info">
                            <div className="progress-bar__info--wrapper">
                                <div className="progress-bar__percentage">{progressBarPercentage}%</div>
                                <div className="progress-bar__text">completed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        progressBar = (
            <div className="progress">
                <p className="progress-bar__issue big">{date.split(' ')[0]} <span className="italic-semibold">klinkt.</span> issue</p>
                <div className="progress-bar">
                    <div className="progress-bar__bar" style={{ width: `${progressBarPercentage}%` }}>
                        <div className="progress-bar__info">
                            <div className="progress-bar__info--wrapper">
                                <div className="progress-bar__percentage">{progressBarPercentage}%</div>
                                <div className="progress-bar__text">completed</div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="progress-bar__contribute big" href="">contribute now</a>
            </div>
        );
    }

    return progressBar;

}
