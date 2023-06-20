import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

import { getMagazineSectionByTitle, getOpenIssue, newSubmission } from "../../util/submissions";

import SubmitForm from '../../components/submission/SubmitForm';
import ProgressTracker from '../../components/submission/ProgressTracker';
import SubmitOverview from '../../components/submission/SubmitOverview';
import Confirmation from '../../components/submission/Confirmation';

import "../../css/submit-form.css";

export async function loader() {

    //get open issue date
    const openIssue = await getOpenIssue();
    const openIssueDate = openIssue.issueDate;

    console.log(openIssue);

    return {
        openIssueDate
    };

}

export async function action({ request }) {
    try {
        // Submitting state
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = "Submitting...";
        submitButton.disabled = true;
        const inputFields = document.querySelectorAll('input, textarea');
        inputFields.forEach((inputField) => (inputField.disabled = true));

        // Get magazine section
        const category = await getMagazineSectionByTitle('Gossip');
        const magazineSection = category[0].id;

        // Get form data
        const formData = await request.formData();
        console.log(Object.fromEntries(formData));
        const { title, text, info } = Object.fromEntries(formData);

        // get issue number 
        const openIssue = await getOpenIssue();
        const issueNumber = openIssue.issueNumber;
        console.log(issueNumber);

        // Get authentication info
        let userId;
        let jwt;
        if (localStorage.getItem('jwt') === null) {
            userId = 880;
            jwt = null;
        } else {
            jwt = localStorage.getItem('jwt');
            const user = JSON.parse(localStorage.getItem('user'));
            userId = user.id;
        }

        // Create submission
        const submission = await newSubmission(title, text, info, [], magazineSection, issueNumber, userId, jwt);
        console.log(submission);

        return submission;
    } catch (error) {
        console.error(error);
        alert('Error submitting article. Please try again.');
    }
}

export default function Gossip() {

    //loader variables
    const { openIssueDate } = useLoaderData();

    const [submitState, setSubmitState] = useState('form');

    const [formTitle, setFormTitle] = useState('');
    const [formText, setFormText] = useState('');

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setFormTitle(newTitle);
    };

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setFormText(newText);
    };

    const showOverview = (event) => {
        event.preventDefault();

        const { title, text } = event.target.elements;

        setFormTitle(title.value);
        setFormText(text.value);

        setSubmitState('overview');
    }

    return (
        <main className={`submitting-page ${submitState === 'confirmation' ? 'confirmation' : ''}`}>

            {/* <ProgressTracker submitState={submitState} /> */}

                {submitState === 'form' && (
                    <SubmitForm
                        title={'Submit your gossip'}
                        submissionTips={'Make sure what you submit is indeed a local gossip. Bonus points if it’s cultural. And please don’t be mean, we won’t publish it anyway...'}
                        formTitlePlaceholder={'My new favourite restaurant (probably)'}
                        formTextLabel={'Content'}
                        formTextPlaceholder={'Apparently they’re opening a new croquette place on the Grote Markt...'}
                        reply={false}
                        includeText={true}
                        requireText={true}
                        includeImages={false}
                        handleSubmit={showOverview}
                        titleValue={formTitle}
                        textValue={formText}
                        handleTitleChange={handleTitleChange}
                        handleTextChange={handleTextChange}
                        submitState={submitState}
                    />
                )}
                {submitState === 'overview' && (
                    <SubmitOverview
                        formTitle={formTitle}
                        formText={formText}
                        setSubmitState={setSubmitState}
                        submitState={submitState}
                    />
                )}
                {submitState === 'confirmation' && (
                    <Confirmation typeOfSubmission={'gossip'} openIssueDate={openIssueDate} />
                )}


        </main>
    );
}