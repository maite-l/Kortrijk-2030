import { Form, redirect, useLoaderData } from 'react-router-dom';
import { useState } from 'react';

import { getMagazineSectionByTitle, newSubmission, getOpenIssue } from "../../submissions";
import { getCurrentIssue } from "../../magazines";

import SubmitForm from '../../components/SubmitForm';
import "../../css/submit-form.css";


export async function loader() {
    //get current issue
    const currentIssue = await getCurrentIssue();
    const articlesToReplyTo = currentIssue[0].articlesToReplyTo;
    console.log(articlesToReplyTo);

    return { articlesToReplyTo };
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
        const completeTitle = `Reply to: ${title}`;

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
        const submission = await newSubmission(completeTitle, text, info, [], magazineSection, issueNumber, userId, jwt);
        console.log(submission);
        return redirect("/submit");

    } catch (error) {
        console.error(error);
        // Handle the error or display an error message to the user
    }
}

export default function Reply() {

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

        setFormTitle(title.value);
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
                            title={'Reply to an article / interview'}
                            submissionTips={'We would love to know your opinion about what we publish in klinkt.! Just don’t be too harsh on us...'}
                            formTitlePlaceholder={'My new favourite restaurant (probably)'}
                            formTextLabel={'Your answer'}
                            formTextPlaceholder={'I totally agree with you!!! I went there last week and I definitely recommend...'}
                            reply={true}
                            articlesToReplyTo={articlesToReplyTo}
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
                                        <p className='submission__overview--title'>Reply to: {formTitle}</p>
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