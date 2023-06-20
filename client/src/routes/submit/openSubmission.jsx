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
        const category = await getMagazineSectionByTitle('Open submission');
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
            userId = 556;
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

export default function OpenSubmission() {
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
                        title={'Submission tips'}
                        submissionTips={'Believe that you have something interesting to share but it doesn’t fit within any of the provided categories? That’s what open submissions are for! Just make sure it’s something klinkt. readers would like!'}
                        formTitlePlaceholder={'My amazing exhibition launching soon'}
                        formTextLabel={'Content'}
                        formTextPlaceholder={'Me and my friends are graduating soon and will be presenting out final project on the 3rd of July on..'}
                        reply={false}
                        includeText={true}
                        requireText={false}
                        includeImages={true}
                        requireImages={false}
                        handleFileInputChange={handleFileInputChange}
                        includeNotesForEditor={true}
                        notesForEditorPlaceholder={'I’m trying to promote my event - can you also post my contact info and location?'}
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
                    <Confirmation typeOfSubmission={'open submission'} openIssueDate={openIssueDate} />
                )}


        </main>
    );
}