import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

import { getMagazineSectionByTitle, newSubmission, getOpenIssue } from "../../submissions";
import { getCurrentIssue } from "../../magazines";

import SubmitForm from '../../components/submission/SubmitForm';
import ProgressTracker from '../../components/submission/ProgressTracker';
import SubmitOverview from '../../components/submission/SubmitOverview';
import Confirmation from '../../components/submission/Confirmation';
import "../../css/submit-form.css";


export async function loader() {
    //get current issue
    const currentIssue = await getCurrentIssue();
    const articlesToReplyTo = currentIssue[0].articlesToReplyTo;
    console.log(articlesToReplyTo);

    //get open issue date
    const openIssue = await getOpenIssue();
    const openIssueDate = openIssue.issueDate;

    console.log(openIssue);

    return { articlesToReplyTo, openIssueDate };
}

export async function action({ request }) {
    try {
        // Submitting state
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = "Submitting...";
        submitButton.disabled = true;
        const inputFields = document.querySelectorAll('textarea, select');
        inputFields.forEach(inputField => inputField.disabled = true);

        //get magazine section
        const category = await getMagazineSectionByTitle('Reply to an article');
        const magazineSection = category[0].id;
        console.log(magazineSection);

        //get form data
        const formData = await request.formData();
        console.log(Object.fromEntries(formData));
        const { title, text, info } = Object.fromEntries(formData);
        // const completeTitle = `Reply to: ${title}`;

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

        //create submission
        const submission = await newSubmission(title, text, info, [], magazineSection, issueNumber, userId, jwt);
        console.log(submission);
        return submission;

    } catch (error) {
        console.error(error);
        // Handle the error or display an error message to the user
    }
}

export default function Reply() {

    //loader variables
    const { openIssueDate } = useLoaderData();

    //get data from loader
    const { articlesToReplyTo } = useLoaderData();

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

        setFormTitle(`Reply to ${title.value}`);
        setFormText(text.value);

        setSubmitState('overview');
    }

    return (
        //if there are no articles to reply to, display a message
        articlesToReplyTo.length === 0 ?
            <main>
                <h1>Reply to an article</h1>
                <p>There are currently no articles to reply to.</p>
            </main>
            :
            <main className={`submitting-page ${submitState === 'confirmation' ? 'confirmation' : ''}`}>

                <ProgressTracker submitState={submitState} />

                <div className='content'>
                    {submitState === 'form' && (
                        <SubmitForm
                            title={'Reply to an article / interview'}
                            submissionTips={'We would love to know your opinion about what we publish in klinkt.! Just don’t be too harsh on us...'}
                            formTitlePlaceholder={'My new favourite restaurant (probably)'}
                            formTextLabel={'Your answer'}
                            formTextPlaceholder={'I totally agree with you!!! I went there last week and I definitely recommend...'}
                            reply={true}
                            articlesToReplyTo={articlesToReplyTo}
                            includeText={true}
                            requireText={true}
                            includeImages={false}
                            handleSubmit={showOverview}
                            titleValue={formTitle}
                            textValue={formText}
                            handleTitleChange={handleTitleChange}
                            handleTextChange={handleTextChange}
                        />
                    )}
                    {submitState === 'overview' && (
                        <SubmitOverview
                            formTitle={formTitle}
                            formText={formText}
                            setSubmitState={setSubmitState}
                        />
                    )}
                    {submitState === 'confirmation' && (
                        <Confirmation typeOfSubmission={'reply'} openIssueDate={openIssueDate} />
                    )}
                </div>

            </main >
    );

}