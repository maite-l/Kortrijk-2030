import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

import { getCurrentPoll, updateVoteAmountOne, updateVoteAmountTwo } from "../polls";
import { getMagazineSectionByTitle, newPollSubmission } from "../submissions";

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

    //pass down to component
    return { optionOne, optionTwo, issueDate, pollId, voted, submissionPosted };
}

export async function action({ request }) {
    //get magazine section
    const category = await getMagazineSectionByTitle('poll answer');
    const magazineSection = category[0].id;

    //get form data
    const formData = await request.formData();
    const { text } = Object.fromEntries(formData);

    //get title from local storage (contains poll option title)
    const title = localStorage.getItem(date);

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
    const { optionOne, optionTwo, issueDate, pollId, voted, submissionPosted } = useLoaderData();

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
        <div>
            <h1>Home</h1>

            <h2>Would you rather?</h2>
            {votedState ? (
                <>
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
                </>
            ) : (
                <>
                    <a href="1" onClick={handleVote}>
                        {optionOne.optionName}
                    </a>
                    <a href="2" onClick={handleVote}>
                        {optionTwo.optionName}
                    </a>
                </>
            )}
        </div>
    );

}

