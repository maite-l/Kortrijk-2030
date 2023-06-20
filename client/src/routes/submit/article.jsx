import { useLoaderData } from 'react-router-dom';
import { useContext, useState } from 'react';

//global context
import { GlobalContext } from '../root';

//submission queries and mutations
import { getMagazineSectionByTitle, newImageAsset, newSubmission, getOpenIssue } from "../../util/submissions";

import { fileInputChange } from '../../util/util';

import "../../css/submit-form.css";
import SubmitForm from '../../components/submission/SubmitForm';
import ProgressTracker from '../../components/submission/ProgressTracker';
import SubmitOverview from '../../components/submission/SubmitOverview';
import Confirmation from '../../components/submission/Confirmation';

//variables
let imgNamesResult = [];
let imgStringsResult = [];

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
        inputFields.forEach(inputField => inputField.disabled = true);

        let imgIds = [];
        //create image assets
        const imageAssetPromises = imgNamesResult.map(async (imgName, index) => {
            console.log(imgName);
            console.log(imgNamesResult[index]);
            const imgAsset = await newImageAsset(imgName, imgStringsResult[index]);
            imgIds.push(imgAsset.id);
            console.log(imgIds);
        });

        //wait for all the assets to be made
        await Promise.all(imageAssetPromises);

        console.log(imgNamesResult);
        console.log(imgStringsResult);

        //get form data
        const formData = await request.formData();
        console.log(formData);
        const { title, text, info } = Object.fromEntries(formData);
        console.log(title, text, info);

        //get magazine section
        const category = await getMagazineSectionByTitle('Articles');
        const magazineSection = category[0].id;
        console.log(magazineSection);

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
        const submission = await newSubmission(title, text, info, imgIds, magazineSection, issueNumber, userId, jwt);
        console.log(submission);
        return submission;
    } catch (error) {
        console.error(error);
        alert('Error submitting article. Please try again.');
    }
}

export default function Article() {

    //loader variables
    const { openIssueDate } = useLoaderData();

    //global context
    const { maxImgCount, maxImgSizeInMb } = useContext(GlobalContext);

    const [submitState, setSubmitState] = useState('form');

    const [formTitle, setFormTitle] = useState('');
    const [formText, setFormText] = useState('');
    const [notesForEditor, setNotesForEditor] = useState('');

    //update variables every time files are uploaded
    const handleFileInputChange = (event) => {
        const fileInputResult = fileInputChange(event, maxImgCount, maxImgSizeInMb);
        const imgNames = fileInputResult ? fileInputResult.imgNames : [];
        const imgStrings = fileInputResult ? fileInputResult.imgStrings : [];
        imgNamesResult = imgNames;
        imgStringsResult = imgStrings;
    };

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setFormTitle(newTitle);
    };

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setFormText(newText);
    };

    const handleNotesForEditorChange = (event) => {
        const newNotes = event.target.value;
        setNotesForEditor(newNotes);
    };

    const showOverview = (event) => {
        event.preventDefault();

        const { title, text, info } = event.target.elements;

        setFormTitle(title.value);
        setFormText(text.value);
        setNotesForEditor(info.value);

        setSubmitState('overview');
    }

    return (
        <main className={`submitting-page ${submitState === 'confirmation' ? 'confirmation' : ''}`}>
            {/* <ProgressTracker submitState={submitState} /> */}

                {submitState === 'form' && (
                    <SubmitForm
                        title={'Submit your article'}
                        submissionTips={'Did you discover an amazing place in Kortrijk? Something that fascinates you about living here? Any cultural differences? Delve deep into them and describe them in an article! Make sure to keep it clean with the language;-)'}
                        formTitlePlaceholder={'Cornershop of Daydreams: Where Imagination Takes Center Stage'}
                        formTextLabel={'Content'}
                        formTextPlaceholder={'Located at the junction of Budastraat and Kapucijnenstraat, this unassuming door opens up a world of whimsy and wonder. We see ourselves as a group of creative individuals, more like agency custodians rather than owners, offering our skills to the city and its diverse...'}
                        reply={false}
                        includeText={true}
                        requireText={true}
                        includeImages={true}
                        requireImages={false}
                        handleFileInputChange={handleFileInputChange}
                        includeNotesForEditor={true}
                        notesForEditorPlaceholder={'I’m trying to get spotted as a newspaper copywriter. Can you put my email and portfolio together with my article?'}
                        handleSubmit={showOverview}
                        titleValue={formTitle}
                        textValue={formText}
                        notesForEditorValue={notesForEditor}
                        handleTitleChange={handleTitleChange}
                        handleTextChange={handleTextChange}
                        handleNotesForEditorChange={handleNotesForEditorChange}
                        submitState={submitState}
                    />
                )}
                {submitState === 'overview' && (
                    <SubmitOverview
                        imgStringsResult={imgStringsResult}
                        imgNamesResult={imgNamesResult}
                        formTitle={formTitle}
                        formText={formText}
                        notesForEditor={notesForEditor}
                        setSubmitState={setSubmitState}
                        submitState={submitState}
                    />
                )}
                {submitState === 'confirmation' && (
                    <Confirmation typeOfSubmission={'article'} openIssueDate={openIssueDate} />
                )}


        </main>
    );
}