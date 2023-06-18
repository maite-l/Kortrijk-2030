import { Form, redirect } from 'react-router-dom';
import { useState } from 'react';

import { getMagazineSectionByTitle, getOpenIssue, newSubmission } from "../../submissions";

import SubmitForm from '../../components/SubmitForm';

import "../../css/submit-form.css";

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

        return redirect("/submit");
    } catch (error) {
        console.error(error);
        // Handle the error or display an error message to the user
    }
}

export default function Gossip() {

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
        <main className='submitting-page'>
            <div className='progress-tracker'>
                <div className="progress-tracker__item progress-tracker__item--completed">
                    <div className='progress-tracker__item__number'>1</div>
                    <div className='progress-tracker__item__text'>Your submission</div>
                </div>
                <div className={`progress-tracker__item${submitState === 'overview' ? ' progress-tracker__item--completed' : ''}`}>
                    <div className='progress-tracker__item__number'>2</div>
                    <div className='progress-tracker__item__text'>Confirm</div>
                </div>
            </div>
            <div className='content'>
                {submitState === 'form' && (
                    <SubmitForm
                        title={'Submit your gossip'}
                        submissionTips={'Make sure what you submit is indeed a local gossip. Bonus points if it’s cultural. And please don’t be mean, we won’t publish it anyway...'}
                        formTitlePlaceholder={'My new favourite restaurant (probably)'}
                        formTextLabel={'Content'}
                        formTextPlaceholder={'Apparently they’re opening a new croquette place on the Grote Markt...'}
                        reply={false}
                        includeText={true}
                        includeImages={false}
                        handleSubmit={showOverview}
                        titleValue={formTitle}
                        textValue={formText}
                        handleTitleChange={handleTitleChange}
                        handleTextChange={handleTextChange}
                    />
                )}
                {submitState === 'overview' && (
                    <div className='submit-overview'>
                        <h1>Submission preview</h1>
                        <div className='submission__overview'>
                            <div className='submission__overview--info'>
                                {formTitle && (
                                    <p className='submission__overview--title'>{formTitle}</p>
                                )}
                                {formText && (
                                    <p className='submission__overiew--text'>{formText.slice(0, 200)}{formText.length > 200 ? "..." : ""}</p>
                                )}
                            </div>
                        </div>

                        <div className='overview-buttons'>
                            <button onClick={() => setSubmitState('form')}>Edit</button>
                            <Form method='post'>
                                {/* hidden fields to carry over data */}
                                <input type="hidden" name="title" value={formTitle} />
                                <input type="hidden" name="text" value={formText} />
                                <button type="submit">Submit</button>
                            </Form>
                        </div>


                    </div>
                )}
            </div>

        </main>
    );
}