import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";

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
    getOpenIssue,
} from "../submissions";
import { getCurrentIssue } from "../magazines";


import pdfToImgSrc from "../util/pdfToImgSrc";


import "../css/home.css";


import Poll from "../components/home/Poll";
import MagazinePreview from "../components/home/MagazinePreview";
import MagazinePopUp from "../components/MagazinePopUp";



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
    const openIssue = await getOpenIssue();
    const openIssueNumber = openIssue.issueNumber;
    const openIssueDate = openIssue.issueDate;
    const approvedSubmissions = await getApprovedSubmissions(openIssueNumber);
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
    const currentMagazinePath = `${pdfPath}${currentMagazine}`;
    const pages = await pdfToImgSrc(currentMagazinePath, false, 3, 1);


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
        openIssueDate,

        //EVERY SUBMISSION EVER AMOUNT
        allSubmissionsAmount,

        //ROLLING CARDS HEADER
        allMagazineSections,

        //MAGAZINE FLIPBOOK
        pages,
        currentMagazinePath
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
        shuffledFeaturedSubmissions: featuredSubmissions,

        //PROGRESS BAR
        progressBarPercentage,
        openIssueDate,

        //EVERY SUBMISSION EVER AMOUNT
        allSubmissionsAmount,

        //ROLLING CARDS HEADER
        allMagazineSections,

        //MAGAZINE FLIPBOOK
        pages,
        currentMagazinePath

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


    //IMAGE PATH
    //get global context variable for image path
    const { imgURL } = useContext(GlobalContext);



    //MODAL
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMagazine, setSelectedMagazine] = useState(null);

    const openModal = () => {
        setSelectedMagazine(currentMagazinePath);
        console.log(selectedMagazine);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };




    return (
        <main onMouseMove={handleMouseMove}>

            <Header allMagazineSections={allMagazineSections} openModal={openModal} />

            <FeaturedSubmissions featuredSubmissions={featuredSubmissions} issueDate={issueDate} imgURL={imgURL} openModal={openModal}/>

            <TotalSubmissions allSubmissionsAmount={allSubmissionsAmount} cursorPosition={cursorPosition} />

            <Instructions openModal={openModal} />


            <ProgressBar date={openIssueDate} progressBarPercentage={progressBarPercentage} />

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

            <MagazinePreview pages={pages} date={date} openModal={openModal} pdfPath={currentMagazinePath}/>
            {isOpen && (
                <MagazinePopUp isOpen={isOpen} closeModal={closeModal} pdfPath={selectedMagazine} />
            )}
            
            <SocialMediaSection />

            <MapSection />

        </main>
    );

}

